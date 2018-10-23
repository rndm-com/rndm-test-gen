import fs from 'fs';
import getRequired from '../parser';
import getNode from './getNode';
import getRelative from './getRelative';
import options from '../options';

const { ignoreNodes = [] } = (options || {});

const ignore = [
  'react',
  'lodash',
  'babel-runtime',
  'chai',
  'chai-as-promised',
  'enzyme',
  'enzyme-adapter-react-16',
  'sinon',
  'sinon-chai',
  'fs',
  'path',
  ...ignoreNodes,
];

const imports = (path, key = '') => {
  if (ignore.includes(key)) return null;
  const relative = (key.startsWith('.')) ? getRelative(path, key) : getNode(key);
  if (fs.existsSync(relative) && fs.statSync(relative).isDirectory()) return getRequired(`${relative}/index.js`);
  return getRequired(relative);
};
export default imports;
