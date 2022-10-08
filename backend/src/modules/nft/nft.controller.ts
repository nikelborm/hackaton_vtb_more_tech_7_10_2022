import { Post } from '@nestjs/common';
import { NFTUseCase } from './nft.useCase';
import { EmptyResponseDTO, CreateNFT_DTO } from 'src/types';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  ValidatedBody,
} from 'src/tools';

@ApiController('nft')
export class NFTController {
  constructor(private readonly nftUseCase: NFTUseCase) {}

  @Post('createAndApplyToUser')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createNFT(
    @ValidatedBody
    nft: CreateNFT_DTO,
  ): Promise<EmptyResponseDTO> {
    await this.nftUseCase.createOne(nft);
    return { response: {} };
  }
}
