import getPaths from './getPaths';

const map = (key, object) => {
  if (!key || !object || !object[key]) return {};
  const item = object[key];
  const output = getPaths(item);
  return ({ [key]: output });
};

export default map;
