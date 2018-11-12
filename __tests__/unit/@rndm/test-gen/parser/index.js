import path from 'path';
import getRegex from './getRegex';
import mapReduce from './mapReduce';

const defaultExtension = 'js';

const allowedExtension = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.json',
];

const getRequired = (file = '') => {
  try {
    const required = require(file);
    return mapReduce(required);
  } catch (e) {
    const parsed = path.parse(file);
    return getRegex(allowedExtension.includes(parsed.ext) ? file : `${file}.${defaultExtension}`);
  }
};

export default getRequired;
