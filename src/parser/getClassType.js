import TYPES from './TYPES';

const getClassType = (match = '') => match.includes('extends') && match.includes('Component') ? TYPES.REACT_CLASS : TYPES.CLASS;
export default getClassType;
