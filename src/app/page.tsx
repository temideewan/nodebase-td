import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

const Page = async () => {
  await requireAuth()
  const data = await caller.getUsers()
  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6'>
      Protected server component
      <div>
      {JSON.stringify(data, null, 2)}
      </div>
      <LogoutButton></LogoutButton>
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
