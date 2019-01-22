import { isEmpty } from 'lodash';
import { decircular } from '@rndm/utils';

export default ({ expected, expectation, args, path, stubs, stringifyFunctions } = {}) => {
  const withArgs = args ? `with ${decircular(args, null, { stringifyFunctions })}` : '';
  const withStubs = !isEmpty(stubs) ? `where stubs are ${decircular(stubs, null, { stringifyFunctions })}` : '';
  const withExpectation = expectation ? decircular(expectation, null, { stringifyFunctions }) : '';
  return [
    path,
    withArgs,
    withStubs,
    'is expected',
    expected,
    withExpectation,
  ].filter(Boolean).join(' ').trim();
};
