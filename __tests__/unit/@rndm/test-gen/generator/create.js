import fs from 'fs';
import Path from 'path';
import { identity } from 'lodash';
import { mkDir, readDir } from '@rndm/utils';

const create = (files = [], filter = identity, replacer = '', directory = '', builder = identity) => {
  const comparisons = (readDir(directory) || [])
    .filter(filter)
    .map(files => files.substring(directory.length).replace(replacer, ''));

  const failed = files.map(file => file.replace('.js', ''))
    .filter(test => !comparisons.includes(test));

  return failed.map(file => {
    const contents = builder(file);
    const path = file.split(Path.sep).reverse().slice(1).reverse().join(Path.sep);
    mkDir(path, directory);
    fs.writeFileSync(`${directory}${file}${replacer}`, contents);
    return file;
  });
};

export default create;
