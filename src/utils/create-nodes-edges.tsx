import type { IPersonYData, IPersonAllData, INodeEdges } from "./interfaces";

import createNodesWithAllInfo from "./dates-gens-preparations";

import { calculateYCoordinates, countXNodes } from "./count-position";

import getConnections from "./utils";

let nodesAllData: any;

// Это главная функция для узлов FlowBoard. В ней создаётся массив узлоа с координатами и основными сведениями
const createNodesData = (wetData: any) => {
  const data = createNodesWithAllInfo(wetData);
  const dataWithCoordinates = calculateYCoordinates(data);
  console.log(dataWithCoordinates);
  const nodesYArr: IPersonYData[] = [];
  let nodesArr: IPersonAllData[] = [];
  const keys = Object.keys(dataWithCoordinates);

  keys.forEach((key) => {
    const currGen = dataWithCoordinates[key];
    for (let j = 0; j < currGen.length; j++) {
      // nodesYArr.push(currGen[j].nodeData);
      nodesYArr.push(currGen[j]);
    }
  });
  console.log(nodesYArr);

  nodesArr = countXNodes(nodesYArr);

  nodesAllData = nodesArr;
  console.log(nodesArr);

  const initialNodes = nodesArr.map((person: IPersonAllData) => {
    const nodeData = person.nodeData;
    return nodeData;
  });

  console.log(initialNodes);

  return initialNodes;
};

const getNodesAllData = () => {
  return nodesAllData;
};

// Функция задания связей между карточками
const createEdges = (nodes: IPersonAllData[]) => {
  const edgesArr: INodeEdges[][] = nodes.map((node: IPersonAllData) => {
    const connections = getConnections(node);

    const personEdgesArr: INodeEdges[] = [];

    connections.forEach((connection) => {
      if (connection > node.id) {
        const edgesData: INodeEdges = {
          id: `e${node.id}-${connection}`,
          type: "bezier",
          source: `node-${node.id}`,
          target: `node-${connection}`
        };

        personEdgesArr.push(edgesData);
      }
    });

    return personEdgesArr;
  });

  // Эта функция делает из массива с массивами связей один итоговый массив связей
  const finalEdgesArr = edgesArr.reduce((a: any, b: any) => {
    return a.concat(b);
  });

  return finalEdgesArr;
};

export { createNodesData, getNodesAllData, createEdges };
