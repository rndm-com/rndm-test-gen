import getProperties from './getProperties';
import noclass from '../utils/noclass';

const getFunction = (item = noclass) => {
  const statics = Object.getOwnPropertyNames(item);
  return statics.includes('WrappedComponent')
    ? getProperties(item.WrappedComponent)
    : getProperties(item);
};

export default getFunction;
