import { Injectable } from '@nestjs/common';
import { NFTRepo, WalletRepo } from './services';
import {
  ConfigKeys,
  CreateNFT_DTO,
  GetOverallBalanceOfUserResponse,
  GetUserBalanceResponseDTO,
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
    console.log('transactionHash: ', transactionHash);
    let tokenId: number;
    for (let i = 0; i < 10; i++) {
      const response = await this.nftRepo.isNFTgenerated(transactionHash);
      if (response.isGenerated) {
        tokenId = response.tokenId;
        break;
      }
    }
    await this.nftRepo.moveNFTtoAnotherWallet(
      this.ROOT_WALLET_PRIVATE_KEY,
      user.publicKey,
      1,
    );
  }

  async getOverallBalanceOfUser(
    publicKey: string,
  ): Promise<GetOverallBalanceOfUserResponse> {
    const [nfts, balance] = await Promise.all([
      this.getNFTsOfUser(publicKey),
      this.getBalanceOfUser(publicKey),
    ]);

    return { nfts, balance };
  }

  async getNFTsOfUser(publicKey: string): Promise<{ asd: string }> {
    return await this.walletRepo.getNFTsOfUser(publicKey);
  }

  async getBalanceOfUser(
    publicKey: string,
  ): Promise<GetUserBalanceResponseDTO> {
    return await this.walletRepo.getBalanceOfUser(publicKey);
  }
}
