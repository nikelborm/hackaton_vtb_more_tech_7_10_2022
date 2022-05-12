import { AccessScopeType } from 'src/types';

export enum EndpointAccess {
  PUBLIC = 'public',
  FORBIDDEN = 'forbidden',
  AUTHORIZED = 'authorized',
  DEVELOPMENT_ONLY = 'developmentOnly',
}

export type IAccessEnum = AccessScopeType | EndpointAccess;
export type UserLevelScopes = AccessScopeType | AccessScopeType[];
export type AllowedForArgs = (EndpointAccess | UserLevelScopes)[];
