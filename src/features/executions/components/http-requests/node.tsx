'use client';

import { type NodeProps, Node } from '@xyflow/react';
import { GlobeIcon } from 'lucide-react';
import { memo, useState } from 'react';
import { BaseExecutionNode } from '../base-execution-node';
import { HttpRequestsDialog } from './dialog';

type HttpRequestNodeData = {
  endpoint?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: string;
  [key: string]: any;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = 'success';

  const handleOpenSettings = () => setDialogOpen(true);

  const nodeData = props.data;

  const description = nodeData?.endpoint
    ? `${nodeData.method ?? 'GET'}`
    : 'Not Configured';
  return (
    <>
      <HttpRequestsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={() => {}}
        defaultEndpoint={nodeData.endpoint}
        defaultMethod={nodeData.method}
        defaultBody={nodeData.body}
      />
      <BaseExecutionNode
        {...props}
        icon={GlobeIcon}
        name='HttpRequest'
        description={description}
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      ></BaseExecutionNode>
    </>
  );
});

HttpRequestNode.displayName = 'HttpRequestNode';
