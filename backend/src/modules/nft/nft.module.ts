import { Module } from '@nestjs/common';
import { NFTController } from './nft.controller';
import { NFTUseCase } from './nft.useCase';

@Module({
  providers: [NFTUseCase],
  controllers: [NFTController],
  exports: [NFTUseCase],
})
export class NFTModule {}
