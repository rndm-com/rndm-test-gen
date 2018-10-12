import { noop, merge } from 'lodash';
import caller from '../utils/caller';
import execute from './utils/execute';
import context from './context';
import { test } from '../utils/paths';

const INITIAL_CALLER = {
  module: '',
};

const optionsKey = '@options';

const describe = (fn = noop, caller = INITIAL_CALLER, input = {}, fileStubs) => {
  const src = caller.module.replace(test, '').replace('.spec.js', '.js');
  const executable = typeof input === 'function' ? input : () => {
    const { stubs } = input[optionsKey] || {};
    const describeStubs = merge({}, fileStubs, stubs);
    return (
      [
        ...Object.keys(input).filter(k => k !== optionsKey).map((key) => {
          const ctx = input[key];
          const { stubs, only } = ctx[optionsKey] || {};
          const contextStubs = merge({}, describeStubs, stubs);
          const args = [key, ctx, contextStubs, src];
          return only ? context.only(...args) : context(...args)
        }),
      ]
    );
  };
  execute(fn, [src, executable]);
};

const Describe = (input, stubs) => {
  describe(global.describe, caller(), input, stubs);
};

Describe.only = (input, stubs) => {
  describe(global.describe.only, caller(), input, stubs);
};

export default Describe;
