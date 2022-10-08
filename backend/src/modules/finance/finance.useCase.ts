import { Injectable } from '@nestjs/common';
import { NFTRepo, WalletRepo } from './services';
import { WalletPrivatePublicKeyPair } from 'src/types';

@Injectable()
export class FinanceUseCase {
  constructor(
    private readonly nftRepo: NFTRepo,
    private readonly walletRepo: WalletRepo,
  ) {}

  async createWallet(): Promise<WalletPrivatePublicKeyPair> {
    return await this.walletRepo.createOne();
    // await this.nftRepo.updateOneWithRelations(nft);
  }

  async createNFT(): Promise<void> {
    return await this.nftRepo.createOne();
    // await this.nftRepo.updateOneWithRelations(nft);
  }
}
