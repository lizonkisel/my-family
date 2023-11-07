// import data from "../data/data.json";

const addIds = (data: any) => {
  /* eslint-disable-next-line */
  for (let i = 0; i < data.length - 1; i++) {
    /* По-хорошему, тут нужно описать тип объекта и добавить туда id-шник. Тогда ts ругаться не будет */
    /* eslint-disable-next-line */
    //@ts-ignore
    /* eslint-disable-next-line */
    data[i].id = i;
  }
  console.log(data);

  return data;
};

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

    const neededNode = {
      id: `node-${data[i].id}`,
      type: "textUpdater",
      // data: data[i],
      data: {
        personName: `${data[i].name} ${data[i].patronymic} ${data[i].surname}`,
        date: `${data[i].date_of_birth} - ${dateOfDeath}`
      },
      /* eslint-disable-next-line */
      position: { x: data[i].generation * 100 + data[i].id * 50, y: data[i].generation * 200 }
    };
    neededNodes.push(neededNode);
  }

  return neededNodes;

  // const dataWithCoordinates = data.map((node: any) => {
  //   const xCoor = node.generation * 10;
  //   const yCoor = node.generation * 20;
  //   /* eslint-disable-next-line */
  //   node.position = { x: xCoor, y: yCoor };
  //   return node;
  // });
  // console.log(dataWithCoordinates);
  // return dataWithCoordinates;
};

const createInitialNodes = (data: any) => {
  const dataWithIds = addIds(data);
  const dataWithCoordinates = addCoordinates(dataWithIds);
  return dataWithCoordinates;
};

/* eslint-disable-next-line */
export { createInitialNodes };
