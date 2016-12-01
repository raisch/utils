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

### Custom Functions

`defineCustomError(name, fmt=defineCustomError.FORMAT)`
`defineCustomError.FORMAT`

`debug(...args)`
`debug.DEBUGGING`
`debug.DATEMASK`

`unload(path)`

