import getFunction from './getFunction';

const getPaths = (item) => {
  const type = typeof item;
  const output = { type };

  const paths = (type === 'function') ? getFunction(item) : {};

  return { ...output, ...paths };
};

export default getPaths;
