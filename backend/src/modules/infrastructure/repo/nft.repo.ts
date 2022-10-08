import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys, IAppConfigMap } from 'src/types';

@Injectable()
export class NFTRepo {
  private BLOCKCHAIN_BASE_URL: string;

  constructor(
    private readonly configService: ConfigService<IAppConfigMap, true>,
  ) {
    this.BLOCKCHAIN_BASE_URL = this.configService.get(
      ConfigKeys.BLOCKCHAIN_BASE_URL,
    );
  }

  async createOne(): Promise<void> {
    await fetch(`${this.BLOCKCHAIN_BASE_URL}/`);
  }
}
