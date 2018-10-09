import { src } from '../utils/paths';

const getMapped = ({ to } = {}) => {
  if (!to) return;
  const path = `${src}/${to}`;
  return require(path);
};

export default getMapped;
