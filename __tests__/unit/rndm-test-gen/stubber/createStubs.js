import createStub from './createStub';
import reduce from '../utils/reduce';

const createStubs = (items = []) => items.map(item => {
  if (typeof item === 'string') return { [item]: createStub(item) };
  if (typeof item === 'object') return { [item.name]: createStub(item) };
  return null;
}).filter(Boolean).reduce(reduce, {});

export default createStubs;
