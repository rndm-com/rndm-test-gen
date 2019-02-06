import TYPES from './TYPES';
import getReferenceType from './getReferenceType';
import getClassType from './getClassType';

const getType = (match = '', contents = '') => {
  const name = match.split(' ').filter(Boolean);
  const [first = ''] = name;
  const firstCharacter = first[0];
  if (first === 'class') return getClassType(match);
  if (first.startsWith('connect(')) {
    if (match.includes('class ')) return getClassType(match);
    const split = match.split('(');
    if (split.length > 3) return TYPES.FUNCTION;
    const reference = split.reverse()[0].replace(')', '').replace(';', '');
    return getReferenceType(reference, contents);
  }
  if (first === 'function' || first.includes('(') || firstCharacter === '(') return TYPES.FUNCTION;
  if (!['\'', '"', '{', '['].includes(firstCharacter) && !Number.isInteger(firstCharacter)) return getReferenceType(first.split(';')[0], contents);
  return TYPES.STATIC;
};

export default getType;
