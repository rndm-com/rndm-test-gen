import { flatten } from 'lodash';
import itemToTest from './itemToTest';
import TYPES from '../../parser/TYPES';

const itemsToTests = ({ statics = {}, prototypes = {}, ...test } = {}, returnDefault) => {
  return (
    flatten([
      itemToTest({ ...test, returnDefault }),
      ...Object.keys(statics).map(key => itemToTest({ key, ...statics[key] }, returnDefault)),
      ...Object.keys(prototypes).map(key => itemToTest({
        ...prototypes[key],
        args: {
          current: test.type === TYPES.REACT_CLASS ? [{}] : [],
          next: {
            path: key,
            args: [TYPES.CLASS, TYPES.FUNCTION].includes(prototypes[key].type) ? [] : undefined,
          },
        },
      }, returnDefault)),
    ])
  );
};

export default itemsToTests;
