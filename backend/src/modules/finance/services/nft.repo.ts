import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys, IAppConfigMap } from 'src/types';

@Injectable()
export class NFTRepo {
  private readonly BLOCKCHAIN_BASE_URL: string;

  constructor(
    private readonly configService: ConfigService<IAppConfigMap, true>,
  ) {
    this.BLOCKCHAIN_BASE_URL = this.configService.get(
      ConfigKeys.BLOCKCHAIN_BASE_URL,
      { infer: true },
    );
  }

  async createOne(
    toPublicKey: string,
    uri: string,
  ): Promise<{ transactionHash: string }> {
    const response = await fetch(`${this.BLOCKCHAIN_BASE_URL}/nft/generate`, {
      method: 'POST',
      body: JSON.stringify({
        toPublicKey,
        uri,
        nftCount: 1,
      }),
    });
    const data = (await response.json()) as { transactionHash: string };

    return data;
  }

  async isNFTgenerated(
    transactionHash: string,
  ): Promise<{ isGenerated: false } | { isGenerated: true; tokenId: number }> {
    const response = await fetch(
      `${this.BLOCKCHAIN_BASE_URL}/nft/generate/${transactionHash}`,
    );

    const data = (await response.json()) as {
      wallet_id: string;
      tokens: [number];
    };

    if (data.tokens.length)
      return {
        isGenerated: true,
        tokenId: data.tokens[0],
      };

    return { isGenerated: false };
  }

  async moveNFTtoAnotherWallet(
    fromPrivateKey: string,
    toPublicKey: string,
    tokenId: number,
  ): Promise<{ transactionHash: string }> {
    const response = await fetch(`${this.BLOCKCHAIN_BASE_URL}/transfers/nft`, {
      method: 'POST',
      body: JSON.stringify({
        fromPrivateKey,
        toPublicKey,
        tokenId,
      }),
    });

    const data = (await response.json()) as { transactionHash: string };

    return data;
  }
}
