import { proxyquire } from '../../index';
import { src } from '../../utils/paths';

const stub = ({ from, stubs = {}, returnDefault = true } = {}) => {
  if (!from) return;
  const file = src + from;
  const result = proxyquire(file, stubs);
  return returnDefault ? (result.default || result) : result;
};

export default stub;
