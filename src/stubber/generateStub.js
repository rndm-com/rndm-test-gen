import { identity } from 'lodash';
import createStub from './createStub';

const generateStub = ({ type } = {}, name) => {
  switch (type) {
    case 'function':
      return identity;

    case 'class':
      return createStub(name);

    case 'object':
      return {};

    case 'string':
      return '';

    case 'number':
      return 0;

    case 'boolean':
      return true;

    default:
      return identity;
  }
};

export default generateStub;
