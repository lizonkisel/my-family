import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges
} from "reactflow";
import "reactflow/dist/style.css";

import "../Person/Person.scss";

import NodePerson from "../Person/NodePerson";

const initialNodes = [
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 }
  },
  {
    id: "node-2",
    type: "textUpdater",
    position: { x: 200, y: 200 },
    data: { value: 123 }
  }
];

const initialEdges = [
  {
    id: "e1-2",
    source: "node-1",
    target: "node-2"
  }
  // { id: "e2-3", source: "2", target: "3", animated: true },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: NodePerson };

function FlowBoard() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    /* eslint-disable-next-line */
    // @ts-ignore
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    /* eslint-disable-next-line */
    // @ts-ignore
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    /* eslint-disable-next-line */
    // @ts-ignore
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      // style={rfStyle}
    />
  );
}

export default FlowBoard;