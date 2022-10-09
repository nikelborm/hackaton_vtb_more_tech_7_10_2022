import { WalletPrivatePublicKeyPair } from '../../../walletPrivatePublicKeyPair.dto';
import { AuthTokenPairDTO } from '../../../authTokenPair.dto';

export class RegisterUserResponseDTO {
  walletPrivatePublicKeyPair!: WalletPrivatePublicKeyPair;

  authTokenPair!: AuthTokenPairDTO;
}
