import {
  calculateYCoordinates,
  countXNodes,
  getConnections
} from "./count-position";

let nodesAllData: any;

// 0. Пока не смотрела, зачем эта функция. Но она вызывается в createNodesWithAllInfo.
const arrCommonFunc = (data: any) => {
  // destructToGens(data);
  // Эта функция рисует связи между 0 поколением и их родителями. Надо масштабировать на все поколения
  const edges: any = [];
  const zeroGen = data.filter((person: any) => person.generation === 0);

  zeroGen.forEach((person: any) => {
    const parents = person.parents;
    parents.forEach((parent: any) => {
      const edge = {
        id: `e${person.id}-${parent}`,
        source: `node-${person.id}`,
        target: `node-${parent}`
      };
      edges.push(edge);
    });
  });
};

// 1. Для далёких предков задаём дату рождения как 01.01. из года рождения
const updateBirthDate = (data: any) => {
  const dataWithBirth = [];
  for (let i = 0; i < data.length; i++) {
    const dataItem = { ...data[i] };
    let dateOfBirth = dataItem.date_of_birth;
    if (dateOfBirth.indexOf("приблизительно") !== -1) {
      dateOfBirth = dateOfBirth.split(" ")[1];
      dateOfBirth = `01.01.${dateOfBirth}`;
      dataItem.date_of_birth = dateOfBirth;
    }
    dataWithBirth.push(dataItem);
  }
  return dataWithBirth;
};

// 2. Задаём дату смерти как "н.в.", если человек жив
const updateDeathDate = (data: any) => {
  const dataWithDeath = [];
  for (let i = 0; i < data.length; i++) {
    const dataItem = { ...data[i] };
    if (data[i].date_of_death === null) {
      dataItem.date_of_death = "н.в.";
    } else {
      dataItem.date_of_death = data[i].date_of_death;
    }
    dataWithDeath.push(dataItem);
  }
  return dataWithDeath;
};

// 3. Разбиваем массив людей в объект с массивами нескольких поколений
const createGenArrs = (data: any) => {
  const genArrs = {};
  const listOfGens: number[] = [];
  for (let i = 0; i < data.length; i++) {
    let tempArrName;
    const gen = data[i].generation;
    if (listOfGens.indexOf(gen) === -1) {
      listOfGens.push(gen);
      tempArrName = `gen-${gen}`;
      /* eslint-disable-next-line */
      //@ts-ignore
      genArrs[tempArrName] = [data[i]];
    } else {
      tempArrName = `gen-${gen}`;
      /* eslint-disable-next-line */
      //@ts-ignore
      genArrs[tempArrName] = [...genArrs[tempArrName], data[i]];
    }
  }
  return genArrs;
};

// 4. Добавляем координаты для отрисовки карточек
// По идее, сюда надо поключить функции расчёта положения

// Перенесла в файл count-position.tsx
// const addCoordinates = (data: any) => {};

const createNodesWithAllInfo = (data: any) => {
  arrCommonFunc(data);
  const dataWithBirthDate = updateBirthDate(data);
  const dataWithDeathDate = updateDeathDate(dataWithBirthDate);
  const dataWithGenerations = createGenArrs(dataWithDeathDate);

  return dataWithGenerations;
};

// Это главная функция для FlowBoard. В ней создаётся массив узлоа с координатами и основными сведениями

// Сейчас мы тут создаём просто массив из исходных данных, в который добавлено поле nodeData с верными координатами y. Надо добавить координаты x
const createNodesData = (wetData: any) => {
  const data = createNodesWithAllInfo(wetData);
  const dataWithCoordinates = calculateYCoordinates(data);
  console.log(dataWithCoordinates);
  const nodesYArr: any = [];
  let nodesArr: any = [];
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

  const initialNodes = nodesArr.map((person: any) => {
    const nodeData = person.nodeData;
    return nodeData;
  });

  console.log(initialNodes);

  return initialNodes;
};

const returnNodesAllData = () => {
  return nodesAllData;
};

// Где-то надо добавить функция задания связей между карточками

// Надо разобраться, что это

// const destructToGens = (data: any) => {
//   const persons: any = {};
//   data.forEach((person: any) => {
//     const gen = `gen-${person.generation}`;
//     if (Object.keys(persons).indexOf(gen) === -1) {
//       persons[gen] = [];
//       persons[gen] = [person];
//     } else {
//       persons[gen] = [...persons[gen], person];
//     }
//   });
//   console.log(persons);
//   return persons;
// };

// const setEdges = (data: any) => {
//   // Эта функция должна формировать массив связей
//   const structData = destructToGens(data);
//   const dataGens = Object.keys(structData);
//   dataGens.forEach((genKey) => {

//   })
// };

const createEdges = (nodes: any) => {
  const edgesArr = nodes.map((node: any) => {
    const connections = getConnections(node);

    const personEdgesArr: any = [];

    connections.forEach((connection) => {
      if (connection > node.id) {
        const edgesData = {
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

  const finalEdgesArr = edgesArr.reduce((a: any, b: any) => {
    return a.concat(b);
  });

  return finalEdgesArr;
};

/* eslint-disable-next-line */
export { createNodesData, returnNodesAllData, createEdges }
