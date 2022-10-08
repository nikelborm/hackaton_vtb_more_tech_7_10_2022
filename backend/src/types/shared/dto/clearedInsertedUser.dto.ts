export class ClearedInsertedUserDTO implements Omit<InputUser, 'privateKey'> {
  id!: number;

  firstName!: string;

  lastName!: string;

  patronymic!: string;

  gender!: string;

  email!: string;
}

export interface InputUser {
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: string;
  email: string;
  privateKey: string;
}
