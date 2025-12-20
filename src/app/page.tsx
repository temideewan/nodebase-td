'use client';
import { caller } from '@/trpc/server';
import { LogoutButton } from './logout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Page = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const { data, isPending, isError } = useQuery(trpc.getWorkflows.queryOptions());
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued")
      },
    })
  );
  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6'>
      Protected server component
      {isPending && <div>Pending....</div>}
      {isError && <div className='text-red-500'>Something went wrong</div>}
      {data && <div>{JSON.stringify(data, null, 2)}</div>}
      <Button onClick={() => create.mutate()} disabled={create.isPending}>
        Create workflow
      </Button>
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
