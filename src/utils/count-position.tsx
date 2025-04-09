import { Position } from "reactflow";
import type {
  IPersonYData,
  IPersonAllData,
  IGenerationsObj,
  IPersonNode
} from "./interfaces";

import getConnections from "./utils";

const calculateYCoordinates = (data: IGenerationsObj) => {
  // Создам глубокую копию исходных данных
  const copyData = JSON.parse(JSON.stringify(data));
  const keys = Object.keys(copyData);

  keys.forEach((key: string) => {
    const currGen = copyData[key];
    for (let j = 0; j < currGen.length; j++) {
      const xCoor = 0;
      const yCoor = 400 * currGen[j].generation;
      const nodeData: IPersonNode = {
        id: `node-${currGen[j].id}`,
        type: "textUpdater",
        position: { x: xCoor, y: yCoor },
        data: {
          personName: `${currGen[j].name} ${currGen[j].patronymic} ${currGen[j].surname}`,
          date: `${currGen[j].date_of_birth} - ${currGen[j].date_of_death}`
        },
        sourcePosition: Position.Left,
        targetPosition: Position.Right
      };
      currGen[j].nodeData = nodeData;
    }
  });
  return copyData;
};

const countXNodes = (nodesYData: IPersonYData[]) => {
  const repeatInerationArr: IPersonYData[] = [];
  const nodesArr: IPersonAllData[] = [];

  nodesYData.forEach((person) => {
    let xCoor = 0;
    const id = person.id;

    if (id === 0) {
      xCoor = 0;
    } else {
      const connections = getConnections(person);

      const prevNumber = connections.find((elem: any) => {
        return elem < person.id;
      });

      if (prevNumber !== undefined) {
        if (
          nodesYData[prevNumber].id === person.children[0] ||
          nodesYData[prevNumber].id === person.children[1]
        ) {
          if (person.gender === "female") {
            if (nodesYData[prevNumber].gender === "female") {
              // мама девочки
              xCoor =
                nodesArr[prevNumber].nodeData.position.x -
                400 -
                (1 / (person.generation + 1)) * 1200;
              console.log(1.1);
            } else {
              // мама мальчика
              xCoor =
                nodesArr[prevNumber].nodeData.position.x -
                0 -
                (1 / (person.generation + 1)) * 200;
              console.log(1.2);
            }
          } else {
            if (nodesYData[prevNumber].gender === "female") {
              // папа девочки
              xCoor =
                nodesArr[prevNumber].nodeData.position.x +
                0 +
                (1 / (person.generation + 1)) * 1200;
              console.log(2.1);
            } else {
              // папа мальчика
              xCoor =
                nodesArr[prevNumber].nodeData.position.x +
                0 +
                (1 / (person.generation + 1)) * 1600;
              console.log(2.2);
            }
          }
        } else if (nodesYData[prevNumber].id === person.partner[0]) {
          if (person.gender === "female") {
            xCoor =
              nodesArr[prevNumber].nodeData.position.x -
              200 +
              person.generation * 20;
            console.log(3);
          } else {
            xCoor =
              nodesArr[prevNumber].nodeData.position.x +
              50 +
              person.generation * 30;
            console.log(4);
          }
        } else {
          xCoor = 10;
        }
      } else {
        xCoor = -900;
        repeatInerationArr.push(person);
        console.log(`id:${id}, -900`);
      }
    }
    const xPerson: IPersonAllData = { ...person };
    xPerson.nodeData.position.x = xCoor;

    // return xPerson;
    nodesArr.push(xPerson);
  });

  console.log(repeatInerationArr);

  repeatInerationArr.forEach((person: IPersonYData) => {
    let xCoor;
    const prevNumber = getConnections(person)[0];

    if (prevNumber !== undefined) {
      if (
        nodesArr[prevNumber].id === person.children[0] ||
        nodesArr[prevNumber].id === person.children[1]
      ) {
        xCoor = nodesArr[prevNumber].nodeData.position.x + 200;
        console.log(4);
      } else if (nodesArr[prevNumber].id === person.partner[0]) {
        xCoor = nodesArr[prevNumber].nodeData.position.x - 1000;
        console.log(5);
      } else {
        xCoor = -800;
        console.log(6);
      }
    } else {
      xCoor = -900;
      repeatInerationArr.push(person);
    }

    nodesArr[person.id].nodeData.position.x = xCoor;
  });
  console.log(repeatInerationArr);
  console.log(nodesArr);
  return nodesArr;
};

/* eslint-disable-next-line */
export { calculateYCoordinates, countXNodes };
