import { proxyquire } from '../../index';
import { src } from '../../utils/paths';

const stub = ({ from, stubs = {}, returnDefault = true } = {}) => {
  if (!from) return;
  const file = src + from;
  let result;
  try {
    proxyquire.callThru()
    result = proxyquire(file, stubs);
  } catch (_) {
    proxyquire.noCallThru()
    result = proxyquire(file, stubs);
  }
  return returnDefault ? (result.default || result) : result;
};

export default stub;
