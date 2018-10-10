import fs from 'fs';
import colors from 'colors';
import { decircular } from '@rndm/utils';
import safe from '../../utils/safe';
import { trackTestRun } from '../../snapshots';

export const createFile = ({ data, filePath, key, value } = {}) => {
  if (!filePath) return;
  if (!data) console.log(colors.green(`      Creating Snapshot at: ${filePath}`));
  const json = createNewSnapshot({ data, key, value });
  fs.writeFileSync(filePath, json);
  return safe({ value });
};

export const createNewSnapshot = ({ data = {}, key, value } = {}) => {
  if (!key) return data;
  console.log(colors.green.dim(`      New snapshot for '${key}'`));
  return decircular({
    ...data,
    [key]: value,
  }, 2);
};

const createFileIfNotExist = (path, file, input) => {
  if (!path || !file || !input) return {};
  const filePath = [path, file.replace('.js', '.json')].join('/');
  const { key, value } = input;

  trackTestRun({ suite: filePath, key });

  if (!fs.existsSync(filePath)) return createFile({ filePath, key, value });
  const data = JSON.parse(fs.readFileSync(filePath));
  const current = data[key];
  return current ? { value: current } : createFile({ data, filePath, key, value });
};

export default createFileIfNotExist;
