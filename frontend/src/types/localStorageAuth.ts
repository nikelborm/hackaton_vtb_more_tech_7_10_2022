import { UserAccessTokenPayload, UserRefreshTokenPayload } from 'backendTypes';

export type ISession =
  | { isAuthed: false }
  | {
      isAuthed: true;
      accessToken: {
        text: string;
        payload: UserAccessTokenPayload;
      };
      refreshToken: {
        text: string;
        payload: UserRefreshTokenPayload;
      };
    };
