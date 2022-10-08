import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ConfigKeys,
  IAppConfigMap,
  WalletPrivatePublicKeyPair,
} from 'src/types';

@Injectable()
export class WalletRepo {
  private BLOCKCHAIN_BASE_URL: string;

  constructor(
    private readonly configService: ConfigService<IAppConfigMap, true>,
  ) {
    this.BLOCKCHAIN_BASE_URL = this.configService.get(
      ConfigKeys.BLOCKCHAIN_BASE_URL,
    );
  }

  async createOne(): Promise<WalletPrivatePublicKeyPair> {
    await fetch(`${this.BLOCKCHAIN_BASE_URL}/`);
    return { privateKey: '', publicKey: '' };
  }
}