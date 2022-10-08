import type { UserAuthInfo } from '../shared';

export interface UserForLoginAttemptValidation extends UserAuthInfo {
  salt: string;
  privateKeyHash: string;
}
