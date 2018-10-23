import { flatten } from 'lodash';
import itemToTest from './itemToTest';

const itemsToTests = ({ statics = {}, prototypes = {}, ...test } = {}, returnDefault) => {
  return (
    flatten([
      itemToTest({ ...test, returnDefault }),
      ...Object.keys(statics).map(key => itemsToTests({ key, ...statics[key] }, returnDefault)),
      ...Object.keys(prototypes).map(key => itemsToTests({
        ...prototypes[key],
        args: {
          current: [],
          next: {
            path: key,
            args: ['class', 'function'].includes(prototypes[key].type) ? [] : undefined,
          },
        },
      }, returnDefault)),
    ])
  );
};

export default itemsToTests;
