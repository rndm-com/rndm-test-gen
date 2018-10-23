const testBuilder = ({ args, stubs, key, returnDefault } = {}) => {
  const output = {};
  if (args) output.args = args;
  if (stubs) output.stubs = stubs;
  if (key) output.key = key;
  if (!returnDefault) output.returnDefault = returnDefault;
  return output;
};

export default testBuilder;
