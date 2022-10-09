import { Get, Post, Request } from '@nestjs/common';
import { FinanceUseCase } from './finance.useCase';
import {
  EmptyResponseDTO,
  CreateNFT_DTO,
  AuthedRequest,
  GetOverallBalanceOfUserResponse,
} from 'src/types';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  AuthorizedOnly,
  ValidatedBody,
} from 'src/tools';

@ApiController('finance')
export class FinanceController {
  constructor(private readonly financeUseCase: FinanceUseCase) {}

  @Get('getMineOverallBalance')
  @AuthorizedOnly()
  async getMyNFTs(
    @Request() { user }: AuthedRequest,
  ): Promise<GetOverallBalanceOfUserResponse> {
    return await this.financeUseCase.getOverallBalanceOfUser(user.publicKey);
  }

  @Post('createNFTAndTransferToUser')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createNFT(
    @ValidatedBody
    nft: CreateNFT_DTO,
  ): Promise<EmptyResponseDTO> {
    await this.financeUseCase.createNFT(nft);
    return {};
  }
}
