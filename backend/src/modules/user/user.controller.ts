import { Get, Post, Query } from '@nestjs/common';
import { UserUseCase } from './user.useCase';
import {
  CreateUserDTO,
  CreateUsersDTO,
  DeleteEntityByIdDTO,
  EmptyResponseDTO,
  FindManyUsersResponseDTO,
  CreateOneUserResponse,
  CreateManyUsersResponseDTO,
} from 'src/types';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  AuthorizedOnly,
  ValidatedBody,
} from 'src/tools';

@ApiController('user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get('all')
  @AuthorizedOnly()
  async findManyUsers(
    @Query('search') search?: string,
  ): Promise<FindManyUsersResponseDTO> {
    const users = await this.userUseCase.findMany(search);
    return {
      users,
    };
  }

  @Post('create')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createUser(
    @ValidatedBody
    createUserDTO: CreateUserDTO,
  ): Promise<CreateOneUserResponse> {
    const response = await this.userUseCase.createUser(createUserDTO);
    return response;
  }

  @Post('createMany')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createUsers(
    @ValidatedBody
    { users }: CreateUsersDTO,
  ): Promise<CreateManyUsersResponseDTO> {
    const responses = await this.userUseCase.createManyUsers(users);
    return {
      responses,
    };
  }

  @Post('deleteById')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async deleteUser(
    @ValidatedBody
    { id }: DeleteEntityByIdDTO,
  ): Promise<EmptyResponseDTO> {
    await this.userUseCase.deleteOne(id);
    return {};
  }
}
