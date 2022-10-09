import { useQuery } from 'react-query';
import { customFetch } from 'utils';
import { GetOverallBalanceOfUserResponse } from 'backendTypes';

export function useMyOverallBalance() {
  const { isLoading, isError, isSuccess, data } = useQuery(
    'useMyOverallBalance',
    () =>
      customFetch<GetOverallBalanceOfUserResponse>(
        'finance/getMyOverallBalance',
        {
          method: 'GET',
          needsAccessToken: true,
        },
      ),
  );
  return {
    isLoading,
    isError,
    isSuccess,
    nfts: data?.nfts,
    balance: data?.balance,
  };
}
