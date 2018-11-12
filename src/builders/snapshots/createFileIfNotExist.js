import fs from 'fs';
import Path from 'path';
import colors from 'colors';
import { decircular } from '@rndm/utils';
import safe from '../../utils/safe';
import { trackTestRun } from '../../snapshots';
import { incrementStat } from '../../stats';

export const createFile = ({ data, filePath, key, value } = {}) => {
  if (!filePath) return;
  if (!data) {
    incrementStat('snapshotFile');
    console.log(colors.green(`      Creating Snapshot at: ${filePath}`));
  }
  const json = createNewSnapshot({ data, key, value });
  fs.writeFileSync(filePath, json);
  return safe({ value });
};

export const createNewSnapshot = ({ data = {}, key, value } = {}) => {
  if (!key) return data;
  console.log(colors.green.dim(`      New snapshot for '${key}'`));
  incrementStat('snapshots');
  return decircular({
    ...data,
    [key]: { value },
  }, 2);
};

const createFileIfNotExist = (path, file, input) => {
  if (!path || !file || !input) return {};
  const filePath = [path, file.replace('.js', '.json')].join(Path.sep);
  const { key, value } = input;

  trackTestRun({ suite: filePath, key });

  if (!fs.existsSync(filePath)) return createFile({ filePath, key, value });
  const data = JSON.parse(fs.readFileSync(filePath));
  const current = data[key];
  return current ? current : createFile({ data, filePath, key, value });
};

export default createFileIfNotExist;
