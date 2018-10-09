import fs from 'fs';
import { src } from '../utils/paths';
import packages from './packages';

export default (file) => {
  const path = `${src}${file}`;
  const contents = fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '';
  return packages(contents, path);
};
