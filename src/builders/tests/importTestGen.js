import { range } from 'lodash';

const importTestGen = (level = 0) => `import { describe } from '${range(level).map(() => '../').join('')}@rndm/test-gen';`;
export default importTestGen;
