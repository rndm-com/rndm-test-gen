import { noop, merge, get } from 'lodash';
import execute from './utils/execute';
import describer from './utils/describer';
import stub from './utils/stub';
import stubber from '../stubber';
import getOutput from './utils/getOutput';
import verify from './utils/verify';
import { incrementStat } from '../stats';

const it = (fn = noop, {
  key,
  test: {
    path = 'default',
    spy,
    expected = 'to.matchSnapshot',
    expectation,
    args,
    stubs = {},
    returnDefault,
    stringifyFunctions,
    it,
    description: customDescription,
    identifiers
  } = {},
  contextStubs = {},
  src,
} = {}) => {
  incrementStat('its');
  const customStubs = merge({}, contextStubs, stubs);
  const description = customDescription || describer({ path: [key, path].filter(Boolean).join('.'), expected, expectation, args, stubs: customStubs, stringifyFunctions });

  const executable = it || (() => {
    const importedStubs = stubber(src);
    const fullStubs = merge({}, importedStubs, global.stubs, customStubs);
    const sut = stub({ from: src, stubs: fullStubs, returnDefault });
    const { value, context } = getOutput({ sut: key === 'default' ? sut : sut[key], args, path });
    const output = spy ? get(context, spy, null) : value;
    verify({ src, output, expected, expectation, description, identifiers });
  });

  execute(fn, [description, executable]);
};

const It = (...args) => {
  it(global.it, ...args);
};

It.only = (...args) => {
  global.hasSetOnly = true;
  it(global.it.only, ...args);
};

export default It;
