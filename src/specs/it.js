import { noop, merge } from 'lodash';
import execute from './utils/execute';
import describer from './utils/describer';
import stub from './utils/stub';
import stubber from '../stubber';
import getOutput from './utils/getOutput';
import verify from './utils/verify';

const it = (fn = noop, {
  key,
  test: {
    path = 'default',
    expected = 'to.matchSnapshot',
    expectation,
    args,
    stubs = {},
    returnDefault,
    it,
    description: customDescription,
  } = {},
  contextStubs = {},
  src,
} = {}) => {
  const customStubs = merge({}, contextStubs, stubs);
  const description = customDescription || describer({ path: [key, path].filter(Boolean).join('.'), expected, expectation, args, stubs: customStubs });

  const executable = it || (() => {
    const importedStubs = stubber(src);
    const fullStubs = merge({}, importedStubs, global.stubs, customStubs);
    const sut = stub({ from: src, stubs: fullStubs, returnDefault });
    const output = getOutput({ sut: key === 'default' ? sut : sut[key], args, path });
    verify({ src, output, expected, expectation, description });
  });

  execute(fn, [description, executable]);
};

const It = (...args) => {
  it(global.it, ...args);
};

It.only = (...args) => {
  it(global.it.only, ...args);
};

export default It;
