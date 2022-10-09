import { GetNFTsOfUserResponseDTO } from './getNFTsOfUser.dto';
import { GetUserBalanceResponseDTO } from './getUserBalance.dto';

export class GetOverallBalanceOfUserResponse extends GetNFTsOfUserResponseDTO {
  balance!: GetUserBalanceResponseDTO;
}
