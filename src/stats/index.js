import si from 'systeminformation';
import request from 'request';
import fs from 'fs';
import uuid from 'uuid/v4';
import colors from 'colors';
import options from '../options';

const stats = {};

const getID = () => {
  const dir = `${process.cwd()}/node_modules/@rndm/test-gen/src/stats/platform.json`;
  if (!fs.existsSync(dir)) {
    const id = uuid();
    fs.writeFile(dir, JSON.stringify({id}));
    return id
  }
  const { id } = require(dir);
  return id;
};

const getVersion = () => {
  const { version } = require(`${process.cwd()}/node_modules/@rndm/test-gen/package.json`);
  return version;
};

const send = (path, body, method = 'PATCH') => {
  const id = getID();
  const rtgVersion = getVersion();
  const node = process.version;
  request({
    method,
    url: `https://rndm-com.firebaseio.com/stats/rndm-test-gen/stats/${path}/${id}.json`,
    body: JSON.stringify({ ...body, node, rtgVersion }),
  }, () =>{});
};

const incrementStat = (key, increment = 1) => {
  const value = stats[key] || 0;
  if (increment > 0) stats[key] = value + increment;
};

const sendPlatform = () => {
  si.osInfo(data => send('platform', data))
};

const sendStats = () => {
  if (options.sendStats) {
    console.log(colors.green.bold('  Sending Stats (Thank you! 🙌 )'));
    sendPlatform();
    if (Object.keys(stats).length > 0) send('usage', stats, 'POST')
  }
};

export {
  incrementStat,
  sendStats,
  stats,
};
