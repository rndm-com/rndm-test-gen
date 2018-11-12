import path from 'path';
import options from '../options';

export const project = process.cwd();

const tg = '_rtg_';


export const src = path.join(project, 'src');

export const base = path.join(
  project,
  options.directory || path.join('__tests__', 'unit'),
);

export const test = path.join(
  base,
  'src',
);

export const snaps = path.join(
  base,
  tg,
  '_snaps',
);

export const generated = path.join(
  base,
  tg,
  '_tests',
);
