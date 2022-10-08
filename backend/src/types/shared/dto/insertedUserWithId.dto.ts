import { IsPositive } from 'class-validator';
import { CreateUserDTO } from './request_body';

export class InsertedUserWithIdDTO extends CreateUserDTO {
  @IsPositive()
  id!: number;
}
