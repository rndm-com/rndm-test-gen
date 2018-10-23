import fs from 'fs';

const getPackage = () => {
  const path = `${process.cwd()}/package.json`;
  if (!fs.existsSync(path)) return {};
  const { rtg = {} } = require(path);
  return rtg;
};

export default getPackage;
