import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ConfigKeys,
  GetUserBalanceResponseDTO,
  IAppConfigMap,
  WalletPrivatePublicKeyPair,
} from 'src/types';

@Injectable()
export class WalletRepo {
  private readonly BLOCKCHAIN_BASE_URL: string;

  constructor(
    private readonly configService: ConfigService<IAppConfigMap, true>,
  ) {
    this.BLOCKCHAIN_BASE_URL = this.configService.get(
      ConfigKeys.BLOCKCHAIN_BASE_URL,
      { infer: true },
    );
  }

  async createOne(): Promise<WalletPrivatePublicKeyPair> {
    const walletResponse = await fetch(
      `${this.BLOCKCHAIN_BASE_URL}/wallets/new`,
      {
        method: 'POST',
        headers: {
          ['Content-Type']: 'application/json',
        },
      },
    );

    const walletPrivatePublicKeyPair =
      (await walletResponse.json()) as WalletPrivatePublicKeyPair;

    return walletPrivatePublicKeyPair;
  }

  async getNFTsOfUser(publicKey: string): Promise<{ asd: string }> {
    const response = await fetch(
      `${this.BLOCKCHAIN_BASE_URL}/wallets/${publicKey}/nft/balance`,
    );

    const data = (await response.json()) as { asd: string };
    console.log('getNFTsOfUser data: ', data);

    return data;
  }

  async getBalanceOfUser(
    publicKey: string,
  ): Promise<GetUserBalanceResponseDTO> {
    const response = await fetch(
      `${this.BLOCKCHAIN_BASE_URL}/wallets/${publicKey}/balance`,
    );

    const data = (await response.json()) as GetUserBalanceResponseDTO;

    return data;
  }
}
