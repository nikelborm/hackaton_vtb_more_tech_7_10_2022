import { Post } from '@nestjs/common';
import { FinanceUseCase } from './finance.useCase';
import { EmptyResponseDTO, CreateNFT_DTO } from 'src/types';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  ValidatedBody,
} from 'src/tools';

@ApiController('nft')
export class FinanceController {
  constructor(private readonly financeUseCase: FinanceUseCase) {}

  @Post('createAndApplyToUser')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createNFT(
    @ValidatedBody
    nft: CreateNFT_DTO,
  ): Promise<EmptyResponseDTO> {
    await this.financeUseCase.createNFT();
    return { response: {} };
  }
}
