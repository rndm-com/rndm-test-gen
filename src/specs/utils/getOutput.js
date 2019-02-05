import { get } from 'lodash';
import apply from './apply';
import setStubs from './setStubs';

const getOutput = ({ sut, path = 'default', args } = {}) => {
  const Subject = ((path === 'default' || !path) ? sut : get(sut, path));
  if (Array.isArray(args)) {
    const context = get(sut, 'this');
    return {
      value: apply(Subject, args, context),
      context,
    };
  } else if (typeof args === 'object') {
    const { current, next, stubs } = args;
    const sut = apply(Subject, current);
    const context = get(sut, 'this');
    if (sut && !context) sut.this = sut;
    setStubs(sut, stubs);
    return getOutput({ sut, ...next });
  }
  return { value: Subject };
};

export default getOutput;
