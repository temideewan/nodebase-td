import { Button } from '@/components/ui/button';
import { useExecuteWorkflow } from '@/features/workflows/hooks/use-workflows';
import { FlaskConicalIcon } from 'lucide-react';

export const ExecuteWorkflowButton = ({
  workflowId,
}: {
  workflowId: string;
}) => {
  const executeWorkflow = useExecuteWorkflow();

  const handleWorkflowExecution = () => {
    executeWorkflow.mutate({ id: workflowId });
  };
  return (
    <Button
      size={'lg'}
      onClick={handleWorkflowExecution}
      disabled={executeWorkflow.isPending}
    >
      <FlaskConicalIcon className='size-4' />
      Execute Workflow
    </Button>
  );
};
