# @roarr/middleware-serialize-error

[![Travis build status](http://img.shields.io/travis/gajus/roarr-middleware-serialize-error/master.svg?style=flat-square)](https://travis-ci.org/gajus/roarr-middleware-serialize-error)
[![Coveralls](https://img.shields.io/coveralls/gajus/roarr-middleware-serialize-error.svg?style=flat-square)](https://coveralls.io/github/gajus/roarr-middleware-serialize-error)
[![NPM version](http://img.shields.io/npm/v/@roarr/middleware-serialize-error.svg?style=flat-square)](https://www.npmjs.com/package/@roarr/middleware-serialize-error)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Serializes error objects in the [Roarr](https://github.com/gajus/roarr) message context.

## Behaviour

The current implementation maps only the direct context properties.

Raise an issue if you have a use case that requires deep property mapping.

## Usage

```js
import log from 'roarr';
import createSerializeErrorMiddleware from '@roarr/middleware-serialize-error';

const childLog = log
  .child({name: 'foo'})
  .child(createSerializeErrorMiddleware());

const error = new Error('foo');

log.debug({error}, 'bar');
childLog.debug({error}, 'bar');

// {"context":{"logLevel":20,"error":{}},"message":"bar","sequence":0,"time":1531918373676,"version":"1.0.0"}
// {"context":{"logLevel":20,"error":{"name":"Error","message":"foo","stack":"[REDACTED]"}},"message":"bar","sequence":1,"time":1531918373678,"version":"1.0.0"}

```
