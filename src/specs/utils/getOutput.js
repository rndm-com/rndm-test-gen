import { get } from 'lodash';
import apply from './apply';
import setStubs from './setStubs';

const getOutput = ({ sut, path = 'default', args } = {}) => {
  const Subject = ((path === 'default' || !path) ? sut : get(sut, path));
  if (Array.isArray(args)) {
    return apply(Subject, args)
  } else if (typeof args === 'object') {
    const sut = apply(Subject, current);
    const { current, next, stubs } = args;
    setStubs(sut, stubs);
    return getOutput({ sut, ...next });
  }
  return Subject;
};

export default getOutput;
