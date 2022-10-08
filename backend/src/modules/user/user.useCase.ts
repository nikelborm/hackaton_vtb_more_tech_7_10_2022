import { BadRequestException, Injectable } from '@nestjs/common';
import { model, repo } from '../infrastructure';
import { createHash, randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { messages } from 'src/config';
import {
  ClearedInsertedUserDTO,
  ConfigKeys,
  CreateUserDTO,
  IAppConfigMap,
  InputUser,
  PG_UNIQUE_CONSTRAINT_VIOLATION,
} from 'src/types';
import { isQueryFailedError } from 'src/tools';

@Injectable()
export class UserUseCase {
  private USER_PRIVATE_KEY_HASH_SALT: string;

  constructor(
    private readonly userRepo: repo.UserRepo,
    private readonly configService: ConfigService<IAppConfigMap, true>,
  ) {
    this.USER_PRIVATE_KEY_HASH_SALT = this.configService.get(
      ConfigKeys.USER_PRIVATE_KEY_HASH_SALT,
    );
  }

  async findMany(search?: string): Promise<model.User[]> {
    return await this.userRepo.findMany(search);
  }

  async createManyUsers(
    users: CreateUserDTO[],
  ): Promise<ClearedInsertedUserDTO[]> {
    return await Promise.all(users.map(this.createUser));
  }

  async createUser(user: CreateUserDTO): Promise<ClearedInsertedUserDTO> {
    /* eslint-disable @typescript-eslint/no-unused-vars, prettier/prettier */
    let userWithoutSensitiveDataWithId: ClearedInsertedUserDTO;
    try {
      const privateKey = `${Math.random()}`;
      userWithoutSensitiveDataWithId = (({
        privateKeyHash,
        salt,
        ...rest
      }): ClearedInsertedUserDTO => rest)(
        await this.userRepo.createOneWithRelations(
          this.createUserModel({
            ...user,
            privateKey,
          }),
        ),
      );
    } catch (error: any) {
      if (isQueryFailedError(error))
        if (error.code === PG_UNIQUE_CONSTRAINT_VIOLATION)
          throw new BadRequestException(messages.user.exists);
      throw error;
    }

    return userWithoutSensitiveDataWithId;
        /* eslint-enable @typescript-eslint/no-unused-vars, prettier/prettier */
  }

  private createUserModel({
    privateKey,
    ...rest
  }: InputUser): UserModelToInsert {
    const salt = randomBytes(64).toString('hex');
    return {
      ...rest,
      salt,
      privateKeyHash: createHash('sha256')
        .update(salt)
        .update(privateKey)
        .update(this.USER_PRIVATE_KEY_HASH_SALT)
        .digest('hex'),
    };
  }

  async deleteOne(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}

type UserModelToInsert = CreateUserDTO & {
  salt: string;
  privateKeyHash: string;
};
