import getArgs from './getArgs';
import map from './map';
import TYPES from './TYPES';
import reduce from '../utils/reduce';
import noclass from '../utils/noclass';

const getProperties = (item = noclass) => {
  const parent = Object.getPrototypeOf(item.prototype.constructor).name;
  const type = parent.includes('Component') ? TYPES.REACT_CLASS : parent !== '' ? TYPES.CLASS : TYPES.FUNCTION;
  const statics = Object.getOwnPropertyNames(item).filter(i => !['length', 'name', 'prototype'].includes(i)).map(key => map(key, item)).reduce(reduce, {});
  const prototypes = Object.getOwnPropertyNames(item.prototype).filter(i => !['constructor'].includes(i)).map(key => map(key, item.prototype)).reduce(reduce, {});
  const args = getArgs(item);
  return ({
    type,
    parent,
    statics,
    prototypes,
    args,
  });
};

export default getProperties;
