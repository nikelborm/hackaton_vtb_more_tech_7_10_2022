import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessScopeUseCase } from './accessScope.useCase';
import { EmptyResponseDTO, UpdateAccessScopeDTO } from 'src/types';
import { AccessEnum, AllowedFor } from '../auth';

@ApiTags('accessScope')
@Controller()
export class AccessScopeController {
  constructor(private readonly accessScopeUseCase: AccessScopeUseCase) {}

  @Post('/updateAccessScope')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async updateAccessScope(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    accessScope: UpdateAccessScopeDTO,
  ): Promise<EmptyResponseDTO> {
    await this.accessScopeUseCase.updateOne(accessScope);
    return { response: {} };
  }
}
