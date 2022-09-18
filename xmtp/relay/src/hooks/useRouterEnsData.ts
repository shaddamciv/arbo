import { useRouter } from 'next/router';
import { useEnsAddress } from 'wagmi';

export function useRouterEnsData() {
  const router = useRouter();
  const name =
    typeof router.query.ens === 'string' ? router.query.ens : undefined;
  const { data: address, isLoading } = useEnsAddress({ name });
  return { name, address, isLoading };
}
