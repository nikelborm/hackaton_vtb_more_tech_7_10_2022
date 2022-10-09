import { IsObject, IsPositive } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
export class CreateNFT_DTO {
  @IsPositive()
  receiverUserId!: number;

  @IsObject()
  certificateContent!: Record<string, any>;
}
