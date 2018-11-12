import Path from 'path';

const getRelative = (path = '', key = '') => Path.join(Path.parse(path).dir, key);

export default getRelative;
