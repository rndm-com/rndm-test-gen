import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import proxyquire from 'proxyquire';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import describe from './specs/describe';
import context from './specs/context';
import it from './specs/it';
import generate from './generator';

// const util = require('util');
// console.log.full = input => console.log(util.inspect(input, false, null));

configure({ adapter: new Adapter() });

chai.use(sinonChai);
chai.use(chaiAsPromised);

global.window = {};

const { expect } = chai;

export {
  generate,
  describe,
  context,
  it,
  expect,
  proxyquire,
};
