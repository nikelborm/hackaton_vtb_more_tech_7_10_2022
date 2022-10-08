import { Module } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { FinanceUseCase } from './finance.useCase';
import { NFTRepo, WalletRepo } from './services';

@Module({
  providers: [FinanceUseCase, NFTRepo, WalletRepo],
  controllers: [FinanceController],
  exports: [FinanceUseCase],
})
export class FinanceModule {}
