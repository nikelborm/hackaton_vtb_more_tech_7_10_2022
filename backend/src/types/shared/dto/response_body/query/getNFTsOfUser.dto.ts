import { UserAuthInfo } from 'src/types/shared/userAuthInfo';

export class GetNFTsOfUserResponseDTO {
  nfts!: {
    tokenId: number;
    user: UserAuthInfo;
    certificateContent: {
      name: string;
      description: string;
    };
  }[];
}
