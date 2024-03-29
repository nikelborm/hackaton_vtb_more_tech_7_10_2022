import { createHash, timingSafeEqual } from 'crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { messages } from 'src/config';
import { repo } from '../../infrastructure';
import {
  ConfigKeys,
  AuthTokenPairDTO,
  CreateUserDTO,
  IAppConfigMap,
  UserAuthInfo,
  UserForLoginAttemptValidation,
  RegisterUserResponseDTO,
} from 'src/types';
import { InMemoryWhitelistedSessionStore } from './inMemoryWhitelistedKeyStore.service';
import { RefreshTokenUseCase } from './refreshToken.useCase';
import { AccessTokenUseCase } from './accessToken.useCase';

import { v4 as uuid } from 'uuid';
import { UserUseCase } from 'src/modules/user';

@Injectable()
export class AuthUseCase {
  private readonly USER_PRIVATE_KEY_HASH_SALT: string;

  constructor(
    private readonly accessTokenUseCase: AccessTokenUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly userUseCase: UserUseCase,
    private readonly userRepo: repo.UserRepo,
    private readonly configService: ConfigService<IAppConfigMap, true>,
    private readonly whitelistedSessionStore: InMemoryWhitelistedSessionStore,
  ) {
    this.USER_PRIVATE_KEY_HASH_SALT = this.configService.get(
      ConfigKeys.USER_PRIVATE_KEY_HASH_SALT,
      { infer: true },
    );
  }

  async validateLoginAttempt(
    userModel: UserForLoginAttemptValidation,
    privateKey: string,
  ): Promise<void> {
    const { privateKeyHash, salt } = userModel;

    const isPrivateKeyCorrect = timingSafeEqual(
      Buffer.from(privateKeyHash, 'hex'),
      createHash('sha256')
        .update(salt)
        .update(privateKey)
        .update(this.USER_PRIVATE_KEY_HASH_SALT)
        .digest(),
    );

    if (!isPrivateKeyCorrect)
      throw new UnauthorizedException(messages.auth.incorrectPrivateKey);

    // if (!userModel.accessScopes.length)
    //   throw new UnauthorizedException(messages.auth.userHasNoAccessScopes);
  }

  async registerNewUserAndLogin(
    createUserDTO: CreateUserDTO,
  ): Promise<RegisterUserResponseDTO> {
    const { walletPrivatePublicKeyPair, user } =
      await this.userUseCase.createUser(createUserDTO);
    return {
      authTokenPair: await this.login({
        ...user,
        publicKey: walletPrivatePublicKeyPair.publicKey,
        accessScopes: [],
      }),
      walletPrivatePublicKeyPair,
    };
  }

  async login(user: UserAuthInfo): Promise<AuthTokenPairDTO> {
    const newSessionUUID = uuid();

    await this.whitelistedSessionStore.updateSessionsOf(user.id, {
      sessionToAdd: {
        uuid: newSessionUUID,
        expirationDate: new Date(), // TODO: реализовать нормальный механизм очистки токенов, которые уже не годны просто потому что истекли
      },
    });

    return {
      accessToken: this.accessTokenUseCase.getAccessToken(user, newSessionUUID),
      refreshToken: this.refreshTokenUseCase.getRefreshToken(
        user,
        newSessionUUID,
      ),
    };
  }

  async useRefreshTokenAndGetNewTokenPair(
    refreshToken: string,
  ): Promise<AuthTokenPairDTO> {
    const {
      sessionUUID: uuidOfSessionToRemove,
      user: { id: userId },
    } = await this.refreshTokenUseCase.decodeRefreshTokenAndGetPayload(
      refreshToken,
    );

    const newSessionUUID = uuid();

    await this.whitelistedSessionStore.updateSessionsOf(userId, {
      sessionToAdd: {
        uuid: newSessionUUID,
        expirationDate: new Date(), // TODO: реализовать нормальный механизм очистки токенов, которые уже не годны просто потому что истекли
      },
      uuidOfSessionToRemove,
    });

    const user = await this.userRepo.getOneByIdWithAccessScopes(userId);

    return {
      accessToken: this.accessTokenUseCase.getAccessToken(user, newSessionUUID),
      refreshToken: this.refreshTokenUseCase.getRefreshToken(
        user,
        newSessionUUID,
      ),
    };
  }

  async logoutAllSessions(userId: number): Promise<void> {
    await this.whitelistedSessionStore.removeAllSessionsOf(userId);
  }

  async logoutSessionOf(userId: number, sessionUUID: string): Promise<void> {
    await this.whitelistedSessionStore.updateSessionsOf(userId, {
      uuidOfSessionToRemove: sessionUUID,
    });
  }

  // private async getAccessAndRefreshToken(
  //   user: UserAuthInfo,
  // ): Promise<TokenPairDTO> {

  // }
}
