import type { IPersonAllData } from "./interfaces";

const getConnections = (person: IPersonAllData) => {
  const children = person.children.filter((number) => {
    /* eslint-disable-next-line */
    return !isNaN(Number(number));
  });
  const parents = person.parents.filter((number) => {
    /* eslint-disable-next-line */
    return !isNaN(Number(number));
  });

  const partner = person.partner.filter((number) => {
    /* eslint-disable-next-line */
    return !isNaN(Number(number));
  });

  const connections = children.concat(parents, partner);
  return connections;
};

export default getConnections;
