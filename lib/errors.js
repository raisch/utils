const _ = require('lodash');

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

module.exports = defineCustomError;