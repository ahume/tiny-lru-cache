'use strict';
var assert = require('assert');
var LRUCache = require('../');

describe('LRUCache', function () {

    it('should return cached value', function () {
        var cache = new LRUCache(2);
        cache.put('a', '1');
        assert.equal(cache.get('a'), '1');
    });

    it('should not keep more than maxItems', function () {
        var cache = new LRUCache(2);
        cache.put('a', '1');
        cache.put('b', '2');
        cache.put('c', '3');
        assert.equal(cache.get('a'), null);
        assert.equal(cache.get('b'), '2');
        assert.equal(cache.get('c'), '3');
    });

    it('should prune LRU item', function () {
        var cache = new LRUCache(2);
  		cache.put('a', '1');
        cache.put('b', '2');

        // Hit 'a' to make it MRU and remain in cache after 'c' added.
        cache.get('a');
        cache.put('c', '3');
        assert.equal(cache.get('a'), '1');
        assert.equal(cache.get('b'), null);
        assert.equal(cache.get('c'), '3');

        // Hit 'a' to make it MRU and remain in cache after 'd' added.
        cache.get('a');
        cache.put('d', '4');
        assert.equal(cache.get('a'), '1');
        assert.equal(cache.get('b'), null);
        assert.equal(cache.get('c'), null);
        assert.equal(cache.get('d'), '4');
    });

    it('should empty cache on clear', function () {
        var cache = new LRUCache(2);
        cache.put('a', '1');
        cache.put('b', '2');
        cache.flush();
        assert.equal(cache.get('a'), null);
        assert.equal(cache.get('b'), null);
    });

    it('should be re-usable after flush', function () {
        var cache = new LRUCache(2);
        cache.put('a', '1');
        cache.put('b', '2');
        cache.flush();
        cache.put('a', '1');
        cache.put('b', '2');
        assert.equal(cache.get('a'), '1');
        assert.equal(cache.get('b'), '2');
    });
});
