import { src } from '../utils/paths';

const getMapped = ({ to } = {}) => {
  if (!to) return;
  const path = `${src}/${to}`;
  const required = require(path);
  return {
    ...required,
    ...required.default,
  };
};

export default getMapped;
