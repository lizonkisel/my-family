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

const countX = (person: any) => {
  console.log(`Person.id: ${person.id}`);
  let xCoor = 0;

  const generation = person.generation;
  console.log(`${generation}: generation`);

  const gender = person.gender === "female" ? -0.5 : 1;
  console.log(`${gender}: gender`);

  let childrenCoef = 0;
  let partnerCoef = 0;

  if (person.children.length !== 0) {
    if (gender === -0.5) {
      childrenCoef = person.id - person.children[0];
    } else {
      childrenCoef = person.id - person.children[0];
    }
    // childrenCoef = person.id - person.children[0];
  }
  console.log(`${childrenCoef}: childrenCoef`);

  if (person.partner.length !== 0) {
    partnerCoef = person.id - person.partner[0];
  }
  console.log(`${partnerCoef}: partnerCoef`);

  xCoor = -1 * childrenCoef * 300 - gender * 300 - partnerCoef * -1 * 300;
  console.log(`${xCoor}: xCoor`);
  return xCoor;
};

// 4. Добавляем координаты для отрисовки карточек
// По идее, сюда надо поключить функции расчёта положения
const addCoordinates = (data: any) => {
  const wetData = data;

  const keys = Object.keys(wetData);

  keys.forEach((key) => {
    const currGen = wetData[key];
    for (let j = 0; j < currGen.length; j++) {
      // const xCoor = 240 * currGen[j].generation + 240 * currGen[j].id;
      // const yCoor = 400 * currGen[j].generation;

      const xCoor = countX(currGen[j]);
      const yCoor = 400 * currGen[j].generation;

      const nodeData = {
        id: `node-${currGen[j].id}`,
        type: "textUpdater",
        position: { x: xCoor, y: yCoor },
        data: {
          personName: `${currGen[j].name} ${currGen[j].patronymic} ${currGen[j].surname}`,
          date: `${currGen[j].date_of_birth} - ${currGen[j].date_of_death}`
        }
      };
      currGen[j].nodeData = nodeData;
    }
  });
  console.log(wetData);
  return wetData;
};

// const countY = (person: any) => {
//   const yCoor = 0;
//   return yCoor;
// };

const createNodesWithAllInfo = (data: any) => {
  arrCommonFunc(data);
  const dataWithBirthDate = updateBirthDate(data);
  const dataWithDeathDate = updateDeathDate(dataWithBirthDate);
  const dataWithGenerations = createGenArrs(dataWithDeathDate);

  const dataWithCoordinates = addCoordinates(dataWithGenerations);
  return dataWithCoordinates;
};

// Это главная функция для FlowBoard. В ней создаётся массив узлоа с координатами и основными сведениями
const createNodesData = (wetData: any) => {
  const data = createNodesWithAllInfo(wetData);
  const nodesArr: any = [];
  const keys = Object.keys(data);

  keys.forEach((key) => {
    const currGen = data[key];
    for (let j = 0; j < currGen.length; j++) {
      nodesArr.push(currGen[j].nodeData);
    }
  });
  console.log(nodesArr);
  return nodesArr;
};

// Где-то надо добавить функция задания связей между карточками

// Надо разобраться, что это

// const addCoordinates = (genArrs: any) => {};

// const addCoordinates = (data: any) => {
//   const neededNodes = [];
//   let counter = 0;

//   while (counter < data.length) {

//     const neededNode: any = {
//       id: `node-${data[i].id}`,
//       type: "textUpdater",
//       // data: data[i],
//       data: {
//         personName: `${data[i].name} ${data[i].patronymic} ${data[i].surname}`,
//         date: `${data[i].date_of_birth} - ${dateOfDeath}`,
//         partner: firstPartner
//         // firstChild: firstChildPerson
//       },
//       /* eslint-disable-next-line */
//       // position: { x: data[i].generation * 100 + data[i].id * 50, y: data[i].generation * 200 }
//       position: {
//         x: xPos * 1,
//         y: gen * 400
//       }
//     };
//     neededNodes.push(neededNode);
//     counter++;
//   }
//   console.log(neededNodes);

//   return neededNodes;

// const dataWithCoordinates = data.map((node: any) => {
//   const xCoor = node.generation * 10;
//   const yCoor = node.generation * 20;
//   /* eslint-disable-next-line */
//   node.position = { x: xCoor, y: yCoor };
//   return node;
// });
// return dataWithCoordinates;
// };

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

/* eslint-disable-next-line */
export { createNodesData }
