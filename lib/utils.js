// generally useful utilities

/* beautify preserve:start */

const assert      = require('assert');
const _           = require('lodash');
const dateformat  = require('dateformat');
const stringify   = require('json-stringify-safe');

const util        = _.pick(require('util'), [ 
  // only non-deprecated functions
  'debuglog', 'format', 'inherits', 'inspect'
]);

_.mixin({
  // returns true if s is a non-empty string
  isNonEmptyString:   (s) => _.isString(s) && !_.isEmpty(s),
  // returns true if s is a non-empty array
  isNonEmptyArray:    (s) => _.isArray(s) && !_.isEmpty(s),
  // returns true if s is a non-empty object
  isNonEmptyObject:    (s) => !_.isArray(obj) && _.isObject(s) && !_.isEmpty(s),
  // sets properties on target from props - usage: _.setProps(this,{a:1}))
  setProps: (target,props) => {
    assert(_.isObject(target),'setProps requires a target:Object');
    assert(_.isPlainObject(props),'setProps requires a props:Object');
    _.keys(props).forEach(k => {
      delete target[k];
      const alias = '_'+k;
      target[alias] = props[k];
      Object.defineProperty(target, k, {
        get: () => target[alias],
        set: val => target[alias]=val
      });
    });
    return target;
  }
});

module.exports = _.merge( util, require('child_process'), {
  assert:             assert,
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

  defineCustomError:  require('./errors'),
  debug:              require('./debugging'),
  unload:             require('./modules')

});
/* beautify ignore:end */

// EOF