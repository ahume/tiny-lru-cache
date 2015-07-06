#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Simple LRU cache. put and get.


## Install

```sh
$ npm install --save tiny-lru-cache
```


## Usage

```js
var LRUCache = require('tiny-lru-cache');

var maxSize = 100;
var cache = new LRUCache(maxSize);
cache.put('key', 'value');
cache.get('key'); // returns 'value'
```

### LRU Eviction Policy

Once the cache reaches its maximum size, the least recently used (LRU) item is removed.

## Development

```sh
npm install
npm test
```

## License

MIT © [Andy Hume](2015)


[npm-image]: https://badge.fury.io/js/tiny-lru-cache.svg
[npm-url]: https://npmjs.org/package/tiny-lru-cache
[travis-image]: https://travis-ci.org/ahume/tiny-lru-cache.svg?branch=master
[travis-url]: https://travis-ci.org/ahume/tiny-lru-cache
[daviddm-image]: https://david-dm.org/ahume/tiny-lru-cache.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ahume/tiny-lru-cache
