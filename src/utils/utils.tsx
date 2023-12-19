// import data from "../data/data.json";

// const addIds = (data: any) => {
//   /* eslint-disable-next-line */
//   for (let i = 0; i < data.length - 1; i++) {
//     /* По-хорошему, тут нужно описать тип объекта и добавить туда id-шник. Тогда ts ругаться не будет */
//     /* eslint-disable-next-line */
//     //@ts-ignore
//     /* eslint-disable-next-line */
//     data[i].id = i;
//   }
//   console.log(data);

//   return data;
// };

// const getLine = (node: any) => {
//   let line;
//   switch (node.line) {
//   /* eslint-disable */
//   case "main":
//     line = 0;
//     break;
//   case "second":
//   line = 1;
//     break;
//   default:
//     line = 0;
//   }
//   /* eslint-enable */
//   return line;
// };

// const getAdditionalXMoving = (node: any) => {
//   /* eslint-disable-next-line */
//   const gender = node.gender;
// }

const addDates = (data: any) => {
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

const sortPeople = (genArrs: any) => {
  const keys = Object.keys(genArrs);
  keys.forEach((key) => {
    const currGen = genArrs[key];
    for (let j = 0; j < currGen.length; j++) {
      let dateOfBirth = currGen[j].date_of_birth;
      if (dateOfBirth.indexOf("приблизительно") !== -1) {
        dateOfBirth = dateOfBirth.split(" ")[1];
        dateOfBirth = `01.01.${dateOfBirth}`;
      }
      const date = Date.parse(dateOfBirth);
      console.log(date);
    }
  });
};

// const addCoordinates = (genArrs: any) => {};

// const addCoordinates = (data: any) => {
//   const neededNodes = [];
//   const counter = 0;

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

// console.log(neededNodes);

// return neededNodes;

// const dataWithCoordinates = data.map((node: any) => {
//   const xCoor = node.generation * 10;
//   const yCoor = node.generation * 20;
//   /* eslint-disable-next-line */
//   node.position = { x: xCoor, y: yCoor };
//   return node;
// });
// return dataWithCoordinates;
// };

const createInitialNodes = (data: any) => {
  const dataWithDates = addDates(data);
  // const dataWithCoordinates = addCoordinates(dataWithDates);
  const dataWithCoordinates = sortPeople(createGenArrs(dataWithDates));
  return dataWithCoordinates;
};

/* eslint-disable-next-line */
export { createInitialNodes };
