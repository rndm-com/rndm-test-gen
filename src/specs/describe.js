import { noop } from 'lodash';
import caller from '../utils/caller';
import execute from './utils/execute';
import context from './context';
import { test } from '../utils/paths';

const INITIAL_CALLER = {
  module: '',
};

const describe = (fn = noop, caller = INITIAL_CALLER, input = {}) => {
  const src = caller.module.replace(test, '').replace('.spec.js', '.js');
  const executable = typeof input === 'function' ? input : () => (
    [
      ...Object.keys(input).map((key) => context(key, input[key], src)),
    ]
  );
  execute(fn, [src, executable]);
};

const Describe = (input) => {
  describe(global.describe, caller(), input);
};

Describe.only = (input) => {
  describe(global.describe.only, caller(), input);
};

export default Describe;
