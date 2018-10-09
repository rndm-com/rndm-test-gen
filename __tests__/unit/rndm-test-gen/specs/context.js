import { noop } from 'lodash';
import it from './it';
import execute from './utils/execute';

const context = (fn = noop, key = '', input = [], src) => {
  const executable = typeof input === 'function' ? input : () => (
    [
      ...input.map((test, index) => (test.only ? it.only({ key, test, src }, index + 1) : it({ key, test, src }, index + 1))),
    ]
  );
  execute(fn, [key, executable]);
};

const Context = (...args) => {
  context(global.context, ...args);
};

Context.only = (...args) => {
  context(global.context.only, ...args);
};

export default Context;
