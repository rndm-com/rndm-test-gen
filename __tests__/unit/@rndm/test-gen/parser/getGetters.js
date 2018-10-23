import TYPES from './TYPES';

const getGetters = (match = '', contents = '') => {
  let objects = null;
  try {
    const objectRegex = `${match.replace('(', '\\(').replace(')', '\\)')}(((.|\\n|)*)})`;
    objects = contents.match(new RegExp(objectRegex, 'g'));
  } catch (_) {
    try {
      const executableRegex = `${match.replace('(', '\\(').replace(')', '\\)')}\\(((.|\\n|)*))\\)`;
      objects = contents.match(new RegExp(executableRegex, 'g'));
    } catch (_) {
      objects = null;
    }
  }
  if (objects) {
    const [object] = objects;
    const getterRegex = 'get (.*?)\\(';
    const getters = object.match(new RegExp(getterRegex, 'g'));
    if (getters) return getters.map(item => item.replace('get ', '').replace('(', '')).reduce((o, i) => ({ ...o, [i]: { type: TYPES.CLASS } }), {});
  }
};

export default getGetters;
