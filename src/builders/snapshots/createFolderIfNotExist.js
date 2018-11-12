import fs from 'fs';
import Path from 'path';
import { test, snaps } from '../../utils/paths';
import { mkDir } from '@rndm/utils';
import createFileIfNotExist from './createFileIfNotExist';

const createFolderIfNotExist = (src = '', input) => {
  const comps = src.replace(test, '').substring(1).split(Path.sep);
  const file = comps.pop();
  const snapsPath = [snaps, ...comps].join(Path.sep);
  if (!fs.existsSync(snapsPath)) mkDir(snapsPath);
  return createFileIfNotExist(snapsPath, file, input);
};

export default createFolderIfNotExist;
