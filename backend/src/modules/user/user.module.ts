import { Module } from '@nestjs/common';
import { FinanceModule } from '../finance';
import { UserController } from './user.controller';
import { UserUseCase } from './user.useCase';

@Module({
  imports: [FinanceModule],
  providers: [UserUseCase],
  controllers: [UserController],
  exports: [UserUseCase],
})
export class UserModule {}
