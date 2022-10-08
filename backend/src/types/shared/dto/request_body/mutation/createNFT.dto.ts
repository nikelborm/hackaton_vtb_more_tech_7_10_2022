import { IsPositive } from 'class-validator';

export class CreateNFT_DTO {
  @IsPositive()
  id!: number;
}
