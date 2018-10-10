import { get } from 'lodash';

const getOutput = ({ sut, path = 'default', args } = {}) => {
  const Subject = ((path === 'default' || !path) ? sut : get(sut, path));
  if (Array.isArray(args)) {
    try {
      return new Subject(...args)
    } catch (_) {
      return Subject(...args);
    }
  } else if (typeof args === 'object') {
    const { current, next } = args;
    let sut;

    try {
      sut = new Subject(...current)
    } catch (_) {
      sut = Subject(...current);
    }
    return getOutput({ sut, ...next });
  }
  return Subject;
};

export default getOutput;
