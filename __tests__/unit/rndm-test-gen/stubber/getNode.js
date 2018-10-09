import { noop } from 'lodash';
import { project } from '../utils/paths';

const { require = noop } = global;

const getNode = (key) => {
  const node = `${project}/node_modules/${key}`;
  const json = require(`${node}/package.json`) || {};
  const { main } = json;
  return `${node}/${main}`;
};
export default getNode;
