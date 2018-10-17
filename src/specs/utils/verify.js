import { get, identity } from 'lodash';
import { decircular } from '@rndm/utils';
import { expect } from '../../index';
import snapshots from '../../builders/snapshots';
import { incrementStat } from '../../stats';

const verify = ({ src, output, expected = 'to.matchSnapshot', expectation, description } = {}) => {
  incrementStat('verifications');
  const comps = expected.split('.');
  const last = comps.pop();
  if (last === 'matchSnapshot') {
    const snap = (snapshots(src, { key: description, value: output }) || {});
    const string = decircular({ value: output });
    const parsed = JSON.parse(string);
    get(expect(parsed), comps.join('.'), { eql: identity }).eql(snap);
  } else {
    get(expect(output), comps.join('.'))[last](expectation);
  }
  incrementStat('successes');
};

export default verify;
