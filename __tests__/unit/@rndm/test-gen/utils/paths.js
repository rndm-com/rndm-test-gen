import options from '../options';

export const project = process.cwd();

const tg = '_rtg_';

export const src = [
  project,
  'src',
].join('/');

export const base = [
  project,
  options.directory || '__tests__/unit',
].join('/');

export const test = [
  base,
  'src',
].join('/');

export const snaps = [
  base,
  tg,
  '_snaps',
].join('/');

export const generated = [
  base,
  tg,
  '_tests',
].join('/');
