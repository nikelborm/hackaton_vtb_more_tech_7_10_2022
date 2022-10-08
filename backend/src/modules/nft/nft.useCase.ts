import { Injectable } from '@nestjs/common';
import { CreateNFT_DTO } from 'src/types';
import { model, repo } from '../infrastructure';

@Injectable()
export class NFTUseCase {
  constructor(private readonly nftRepo: repo.NFTRepo) {}

  async createOne(nft: CreateNFT_DTO): Promise<void> {
    // await this.nftRepo.updateOneWithRelations(nft);
  }
}
