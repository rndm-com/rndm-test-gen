import getRegex from './getRegex';
import mapReduce from './mapReduce';

const defaultExtension = 'js';

const allowedExtension = [
  'js',
  'jsx',
  'ts',
  'tsx',
  'json',
];

const getRequired = (file) => {
  try {
    const required = require(file);
    return mapReduce(required);
  } catch (e) {
    const comps = file.split('/');
    const last = comps[comps.length - 1];
    const fileComps = last.split('.');
    const fileExtension = fileComps[fileComps.length - 1];
    return getRegex(allowedExtension.includes(fileExtension) ? file : `${file}.${defaultExtension}`);
  }
};

export default getRequired;
