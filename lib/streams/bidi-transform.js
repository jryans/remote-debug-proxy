'use strict';

let stream = require('stream');
let ObservableTransform = require('./observable-transform');

function BidiTransform(options) {
  this._externalToInternal = new ObservableTransform();
  this._internalToExternal = new ObservableTransform();

  this._externalToInternal.transform = this.externalToInternal.bind(this);
  this._internalToExternal.transform = this.internalToExternal.bind(this);

  if (options && options.external) {
    this.externalState = options.external;
  }
  if (options && options.internal) {
    this.internalState = options.internal;
  }
}

BidiTransform.prototype = {

  get to() {
    return {
      external: this._internalToExternal,
      internal: this._externalToInternal
    };
  },

  get from() {
    return {
      external: this._externalToInternal,
      internal: this._internalToExternal
    };
  },

  set externalState(options) {
    for (let option in options) {
      this._externalToInternal._writableState[option] = options[option];
      this._internalToExternal._readableState[option] = options[option];
    }
  },

  set internalState(options) {
    for (let option in options) {
      this._externalToInternal._readableState[option] = options[option];
      this._internalToExternal._writableState[option] = options[option];
    }
  },

  get observe() {
    if (!this._edgeObserver) {
      this._edgeObserver = new EdgeObserver(this);
    }
    return this._edgeObserver;
  }

};

module.exports = BidiTransform;

function EdgeObserver(bidi) {
  this._bidi = bidi;
}

EdgeObserver.prototype = {

  external: function(cb) {
    this._bidi.from.external.on('write', wrap('from', cb));
    this._bidi.to.external.on('data', wrap('to', cb));
  },

  internal: function(cb) {
    this._bidi.from.internal.on('write', wrap('to', cb));
    this._bidi.to.internal.on('data', wrap('from', cb));
  }

};

function wrap(direction, cb) {
  return function(data) {
    cb(data, direction);
  };
}
