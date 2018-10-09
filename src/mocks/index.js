import RN from './react-native';
import { identity } from 'lodash';
import createStubs from '../stubber/createStubs';
import createStub from '../stubber/createStub';

export default {
  'react-native': createStubs(RN),
  'react-redux': {
    connect: () => identity,
    Provider: createStub('Provider'),
  },
};
