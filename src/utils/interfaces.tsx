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
}

interface IPersonYNode {
  id: `node-${number}`;
  type: "textUpdater";
  position: { x: 0; y: number };
  data: {
    personName: string;
    date: string;
  };
}

interface IPersonNode {
  id: `node-${number}`;
  type: "textUpdater";
  position: { x: number; y: number };
  data: {
    personName: string;
    date: string;
  };
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
}

export type { IPersonYData, IPersonAllData, IGenerationsObj, INodeEdges };
