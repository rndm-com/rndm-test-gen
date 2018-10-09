import { isString } from 'lodash';
import StubbedComponent from './StubbedComponent';

const getArgs = (...args) => {
  let displayName;
  if (isString(args[0])) {
    displayName = args.shift();
  }
  const props = args.shift();
  return [displayName, props, ...args];
};

export default (...args) => {
  const [displayName, props = {}] = getArgs(...args);
  return StubbedComponent({
    displayName: {
      value: displayName,
      type: 'STATIC',
    },
    name: {
      value: displayName,
      type: 'DEFINED',
    },
    ...props,
  });
};
