const util=require('util');
const dateformat = require('dateformat');

// simple debugging output

const debug = module.exports = (...args) => {
  if (debug.DEBUGGING) {
    let now = new Date();
    console.log('%s DEBUG: %s', dateformat(now, debug.DATEMASK), util.format.apply(null, args));
  }
};
debug.DEBUGGING = false;
debug.DATEMASK = 'hhMMss.l';