import testBuilder from './testBuilder';

const itemToTest = ({ type, args, stubType, returnDefault } = {}) => {
  if (type === 'class') return testBuilder({ args: typeof args === 'object' ? args : [], stubType: 'CLASS', returnDefault });
  if (type === 'function') return testBuilder({ args: typeof args === 'object' ? args : [], stubType, returnDefault });
  return testBuilder({ stubType, returnDefault });
};
export default itemToTest;
