import { identity } from 'lodash';

export default (fn = identity, args = []) => (
  fn(...args)
);
