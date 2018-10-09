import { decircular } from '@rndm/utils';

const safe = (value = {}) => (
  JSON.parse(decircular(value))
);

export default safe;
