const getRelative = (path = '', key = '') => (
  [...path.split('/').reverse().slice(1).reverse(), key].join('/')
);

export default getRelative;
