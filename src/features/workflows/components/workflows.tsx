'use client';
import React from 'react';
import {
  useCreateWorkflow,
  useRemoveWorkflow,
  useSuspenseWorkflows,
} from '../hooks/use-workflows';
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from '@/components/entity-components';
import { useUpgradeModal } from '@/hooks/use-upgrade-modal';
import { useRouter } from 'next/navigation';
import { useWorkflowsParams } from '../hooks/use-workflows-params';
import { useEntitySearch } from '@/hooks/use-entity-search';
import type { Workflow } from '@/generated/prisma/client';
import { WorkflowIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  const [params] = useWorkflowsParams();
  const emptyWorkflowMessage =
    params.search.length > 0
      ? 'No workflows matching your search. Create a new workflow to search'
      : "You haven't created any workflows yet. Get started by creating your first workflow";
  if (workflows.data.items.length === 0) {
    return <WorkflowsEmpty message={emptyWorkflowMessage} />;
  }
  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowItem data={workflow} />}
    />
  );
};

export default WorkflowsList;

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
  return (
    <>
      {modal}
      <EntityHeader
        title='Workflows'
        description='Create and manage your workflows'
        newButtonLabel='New Workflow'
        disabled={disabled}
        onNew={handleCreate}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });
  return (
    <EntitySearch
      value={searchValue}
      placeHolder='Search workflows'
      onChange={onSearchChange}
    />
  );
};

export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();
  return (
    <EntityPagination
      disabled={workflows.isFetching}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};

export const WorkflowsLoading = () => {
  return <LoadingView message='Loading workflows' />;
};
export const WorkflowsError = () => {
  return <ErrorView message='Error loading workflows' />;
};
export const WorkflowsEmpty = ({ message }: { message: string }) => {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();
  const router = useRouter();
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handleError(error);
      },
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
    });
  };
  return (
    <>
      {modal}
      <EmptyView
        onNew={handleCreate}
        message={message}
        disabledButton={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkflowItem = ({ data }: { data: Workflow }) => {
  const removeWorkflow = useRemoveWorkflow();
  const handleRemoveWorkflow = () => {
    removeWorkflow.mutate({
      id: data.id,
    });
  };
  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{' '}
          &bull; Created{' '}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })}
        </>
      }
      image={
        <div className='size-8 flex items-center justify-center'>
          <WorkflowIcon className='size-5 text-muted-foreground' />
        </div>
      }
      onRemove={handleRemoveWorkflow}
      isRemoving={removeWorkflow.isPending}
    />
  );
};
