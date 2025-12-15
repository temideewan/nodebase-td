'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

const Page = () => {
  const { data } = authClient.useSession();
  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center'>
      {JSON.stringify(data)}
      {data && <Button onClick={() => authClient.signOut()}>Log out</Button>}
    </div>
  );
};

export default Page;

/**
 * Example usage in client component
 * "use client"
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const trpc = useTRPC()
  const {data: users} = useQuery(trpc.getUsers.queryOptions())
  return <div className="min-h-screen min-w-screen flex items-center justify-center">
    {JSON.stringify(users)}
  </div>;
};

export default Page
 */
