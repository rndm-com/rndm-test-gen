import { range } from 'lodash';
import importTestGen from '../tests/importTestGen';
import options from '../../options';
import { base, generated } from '../../utils/paths';

const getTemplate = (path = '') => {
  const { relative } = (options || {});
  const level = path.split('/').length - 1;
  const start = importTestGen(relative ? level : undefined);
  const diff = generated.substring(base.length);
  const middle = `import generated from '${range(level).map(() => '../').join('')}${diff.substring(1)}${path.replace('.spec.js', '.json')}';`;
  const end = 'const tests = generated;\ndescribe(tests);\n';
  return [start, middle, end].join('\n');
};

export default getTemplate;
