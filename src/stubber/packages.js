import { merge, flatten } from 'lodash';
import defaultStubs from '../mocks';
import generateStub from './generateStub';
import getMapped from './getMapped';
import imports from './imports';
import options from '../options';

const packages = (contents = '', path) => {
  const quotations = '\\\'';
  const post = `${quotations}((.|\\n)*)${quotations};`;
  const pre = 'import ';
  const mid = 'from ';
  const regex = `${pre}((.|\\n)*)${mid}${post}`;
  const matches = contents.match(new RegExp(regex, 'g')) || [];
  const { map = [], callthroughs = [] } = options;
  const callthrough = callthroughs.find(item => path.includes(item)) ? { '@noCallThru': true } : {};
  const mapped = matches.map(match => match.split('\n').join('').split(';').map(i => {
    const k = i.split(' from ')[1];
    if (!k) return;
    const key = k.replace(new RegExp(quotations, 'g'), '').trim();
    const remap = map.find(({ find }) => key.endsWith(find));
    if (remap) return { [key]: getMapped(remap) };
    const toStub = imports(path, key);
    if (!toStub) return {};
    const stubs = Object.keys(toStub).reduce((o, i) => ({ ...o, [i]: generateStub(toStub[i], i === 'default' ? 'Other' : i) }), {});
    return { [key]: { ...stubs, ...callthrough } };
  })
    .filter(Boolean));

  const flattened = flatten(mapped);
  return merge({}, ...flattened, defaultStubs);
};

export default packages;
