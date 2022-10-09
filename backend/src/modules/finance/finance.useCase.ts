import { Injectable } from '@nestjs/common';
import { NFTRepo, WalletRepo } from './services';
import {
  ConfigKeys,
  CreateNFT_DTO,
  IAppConfigMap,
  WalletPrivatePublicKeyPair,
} from 'src/types';
import { repo } from '../infrastructure';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FinanceUseCase {
  private readonly ROOT_WALLET_PUBLIC_KEY: string;
  private readonly ROOT_WALLET_PRIVATE_KEY: string;

  constructor(
    private readonly nftRepo: NFTRepo,
    private readonly configService: ConfigService<IAppConfigMap, true>,
    private readonly userRepo: repo.UserRepo,
    private readonly walletRepo: WalletRepo,
  ) {
    this.ROOT_WALLET_PUBLIC_KEY = this.configService.get(
      ConfigKeys.ROOT_WALLET_PUBLIC_KEY,
      { infer: true },
    );
    this.ROOT_WALLET_PRIVATE_KEY = this.configService.get(
      ConfigKeys.ROOT_WALLET_PRIVATE_KEY,
      { infer: true },
    );
  }

  async createWallet(): Promise<WalletPrivatePublicKeyPair> {
    return await this.walletRepo.createOne();
  }

  async createNFT({
    receiverUserId,
    certificateContent,
  }: CreateNFT_DTO): Promise<void> {
    const user = await this.userRepo.getOneById(receiverUserId);
    if (!user) throw new Error('User with such public key was not found');

    const uri = encodeURIComponent(
      JSON.stringify({ user, certificateContent }),
    );
    const { transactionHash } = await this.nftRepo.createOne(
      this.ROOT_WALLET_PUBLIC_KEY,
      uri,
    );
    let tokenId: number;
    while (true) {
      const response = await this.nftRepo.isNFTgenerated(transactionHash);
      if (response.isGenerated) {
        tokenId = response.tokenId;
        break;
      }
    }
    await this.nftRepo.moveNFTtoAnotherWallet(
      this.ROOT_WALLET_PRIVATE_KEY,
      user.publicKey,
      tokenId,
    );
  }

  async getNFTsOfUser(publicKey: string): Promise<{ asd: string }> {
    return await this.walletRepo.getNFTsOfUser(publicKey);
  }
}
