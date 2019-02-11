import { set } from 'lodash';

const setStubs = (object, stubs) => {
  if (typeof stubs === 'object') {
    Object.keys(stubs).forEach(key => {
      set(object, key, stubs[key]);
    })
  }
  return object;
};

export default setStubs;
