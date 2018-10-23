const getArgs = (item = () => {}) => {
  const input = item.toString();
  const [first] = input.match(new RegExp('\\((.*?)\\)'));
  return first.replace(' ', '') === '()' ? 0 : first.split(',').length;
};

export default getArgs;
