import templates from '../builders/tests/getTests';
import getRequired from './index';
import { src } from '../utils/paths';

const getContents = (file = '') => {
  const level = file.split('/').length - 1;
  const absolute = `${src}${file.replace('.spec.js', '.js')}`;
  const types = getRequired(absolute);
  return templates(types, level, file);
};

export default getContents;
