import { BadRequestException, Injectable } from '@nestjs/common';
import { model, repo } from '../infrastructure';
import { createHash, randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { messages } from 'src/config';
import {
  InsertedUserWithIdDTO,
  ConfigKeys,
  CreateUserDTO,
  IAppConfigMap,
  PG_UNIQUE_CONSTRAINT_VIOLATION,
  CreateOneUserResponse,
} from 'src/types';
import { isQueryFailedError } from 'src/tools';
import { FinanceUseCase } from '../finance';

@Injectable()
export class UserUseCase {
  private USER_PRIVATE_KEY_HASH_SALT: string;

  constructor(
    private readonly userRepo: repo.UserRepo,
    private readonly financeUseCase: FinanceUseCase,
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
  ): Promise<CreateOneUserResponse[]> {
    return await Promise.all(users.map(this.createUser));
  }

  async createUser(user: CreateUserDTO): Promise<CreateOneUserResponse> {
    let userWithoutSensitiveDataWithId: InsertedUserWithIdDTO;
    const { privateKey, publicKey } = await this.financeUseCase.createWallet();
    try {
      userWithoutSensitiveDataWithId = (({
        privateKeyHash,
        salt,
        ...rest
      }): InsertedUserWithIdDTO => rest)(
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

    return {
      user: userWithoutSensitiveDataWithId,
      walletPrivatePublicKeyPair: {
        privateKey,
        publicKey,
      },
    };
  }

  private createUserModel({
    privateKey,
    ...rest
  }: CreateUserDTO & {
    privateKey: string;
  }): UserModelToInsert {
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
