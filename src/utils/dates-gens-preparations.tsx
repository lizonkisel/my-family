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

// 4. Через единую функцию последовательно собираем объект с нужным форматом дат
// рождения/смерти, разбитый по поколениям
const createNodesWithAllInfo = (data: any) => {
  const dataWithBirthDate = updateBirthDate(data);
  const dataWithDeathDate = updateDeathDate(dataWithBirthDate);
  const dataWithGenerations = createGenArrs(dataWithDeathDate);

  return dataWithGenerations;
};

export default createNodesWithAllInfo;
