import data from "../data/data.json";

const addIds = () => {
  /* eslint-disable-next-line */
  for (let i = 0; i < data.length - 1; i++) {
    /* По-хорошему, тут нужно описать тип объекта и добавить туда id-шник. Тогда ts ругаться не будет */
    /* eslint-disable-next-line */
    //@ts-ignore
    data[i].id = i;
  }
  console.log(data);

  return data;
};

/* eslint-disable-next-line */
export { addIds };
