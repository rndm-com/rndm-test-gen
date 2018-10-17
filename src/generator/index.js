import fse from 'fs-extra';
import colors from 'colors';
import { mkDir, readDir } from '@rndm/utils';
import { test, generated, snaps, src } from '../utils/paths';
import * as filter from './filter';
import create from './create';
import { startTracking } from '../snapshots';
import { incrementStat } from '../stats';

import specBuilder from '../builders/specs';
import testBuilder from '../builders/tests';

const logOutput = (output) => {
  Object.keys(output).forEach(key => {
    if (key === 'snaps') {
      console.log(colors.red.bold('  Deleted Snapshots'));
      console.log();
    } else {
      const items = output[key];
      if (items.length > 0) {
        const title = items.length === 1 ? key.substring(0, key.length - 1) : key;
        console.log(colors.green.bold(`  Created ${items.length} ${title}`));
        items.forEach(item => console.log(colors.gray.italic(`    -> ${item}`)));
        console.log();
      }
    }
  });
};

const deleteSnaps = () => (
  fse.removeSync(snaps)
);

const generator = ({ removeSnapshots = false } = {}) => {
  const output = {};
  if (removeSnapshots === true || removeSnapshots === 'all') {
    deleteSnaps();
    output.snaps = true;
  };

  mkDir(snaps);
  [test, generated, snaps].forEach(k => mkDir(k));

  startTracking(removeSnapshots);

  const files = (readDir(src) || []).filter(filter.src).map(item => item.substring(src.length));

  output.specs = create(files, filter.specs, '.spec.js', test, specBuilder);
  output.tests = create(files, filter.tests, '.json', generated, testBuilder);

  incrementStat('testFiles', output.tests.length)
  incrementStat('specFiles', output.specs.length)

  logOutput(output);

  return output;
};

export default generator;
