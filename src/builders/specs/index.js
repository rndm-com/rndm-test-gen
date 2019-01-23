import Path from 'path';
import { range } from 'lodash';
import importTestGen from '../tests/importTestGen';
import options from '../../options';
import { base, generated } from '../../utils/paths';

const getTemplate = (path = '') => {
  const { relative } = (options || {});
  const level = path.split(Path.sep).length - 1;
  const start = importTestGen(relative ? level : undefined);
  const diff = generated.substring(base.length);
  const testFile = `${range(level).map(() => `..${Path.sep}`).join('')}${diff.substring(1)}${path.replace('.spec.js', '')}.json`
  const snapFile = testFile.replace('/_tests/', '/_snaps/')
  const middle = `import generated from '${testFile}';
// Comment out line below to for CTR+Click access to snapshot file
// import '${snapFile}';
`;
  const end = 'const tests = generated;\ndescribe(tests);\n';
  return [start, middle, end].join('\n');
};

export default getTemplate;
