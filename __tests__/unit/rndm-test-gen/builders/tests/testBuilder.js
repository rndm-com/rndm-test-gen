const testBuilder = ({ args, stubs, stubType, key, returnDefault } = {}) => {
  const output = {};
  if (args) output.args = args;
  if (stubs) output.stubs = stubs;
  if (stubType) output.stubType = stubType;
  if (key) output.key = key;
  if (!returnDefault) output.returnDefault = returnDefault;
  return output;
};

export default testBuilder;
