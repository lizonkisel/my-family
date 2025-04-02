const countX = (person: any) => {
  // console.log(`Person.id: ${person.id}`);
  let xCoor = 0;

  const generation = person.generation;
  console.log(`${generation}: generation`);

  const gender = person.gender === "female" ? -0.5 : 1;
  // console.log(`${gender}: gender`);

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
  // console.log(`${childrenCoef}: childrenCoef`);

  if (person.partner.length !== 0) {
    partnerCoef = person.id - person.partner[0];
  }
  // console.log(`${partnerCoef}: partnerCoef`);

  xCoor = -1 * childrenCoef * 300 - gender * 300 - partnerCoef * -1 * 300;
  // console.log(`${xCoor}: xCoor`);
  return xCoor;
};

// const countY = (person: any) => {
//   const yCoor = 0;
//   return yCoor;
// };

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

interface IGenerationsObj {
  [key: `gen-${number}`]: IMainPersonData[];
}

const calculateCoordinates = (data: IGenerationsObj) => {
  console.log(data);
  // Создам глубокую копию исходных данных
  const copyData = JSON.parse(JSON.stringify(data));
  const keys = Object.keys(copyData);

  keys.forEach((key: any) => {
    const currGen = copyData[key];
    for (let j = 0; j < currGen.length; j++) {
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
  console.log(copyData);
  return copyData;
};

/* eslint-disable-next-line */
export { calculateCoordinates };
