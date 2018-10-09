import itemsToTests from './itemsToTests';
import reduce from '../../utils/reduce';

export default (object = {}) => {
  const keys = Object.keys(object);
  const output = keys
    .map(key => ({ [key]: itemsToTests(object[key], key === 'default') }))
    .reduce(reduce, {});
  return JSON.stringify(output, null, 2);
};
