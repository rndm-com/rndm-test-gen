import getRegex from './getRegex';
import mapReduce from './mapReduce';

const getRequired = (file) => {
  try {
    const required = require(file);
    return mapReduce(required);
  } catch (e) {
    return getRegex(file);
  }
};

export default getRequired;
