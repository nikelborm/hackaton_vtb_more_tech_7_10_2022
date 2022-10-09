import { Injectable } from '@nestjs/common';
import { mockUseCaseMethodsAllowedToBeExecuted } from 'src/config';
import { FinanceUseCase, repo, UserUseCase } from 'src/modules';
import { AccessScopeType } from 'src/types';

@Injectable()
export class MockDataUseCase {
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly accessScopeRepo: repo.AccessScopeRepo,
    private readonly financeUseCase: FinanceUseCase,
    private readonly userToAccessScopeRepo: repo.UserToAccessScopeRepo,
  ) {}

  async executeMock(scriptName?: string): Promise<void> {
    if (!scriptName)
      throw new Error(
        `Method name (mock/execute?mockScriptName=) of MockDataUseCase name was not specified`,
      );

    if (!mockUseCaseMethodsAllowedToBeExecuted.has(scriptName))
      throw new Error(
        `'${scriptName}' was not found in allowed method names of MockDataUseCase to be executed`,
      );

    console.log(`\n\n\nFILLING STARTED: ${scriptName}\n`);

    await this[scriptName]();

    console.log('\nDATABASE FILLED SUCCESSFULLY\n\n\n');
  }

  async fillDBScript(): Promise<void> {
    console.log('fillDBScript called');

    const systemAdminScope = await this.accessScopeRepo.createOneWithRelations({
      type: AccessScopeType.SYSTEM_ADMIN,
    });

    const { user, walletPrivatePublicKeyPair } =
      await this.userUseCase.createUser({
        email: 'asd@asd.asd',
        lastName: 'Такой-тов',
        firstName: 'Такой-то',
        patronymic: 'Такой-тович',
        gender: 'male',
      });
    console.log('walletPrivatePublicKeyPair: ', walletPrivatePublicKeyPair);

    await this.userToAccessScopeRepo.createOne({
      accessScopeId: systemAdminScope.id,
      userId: user.id,
    });

    await this.financeUseCase.createNFT({
      certificateContent: {
        name: 'More tech',
        description: 'Сертификат за участвие в хакатоне More Tech 2022',
      },
      receiverUserId: user.id,
    });

    // const asd = await this.financeUseCase.getOverallBalanceOfUser(
    //   '0x1D996a20F1c65a93D23BDa271F5186aca3b77caf',
    // );
    // console.log('asd: ', asd);
  }
}
