import fs from 'fs';
import colors from 'colors';
import { mkDir, readDir } from '@rndm/utils';
import { snaps } from '../utils/paths';
import * as filter from '../generator/filter';
import { sendStats } from '../stats';

let snapshots = {};
let timeout = null;
let statTimeout = null;

let option;

export const removeRedundant = () => {
  const keys = Object.keys(snapshots);
  if (keys.length > 0 && !global.hasSetOnly) {
    const left = keys.reduce((o, i) => (o + Object.keys(snapshots[i]).length), 0);
    if (option === 'unused') {
      keys.forEach(key => {
        const path = snaps + key;
        const contents = JSON.parse(fs.readFileSync(path).toString());
        const tests = Object.keys(snapshots[key]);
        tests.forEach(test => delete contents[test]);
        if (Object.keys(contents).length === 0) {
          fs.unlinkSync(path);
        } else {
          fs.writeFileSync(path, JSON.stringify(contents, null, 2));
        }
      });
      console.log(colors.green.dim(`${left} unused snapshot${left === 1 ? '' : 's'} deleted\n`));
    } else {
      console.log(colors.red.dim(`You have ${left} unused snapshot${left === 1 ? '' : 's'}. To delete these, add 'unused' to the removeSnapshots option when running generate.\n`));
    }
  }
};

export const startTracking = (removeSnapshots) => {
  option = removeSnapshots;
  snapshots = mkDir(snaps) || (readDir(snaps) || []).filter(filter.tests)
    .map(item => item.substring(snaps.length))
    .reduce((o, i) => ({
      ...o,
      [i]: require(snaps + i),
    }), {});
};

export const trackTestRun = ({ suite = '', key = '' } = {}) => {
  if (timeout) clearTimeout(timeout);
  if (statTimeout) clearTimeout(statTimeout);
  const path = suite.substring(snaps.length);
  const item = snapshots[path];
  statTimeout = setTimeout(sendStats, 500);
  if (!item) return;
  delete item[key];
  if (Object.keys(item).length === 0) delete snapshots[path];
  timeout = setTimeout(removeRedundant, 500);
};
