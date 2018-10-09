import fs from 'fs';
import identifyExports from './identifyExports';

const search =
  [...[
    'default',
    'const',
    'function',
    'let',
    'var',
  ].map(key => `(\\b${key}\\b)`),
  '({((.|\\n|)*?)})',
  ].join('|');

const regex = `((export (${search})(.*?)(.*))|(module.exports = (.*?);))`;

const getRegex = (file) => {
  if (typeof file !== 'string' || !fs.existsSync(file)) return {};
  const contents = fs.readFileSync(file).toString();
  const matches = contents.match(new RegExp(regex, 'g'));
  if (!matches) return {};
  return matches.map(match => identifyExports(match, contents)).reduce((o, i) => ({...o, ...i}), {});
};

export default getRegex;
