import { Position } from "reactflow";

interface IMainPersonData {
  id: number;
  name: string;
  patronymic: string;
  surname: string;
  generation: number;
  gender: "female" | "male";
  date_of_birth: string;
  date_of_death: string | null;
  children: number[];
  parents: number[];
  partner: number[];
  line: "main";
  main_image: string;
}

interface IPersonYNode {
  id: `node-${number}`;
  type: "textUpdater";
  position: { x: 0; y: number };
  data: {
    id: number;
    imageLink: string;
    personName: string;
    date: string;
  };
  sourcePosition?: Position;
  targetPosition?: Position;
}

interface IPersonNode {
  id: `node-${number}`;
  type: "textUpdater";
  position: { x: number; y: number };
  data: {
    id: number;
    imageLink: string;
    personName: string;
    date: string;
  };
  sourcePosition?: Position;
  targetPosition?: Position;
}

interface IPersonYData extends IMainPersonData {
  nodeData: IPersonYNode;
}

interface IPersonAllData extends IMainPersonData {
  nodeData: IPersonNode;
}

interface IGenerationsObj {
  [key: `gen-${number}`]: IMainPersonData[];
}

interface INodeEdges {
  id: `e${number}-${number}`;
  type: "straight" | "step" | "smoothstep" | "bezier";
  source: `node-${number}`;
  target: `node-${number}`;
  sourceHandle?: string | null;
  targetHandle?: string | null;
}
export type {
  IMainPersonData,
  IPersonYData,
  IPersonAllData,
  IGenerationsObj,
  INodeEdges,
  IPersonNode
};
