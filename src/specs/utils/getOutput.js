import { get } from 'lodash';
import apply from './apply';

const getOutput = ({ sut, path = 'default', args } = {}) => {
  const Subject = ((path === 'default' || !path) ? sut : get(sut, path));
  if (Array.isArray(args)) {
    return apply(Subject, args)
  } else if (typeof args === 'object') {
    const { current, next } = args;
    const sut = apply(Subject, current);
    return getOutput({ sut, ...next });
  }
  return Subject;
};

export default getOutput;
