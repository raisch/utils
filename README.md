# utils

Generally useful utilities I tend to use in most of my projects.

This module is a drop-in replacement for node's `util` module as it includes all of its functions plus several pre-required modules, and a few generally useful custom functions.

## Provides

Preloaded standard node modules:

- assert
- buffer
- events
- EventEmitter (alias,shortcut)
- fs
- path
- stream
- url

*Note: There is no overhead loading node's intrinsic modules, so why not?*

Pre-required modules:

- [dateformat](https://www.npmjs.com/package/dateformat)
- [lodash](https://www.npmjs.com/package/lodash)
- [stringify](https://www.npmjs.com/package/json-stringify-safe)

Custom functions (see below):

- defineCustomError
- debug
- unload

As well as these functions from node's standard `util` module:

- debuglog
- format
- inherits
- inspect

### Lodash

Lodash is extended with: 

- isNonEmptyString(obj)
    - shorthand for `_.isString(obj) && !_.isEmpty(obj)`

- isNonEmptyArray(obj)  
    - shorthand for `_.isArray(obj) && !_.isEmpty(obj)`

- isNonEmptyObject(obj)
    - shorthand for `_.isPlainObject(obj) && !_.isEmpty(obj)`

- setProps(target,props) - sets properties from props on target, as in:
    - for each key in props
        + delete target[key]
        + target['_'+key] = props[key]
        + adds new 'key' getter and setter to target

For example:

```
class Foo {
    constructor(opts) {
        _.setProps(this,opts)
    }
}

let f = new Foo({a:1,isFoo:true});

f.a     // returns 1
f.a=32
f.a     // returns 32

stringify(f) // returns {_a:32}
```

### Custom Functions

- `defineCustomError(name, fmt=defineCustomError.FORMAT)` - creates custom error classes.
    - `defineCustomError.FORMAT`

- `debug(...args)` - simple debugging output
    - `debug.DEBUGGING`
    - `debug.DATEMASK`

- `unload(path)` - allows required modules to be reloaded.

