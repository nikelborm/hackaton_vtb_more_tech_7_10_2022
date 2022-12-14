import { WalletPrivatePublicKeyPair } from '../../../walletPrivatePublicKeyPair.dto';
import { InsertedUserWithIdDTO } from '../../insertedUserWithId.dto';

export class CreateOneUserResponse {
  user!: InsertedUserWithIdDTO;

  walletPrivatePublicKeyPair!: WalletPrivatePublicKeyPair;
}
