import { WalletPrivatePublicKeyPair } from '../../../walletPrivatePublicKeyPair.dto';
import { AuthTokenPairDTO } from '../../../authTokenPair.dto';

export class RegisterUserDTO {
  walletPrivatePublicKeyPair!: WalletPrivatePublicKeyPair;
  authTokenPair!: AuthTokenPairDTO;
}
