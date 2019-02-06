import { identity } from 'lodash';
import createStub from './createStub';
import TYPES from '../parser/TYPES';

const generateStub = ({ type } = {}, name) => {
  switch (type) {
    case TYPES.FUNCTION:
      return identity;

    case TYPES.CLASS:
    case TYPES.REACT_CLASS:
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
