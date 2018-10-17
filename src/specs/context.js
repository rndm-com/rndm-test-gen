import { noop, merge } from 'lodash';
import it from './it';
import execute from './utils/execute';
import { incrementStat } from '../stats';

const context = (fn = noop, key = '', input = [], contextStubs, src) => {
  incrementStat('contexts');
  const executable = typeof input === 'function' ? input : () => {
    const tests = input.tests || input;
    return (
      [
        ...tests.map((test, index) => (test.only ? it.only({ key, test, src, contextStubs }, index + 1) : it({ key, test, src, contextStubs }, index + 1))),
      ]
    );
  };
  execute(fn, [key, executable]);
};

const Context = (...args) => {
  context(global.context, ...args);
};

Context.only = (...args) => {
  context(global.context.only, ...args);
};

export default Context;
