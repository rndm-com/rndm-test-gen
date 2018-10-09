import { merge } from 'lodash';
import rc from './getRC';
import json from './getPackage';

const getOptions = () => (
  merge({}, rc(), json())
);

export default getOptions();
