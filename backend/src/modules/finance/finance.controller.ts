import { Post, Request } from '@nestjs/common';
import { FinanceUseCase } from './finance.useCase';
import { EmptyResponseDTO, CreateNFT_DTO, AuthedRequest } from 'src/types';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  AuthorizedOnly,
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
    await this.financeUseCase.createNFT(nft);
    return {};
  }

  @Post('getMine')
  @AuthorizedOnly()
  async getMyNFTs(
    @Request() { user }: AuthedRequest,
  ): Promise<EmptyResponseDTO> {
    await this.financeUseCase.getNFTsOfUser(user.publicKey);
    return {};
  }
}
