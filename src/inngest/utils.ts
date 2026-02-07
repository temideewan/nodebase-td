import toposort from 'toposort';
import { Connection, Node } from '@/generated/prisma/client';

export const topologicalSort = (
  nodes: Node[],
  connections: Connection[],
): Node[] => {
  // if there's no connection in the nodes, return the nodes
  if (connections.length === 0) {
    return nodes;
  }

  // create the edges array for topological sort
  const edges: [string, string][] = connections.map((connection) => {
    return [connection.fromNodeId, connection.toNodeId];
  });

  // Add nodes with no connection as self-edges to ensure they are included
  const connectedNodeIds = new Set<string>();
  for (const conn of connections) {
    connectedNodeIds.add(conn.fromNodeId);
    connectedNodeIds.add(conn.toNodeId);
  }
  for (const node of nodes) {
    if (!connectedNodeIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  // perform topological sort
  let sortedNodeIds: string[];
  try {
    sortedNodeIds = toposort(edges);

    // Remove duplicates (from self-edges)
    sortedNodeIds = [...new Set(sortedNodeIds)];
  } catch (err) {
    if (err instanceof Error && err.message.includes('Cyclic')) {
      throw new Error('Workflow contains a cycle');
    }
    throw err;
  }

  // map sorted IDs back to node objects
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  return sortedNodeIds.map((id) => nodeMap.get(id)!).filter(Boolean);
};
