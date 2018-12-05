import testBuilder from './testBuilder';
import { incrementStat } from '../../stats';

const itemToTest = ({ type, args, returnDefault } = {}) => {
  incrementStat('tests');
  if (['function', 'class', 'other'].includes(type)) return testBuilder({ args: typeof args === 'object' ? args : [], returnDefault });
  return testBuilder({ returnDefault });
};
export default itemToTest;
