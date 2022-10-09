import { useMutation } from 'react-query';
import { RegisterUserResponseDTO, CreateUserDTO } from 'backendTypes';
import { customFetch } from 'utils';

export function useRegistrationMutation() {
  const { mutate, isLoading, isError, isSuccess, data } = useMutation(
    (user: CreateUserDTO) =>
      customFetch<RegisterUserResponseDTO>('auth/local/register', {
        method: 'POST',
        needsAccessToken: false,
        body: user,
      }),
  );
  return { sendRegistrationQuery: mutate, isLoading, isError, isSuccess, data };
}
