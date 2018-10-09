import reduce from '../utils/reduce';
import map from './map';

const mapReduce = (item = {}) => (
  Object.keys(item).map(key => map(key, item)).reduce(reduce, {})
);

export default mapReduce;
