import options from '../../options';

const { include = [], exclude = [] } = options;

export const src = (item = '') => (
  item.includes('.js') &&
  (include.length === 0 || include.find(inc => item.includes(inc))) &&
  (exclude.length === 0 || exclude.find(inc => !item.includes(inc)))
);

export const specs = (item = '') => (
  item.endsWith('.spec.js')
);

export const tests = (item = '') => (
  item.endsWith('.json')
);
