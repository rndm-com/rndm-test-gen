import itemsToTests from './itemsToTests';
import reduce from '../../utils/reduce';

export default (object = {}) => {
  const keys = Object.keys(object);

  const output = keys
    .map(key => {
      const cached = {};
      const tests = itemsToTests(object[key], key === 'default')
        .filter(i => {
          const json = JSON.stringify(i);
          if (cached[json]) return false;
          cached[json] = json;
          return true;
        })
      return ({ [key]: tests });
    })
    .reduce(reduce, {});
  return JSON.stringify(output, null, 2);
};
