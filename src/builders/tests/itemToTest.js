import testBuilder from './testBuilder';

const itemToTest = ({ type, args, returnDefault } = {}) => {
  if (['function', 'class'].includes(type)) return testBuilder({ args: typeof args === 'object' ? args : [], returnDefault });
  return testBuilder({ returnDefault });
};
export default itemToTest;
