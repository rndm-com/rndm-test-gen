import { get } from 'lodash';
import TYPES from './TYPES';
import getType from './getType';
import getReferenceType from './getReferenceType';

export const splitPath = (input = '', separator = '', path = '0') => get(input.split(separator), path) || '';

export const preES6Export = (trimmed = '', contents = '') => {
  const key = 'default';
  const split = splitPath(trimmed, 'module.exports = ', '1');
  const type = getType(split, contents);
  if (typeof type === 'object') return type;
  return {
    [key]: { type },
  };
};

export const defaultExport = (trimmed = '', contents = '') => {
  const key = 'default';
  const split = splitPath(trimmed, 'export default ', '1');
  const type = getType(split, contents);
  return {
    [key]: { type },
  };
};

export const constExport = (trimmed = '', contents = '') => {
  const key = splitPath(splitPath(trimmed, 'module.exports = ', '1'), ' ');
  const type = getType(key, contents);
  return {
    [key]: { type },
  };
};

export const functionExport = (trimmed = '') => {
  const key = splitPath(splitPath(splitPath(trimmed, 'module.exports = ', '1'), ' '), '(');
  return {
    [key]: { type: TYPES.FUNCTION },
  };
};

export const structuredExport = (trimmed = '', contents = '') => {
  const joined = trimmed.split('\n')
    .join('')
    .replace('export {', '')
    .replace('}', '')
    .split(' ')
    .join('')
    .split(',')
    .filter(Boolean);
  return joined.reduce((o, i) => ({
    ...o,
    [i]: { type: getReferenceType(i, contents) },
  }), {});
};

export const postES6Export = (trimmed = '', contents = '') => {
  if (trimmed.startsWith('export default')) return defaultExport(trimmed, contents);
  if (trimmed.startsWith('export const')) return constExport(trimmed, contents);
  if (trimmed.startsWith('export function')) return functionExport(trimmed, contents);
  return structuredExport(trimmed, contents);
};

const identifyExports = (match = '', contents = '') => {
  const trimmed = match.split(' ').filter(Boolean).join(' ');
  if (trimmed.startsWith('module.exports = ')) return preES6Export(trimmed, contents);
  return postES6Export(trimmed, contents);
};

export default identifyExports;
