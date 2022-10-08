import { Post } from '@nestjs/common';
import { AccessScopeUseCase } from './accessScope.useCase';
import { EmptyResponseDTO, UpdateAccessScopeDTO } from 'src/types';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  ValidatedBody,
} from 'src/tools';

@ApiController('accessScope')
export class AccessScopeController {
  constructor(private readonly accessScopeUseCase: AccessScopeUseCase) {}

  @Post('updateAccessScope')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async updateAccessScope(
    @ValidatedBody
    accessScope: UpdateAccessScopeDTO,
  ): Promise<EmptyResponseDTO> {
    await this.accessScopeUseCase.updateOne(accessScope);
    return { response: {} };
  }
}
