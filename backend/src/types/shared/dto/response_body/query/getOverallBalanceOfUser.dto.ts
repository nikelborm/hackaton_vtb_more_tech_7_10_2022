import { GetNFTsOfUserResponseDTO } from './getNFTsOfUser.dto';
import { GetUserBalanceResponseDTO } from './getUserBalance.dto';

export class GetOverallBalanceOfUserResponse {
  nfts!: GetNFTsOfUserResponseDTO;

  balance!: GetUserBalanceResponseDTO;
}
