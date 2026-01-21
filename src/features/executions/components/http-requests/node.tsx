'use client';

import { type NodeProps, Node } from '@xyflow/react';
import { GlobeIcon } from 'lucide-react';
import { memo } from 'react';
import { BaseExecutionNode } from '../base-execution-node';

type HttpRequestNodeData = {
  endpoint?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: string;
  [key: string]: any;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const nodeData = props.data;
  const description = nodeData?.endpoint
    ? `${nodeData.method ?? 'GET'}`
    : 'Not Configured';
  return (
    <>
      <BaseExecutionNode
        {...props}
        icon={GlobeIcon}
        name='HttpRequest'
        description={description}
        onSettings={() => {}}
        onDoubleClick={() => {}}
      ></BaseExecutionNode>
    </>
  );
});

HttpRequestNode.displayName = 'HttpRequestNode';
