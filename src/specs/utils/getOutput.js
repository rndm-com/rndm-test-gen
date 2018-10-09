import { get } from 'lodash';

const getOutput = ({ sut, path = 'default', args, stubType } = {}) => {
  const Subject = ((path === 'default' || !path) ? sut : get(sut, path));
  if (Array.isArray(args)) {
    return stubType === 'CLASS' ? new Subject(...args) : Subject(...args);
  } else if (typeof args === 'object') {
    const { current, next } = args;
    return getOutput({ sut: stubType === 'CLASS' ? new Subject(...current) : Subject(...current), ...next });
  }
  return Subject;
};

export default getOutput;
