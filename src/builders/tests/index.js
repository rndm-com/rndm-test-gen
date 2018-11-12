import Path from 'path';
import templates from './getTests';
import parser from '../../parser';
import { src } from '../../utils/paths';

const getContents = (file = '') => {
  const level = file.split(Path.sep).length - 1;
  const absolute = `${src}${file.replace('.spec.js', '.js')}`;
  const types = parser(absolute);
  return templates(types, level, file);
};

export default getContents;
