import './polyfill';
import dogfood from './dogfood';
const name = dogfood();
const generator = require(`../${name}`);
generator.generate({ removeSnapshots: 'unused' });
