import { get, identity } from 'lodash';
import { decircular } from '@rndm/utils';
import { expect } from '../../index';
import snapshots from '../../builders/snapshots';

const verify = ({ src, output, expected = 'to.matchSnapshot', expectation, description } = {}) => {
  const comps = expected.split('.');
  const last = comps.pop();
  if (last === 'matchSnapshot') {
    const snap = (snapshots(src, { key: description, value: output }) || {});
    const string = decircular({ value: output });
    const parsed = JSON.parse(string);
    return get(expect(parsed), comps.join('.'), { eql: identity }).eql(snap);
  }
  return get(expect(output), comps.join('.'))[last](expectation);
};

export default verify;
