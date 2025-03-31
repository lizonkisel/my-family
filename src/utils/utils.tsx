// 0. Пока не смотрела, зачем эта функция. Но она вызывается в createNodesWithAllInfo.
const arrCommonFunc = (data: any) => {
  // destructToGens(data);
  // Эта функция рисует связи между 0 поколением и их родителями. Надо масштабировать на все поколения
  const edges: any = [];
  const zeroGen = data.filter((person: any) => person.generation === 0);
  console.log(zeroGen);

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
  console.log(edges);
};

// 1. Задаём дату смерти как "н.в.", если человек жив
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
  console.log(dataWithDeath);
  return dataWithDeath;
};

// 2. Разбиваем массив людей в объект с массивами нескольких поколений
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
  console.log(genArrs);
  return genArrs;
};

// 3. Для далёких предков задаём дату рождения как 01.01. из года рождения
const updateBirthDate = (genArrs: any) => {
  console.log(genArrs);

  const keys = Object.keys(genArrs);
  console.log(keys);

  keys.forEach((key) => {
    const currGen = genArrs[key];
    for (let j = 0; j < currGen.length; j++) {
      let dateOfBirth = currGen[j].date_of_birth;
      if (dateOfBirth.indexOf("приблизительно") !== -1) {
        dateOfBirth = dateOfBirth.split(" ")[1];
        dateOfBirth = `01.01.${dateOfBirth}`;
        console.log("azaza");
        currGen[j].date_of_birth = dateOfBirth;
      }
      const date = Date.parse(dateOfBirth);
      console.log(date);
    }
  });
  console.log(genArrs);
  return genArrs;
};

// 4. Добавляем координаты для отрисовки карточек
// По идее, сюда надо поключить функции расчёта положения
const addCoordinates = (data: any) => {
  const wetData = data;

  const keys = Object.keys(wetData);
  console.log(keys);

  keys.forEach((key) => {
    const currGen = wetData[key];
    for (let j = 0; j < currGen.length; j++) {
      const xCoor = 10;
      // let yCoor = 20;

      const nodeData = {
        id: `node-${currGen[j].id}`,
        type: "textUpdater",
        position: { x: xCoor, y: 100 },
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

const createNodesWithAllInfo = (data: any) => {
  arrCommonFunc(data);
  const dataWithDeathDate = updateDeathDate(data);
  // По идее, проще вначале апдейтить дату рождения, а уже потом разбивать на поколения
  const dataWithGenerations = createGenArrs(dataWithDeathDate);
  const dataWithBirthDate = updateBirthDate(dataWithGenerations);
  console.log(dataWithBirthDate);

  const dataWithCoordinates = addCoordinates(dataWithBirthDate);
  return dataWithCoordinates;
};

// Это главная функция для FlowBoard. В ней создаётся массив узлоа с координатами и основными сведениями
const createNodesData = (wetData: any) => {
  const data = createNodesWithAllInfo(wetData);
  const nodesArr: any = [];
  const keys = Object.keys(data);
  console.log(keys);

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
