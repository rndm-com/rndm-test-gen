import fs from 'fs';
import fse from 'fs-extra';
import json from '../../../package.json';

const dogfood = ({ reset } = {}) => {
  const { name } = json;
  const project = process.cwd();
  const testPath = `${project}/__tests__/unit/${name}`;
  if (reset && fs.existsSync(testPath)) fse.removeSync(testPath);
  fse.copySync(`${project}/src`, testPath);
  return name;
};

export default dogfood;
