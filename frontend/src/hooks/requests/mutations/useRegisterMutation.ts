/* eslint-disable prettier/prettier */
import { useMutation } from 'react-query';
import { TokenPairDTO, CreateUserDTO } from 'backendTypes';
import { customFetch, useTokenPairUpdater } from 'utils';

export function useRegistrationMutation() {
  const { updateTokenPair } = useTokenPairUpdater();
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (user: CreateUserDTO) =>
    customFetch<TokenPairDTO>('auth/local/register', {
      method: 'POST',
      needsAccessToken: false,
      body: user,
    }).then(updateTokenPair),
  );
  return { sendRegistrationQuery: mutate, isLoading, isError, isSuccess };
}
