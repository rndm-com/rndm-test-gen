import { merge } from 'lodash';
import rc from './getRC';
import json from './getPackage';

const defaults = {
  sendStats: true,
};

const getOptions = () => (
  merge({}, defaults, rc(), json())
);

export default getOptions();
