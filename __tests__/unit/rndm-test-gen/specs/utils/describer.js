import { isEmpty } from 'lodash';
import { decircular } from '@rndm/utils';

export default ({ expected, expectation, args, path, stubs } = {}) => {
  const withArgs = args ? `with ${decircular(args, null)}` : '';
  const withStubs = !isEmpty(stubs) ? `where stubs are ${decircular(stubs, null)}` : '';
  const withExpectation = expectation ? decircular(expectation, null) : '';
  return [
    path,
    withArgs,
    withStubs,
    'is expected',
    expected,
    withExpectation,
  ].filter(Boolean).join(' ').trim();
};
