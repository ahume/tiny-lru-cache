/**
  * LRU cache implementation
  * Items cached in object hash, recency managed by doubly-linked list.
  */


function LRUCache(maxSize) {
	this._setup();
	this.maxSize = maxSize;
}

LRUCache.prototype = {

	put: function (key, value) {

		var spareNode;
		var existingNode = this.cache[key];

		// If this is a new key, check the cache size and prune if neccessary.
		if (!existingNode && this.cacheSize >= this.maxSize) {
			spareNode = this._removeFromRecencyList(this.tail);
			delete this.cache[spareNode.key];
		}

		// If there is an existing node for this key, remove it.
		if (existingNode) {
			spareNode = this._removeFromRecencyList(existingNode);
		}

		// Get new node, optional re-using any that were removed above.
		var newNode = this._makeCacheNode({
			key: key,
			value: value
		}, spareNode);

		this._addToRecencyListHead(newNode);
		this.cache[key] = newNode;
	},

	get: function (key) {
		var node = this.cache[key];
		if (!node) {
			return null;
		}

		this._removeFromRecencyList(node);
		this._addToRecencyListHead(node);
		return node.value;
	},

	flush: function () {
		this._setup();
	},

	_setup: function () {
		this.cache = Object.create(null);
		this.head = null;
		this.tail = null;
		this.cacheSize = 0; // Because we can't query cache size in O(1)
	},

	_removeFromRecencyList: function (node) {
		var previous = node.previous;
		var next = node.next;

		// Pull the node out of the list. previous -> next, next -> previous.
		// If any is missing it must be head or tail node.
		if (previous) {
			previous.next = next;
		} else {
			this.head = next;
		}
		if (next) {
			next.previous = previous;
		} else {
			this.tail = previous;
		}

		this.cacheSize = this.cacheSize - 1;

		// Return this so it can be re-used.
		node.previous = null;
		node.next = null;
		return node;
	},

	_addToRecencyListHead: function (node) {
		node.next = this.head;
		node.previous = null;

		// If there is a head already it's now going to have a previous.
		if (this.head) {
			this.head.previous = node;
		} else {
			// If there's no head, there's no tail either.
			this.tail = node;
		}

		// This node becomes head
		this.head = node;
		this.cacheSize = this.cacheSize + 1;
	},

	_makeCacheNode: function (opts, spareNode) {
		var newNode = spareNode || {};
		newNode.key = opts.key;
		newNode.value = opts.value;
		return newNode;
	}
};

module.exports = LRUCache;