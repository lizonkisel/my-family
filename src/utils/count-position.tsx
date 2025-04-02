let dataForNodes;
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

const countX = (
  person: IMainPersonData,
  j: number,
  prevNodePosition: { x: number; y: number } | 0
) => {
  // console.log(`Person.id: ${person.id}`);
  console.log(`id: ${person.id}`);
  // j - поколение
  console.log(`j: ${j}`);
  console.log(`prevNodePosition: ${prevNodePosition}`);
  let xCoor = 0;

  if (j === 0) {
    xCoor = 0;
    return xCoor;
  }

  // Если это не первый айди. по идее должна срабатывать только для id = 1 (Валера). Но пока не так
  if (prevNodePosition !== 0 && prevNodePosition.x === 0) {
    console.log(`Ловушка для ${person.id}`);
    xCoor = 200;
    return xCoor;
  }

  // Если есть дети
  if (prevNodePosition !== 0 && person.children.length !== 0) {
    // Если ребёнок - это предыдущий айдишник
    if (person.children[person.children.length - 1] === j - 1) {
      xCoor = prevNodePosition.x - 300;
      console.log(`id: ${person.id}, xCoor: ${xCoor}`);
      // Если партнёр - предыдущий айдишник
    } else if (person.partner.length !== 0 && person.partner[0] === j - 1) {
      xCoor = prevNodePosition.x + 400;
    } else {
      xCoor = prevNodePosition.x - 800;
    }
  }

  // Если нет детей и нет партнёра
  if (
    prevNodePosition !== 0 &&
    person.children.length === 0 &&
    person.partner.length === 0
  ) {
    xCoor = prevNodePosition.x - 600;
  }

  console.log(`id: ${person.id}, xCoor: ${xCoor}`);
  return xCoor;
};

// const countY = (person: IMainPersonData, j: number) => {
//   let yCoor = 0;

//   if (j === 0) {
//     yCoor = 0;
//     return yCoor;
//   }
//   yCoor = 400 * person.generation;
//   return yCoor;
// };

const calculateCoordinates = (data: IGenerationsObj) => {
  console.log(data);
  // Создам глубокую копию исходных данных
  const copyData = JSON.parse(JSON.stringify(data));
  const keys = Object.keys(copyData);

  keys.forEach((key: any) => {
    const currGen = copyData[key];
    for (let j = 0; j < currGen.length; j++) {
      let prevPosition;
      if (j === 0) {
        prevPosition = 0;
      } else {
        prevPosition = currGen[j - 1].nodeData.position;
      }
      const xCoor = countX(currGen[j], j, prevPosition);
      const yCoor = 400 * currGen[j].generation;
      // const yCoor = countY(currGen[j], j);

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
  dataForNodes = copyData;
  return copyData;
};

console.log(dataForNodes);

/* eslint-disable-next-line */
export { calculateCoordinates };
