// generally useful utilities
// 

const dateformat = require('dateformat');
const stringify = require('json-stringify-safe');
const _ = require('lodash');

const util = _.pick(require('util'),['debuglog','format','inherits','inspect']);

/* beautify preserve:start */
_.mixin({
  // returns true if s is a non-empty string
  isNonEmptyString:   (s) => _.isString(s) && !_.isEmpty(s),
  // returns true if s is a non-empty array
  isNonEmptyArray:    (s) => _.isArray(s) && !_.isEmpty(s),
  // returns true if s is a non-empty object
  isNonEmptyObject:    (s) => !_.isArray(obj) && _.isObject(s) && !_.isEmpty(s),
});
/* beautify preserve:end */

// =========== DEBUGGING ================
const debug = (...args) => {
  if (debug.DEBUGGING) {
    let now = new Date();
    console.log('%s DEBUG: %s', dateformat(now, debug.DATEMASK), util.format.apply(null, args));
  }
};
debug.DEBUGGING = false;
debug.DATEMASK = 'hhMMss.l';

// =========== ERRORS ================
/**
 * Default Error Message Format.
 * @type {String}
 */
const DEFAULT_FMT = '${msg}\\n\\t${stack}';
/**
 * Creates a custom Error class.
 * @param  {String} name
 * @param  {String} [fmt=DEFAULT_FMT]
 * @return {Error}
 */
var defineCustomError = (name, fmt = DEFAULT_FMT) => {
  /**
   * Error Message Templating Function.
   * @type {Function}
   */
  const tmpl = _.template(fmt);
  /**
   * Result of 
   * @type {Object}
   */
  let result = {};
  /**
   * Custom Error
   * @param {String} msg  
   * @param {Object} [opts={}]
   * @param {Error} [err=null] - calling error
   */
  const E = result[name] = function(msg = '', opts = {}, err = null) {
    this.msg = msg;
    this.opts = opts;
    this.err = err instanceof Error ? err : new Error();
    this.full_stack = this.err.stack;
    this.stack = this.err.stack.split(/\n/)[2].replace(/^\s+/, '');
    this.message = tmpl(this);
  };
  E.prototype = Object.create(Error.prototype);
  E.prototype.name = name;
  E.prototype.message = 'An error occurred.';
  E.prototype.constructor = E;
  return E;
};

defineCustomError.FORMAT = DEFAULT_FMT;

// =========== MODULES ================
const unload = (name) => { // forget required modules
  let RE = new RegExp(name.replace(/^\.\//, ''));
  let mod = _.keys(require.cache).filter(k => k.match(RE));
  if (mod) {
    delete require.cache[mod];
    return true;
  }
  return false;
};

const child_process = require('child_process');


/* beautify preserve:start */
module.exports = _.merge({},
  {
    assert:             require('assert'),
    buffer:             require('buffer'),
    events:             require('events'),
    EventEmitter:       require('events').EventEmitter,
    fs:                 require('fs'),
    path:               require('path'),
    stream:             require('stream'),
    url:                require('url'),

    dateformat:         dateformat,
    lodash:             _,
    stringify:          stringify,

    defineCustomError:  defineCustomError,
    debug:              debug,
    unload:             unload

  },
  child_process,
  util
);
/* beautify ignore:end */

// EOF