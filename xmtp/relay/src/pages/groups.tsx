import { useConnect } from 'wagmi';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import GroupConversations from 'components/GroupConversations';

export default function Page() {
  const { isConnected, isReconnecting } = useConnect();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected && !isReconnecting) router.push('/');
  }, [isConnected, isReconnecting, router]);

  return <GroupConversations />;
}
