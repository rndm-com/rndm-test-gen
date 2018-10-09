import TYPES from './TYPES';
import getGetters from './getGetters';

const getReferenceType = (first = '', contents = '') => {
  const regex = `((const)|(class)|(function)) ${first} (.*)`;
  const matches = contents.match(new RegExp(regex, 'g'));

  if (!matches) return TYPES.STATIC;

  const getters = getGetters(matches[0], contents);
  if (getters) return getters;

  const reference = matches[0];
  if (reference.includes('class ')) return TYPES.CLASS;
  if (reference.startsWith('function') || first.includes('(')) return TYPES.FUNCTION;
  const split = reference.split(' ').filter(Boolean).join(' ').split(' = ')[1];
  if (split[0] === '(') return TYPES.FUNCTION;
  return TYPES.STATIC;
};

export default getReferenceType;
