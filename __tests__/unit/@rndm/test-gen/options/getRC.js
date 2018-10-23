import fs from 'fs';

const getRC = () => {
  const path = `${process.cwd()}/.rtgrc.json`;
  return fs.existsSync(path) ? require(path) : {};
};

export default getRC;
