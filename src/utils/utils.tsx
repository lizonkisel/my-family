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

const getLine = (node: any) => {
  let line;
  switch (node.line) {
  /* eslint-disable */
  case "main":
    line = 0;
    break;
  case "second":
  line = 1;
    break;
  default:
    line = 0;
  }
  /* eslint-enable */
  return line;
};

// const getAdditionalXMoving = (node: any) => {
//   /* eslint-disable-next-line */
//   const gender = node.gender;
// }

const addCoordinates = (data: any) => {
  const neededNodes = [];
  /* eslint-disable-next-line */
  for (let i = 0; i < data.length - 1; i++) {
    let dateOfDeath;
    if (data[i].date_of_death === null) {
      dateOfDeath = "н.в.";
    } else {
      dateOfDeath = data[i].date_of_death;
    }

    const line = getLine(data[i]);
    const partnerId = data[i].partner[0];
    const partnerPerson = data[partnerId];
    let gen = data[i].generation;

    if (gen === 0) {
      gen = 0.1;
    }

    let xPos;
    if (neededNodes.length === 0) {
      xPos = 0;
    } else {
      let firstChildXPos;
      const firstChildId = data[i].children[0] || "no child";

      if (firstChildId === "no child") {
        firstChildXPos = 0;
      } else {
        firstChildXPos = Math.round(neededNodes[firstChildId].position.x);
      }

      // const firstChildPerson = data[firstChildId];
      console.log(`firstChildXPos: ${firstChildXPos}`);
      if (data[i].gender === "female") {
        xPos = firstChildXPos - 450;
      } else {
        xPos = firstChildXPos + 100;
      }
    }

    console.log(`gen: ${gen}`);
    console.log(`line: ${line}`);
    console.log(`xPos: ${xPos}`);

    // const additionalXMoving = getAdditionalXMoving(data[i]);

    const neededNode: any = {
      id: `node-${data[i].id}`,
      type: "textUpdater",
      // data: data[i],
      data: {
        personName: `${data[i].name} ${data[i].patronymic} ${data[i].surname}`,
        date: `${data[i].date_of_birth} - ${dateOfDeath}`,
        partner: partnerPerson
        // firstChild: firstChildPerson
      },
      /* eslint-disable-next-line */
      // position: { x: data[i].generation * 100 + data[i].id * 50, y: data[i].generation * 200 }
      position: {
        x: line * 100 + (1 / gen) * 100 + xPos * 1,
        y: gen * 400
      }
    };
    neededNodes.push(neededNode);
  }

  console.log(neededNodes);

  return neededNodes;

  // const dataWithCoordinates = data.map((node: any) => {
  //   const xCoor = node.generation * 10;
  //   const yCoor = node.generation * 20;
  //   /* eslint-disable-next-line */
  //   node.position = { x: xCoor, y: yCoor };
  //   return node;
  // });
  // return dataWithCoordinates;
};

const createInitialNodes = (data: any) => {
  // const dataWithIds = addIds(data);
  const dataWithIds = data;
  const dataWithCoordinates = addCoordinates(dataWithIds);
  return dataWithCoordinates;
};

/* eslint-disable-next-line */
export { createInitialNodes };
