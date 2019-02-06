import testBuilder from './testBuilder';
import { incrementStat } from '../../stats';
import TYPES from '../../parser/TYPES';

const itemToTest = ({ type, args, returnDefault } = {}) => {
  incrementStat('tests');
  if ([TYPES.FUNCTION, TYPES.CLASS, TYPES.REACT_CLASS, TYPES.STATIC].includes(type)) return testBuilder({ args: typeof args === 'object' ? args : [type === TYPES.REACT_CLASS ? {} : undefined], returnDefault });
  return testBuilder({ returnDefault });
};
export default itemToTest;
