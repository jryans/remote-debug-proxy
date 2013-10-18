'use strict';

let heritage = require('heritage');
let BidiTransform = require('./streams/bidi-transform');
let specs = require('./specs');

function Client(specKey) {
  BidiTransform.call(this, {
    internal: {
      objectMode: true
    }
  });

  this.emptyChain();

  if (specKey) {
    this.buildChainFromSpec(specKey);
  }
}

Client.prototype = heritage.extend(BidiTransform.prototype, {

  emptyChain: function() {
    this._chain = [];
  },

  buildChainFromSpec: function(specKey) {
    let spec = specs.get(specKey);

    if (!spec) {
      throw new Error('Unknown spec: ' + specKey);
    }

    this.addBidiTransform(spec.transport);
  },

  addBidiTransform: function(BidiTransformLink) {
    // TODO: Actually write this for multiple things!
    this._chain.push(new BidiTransformLink());

    this.internal.from.external.on('data', function(chunk) {
      this.to.internal.push(chunk);
    }.bind(this));

    this.external.from.internal.on('data', function(chunk) {
      this.to.external.push(chunk);
    }.bind(this));
  },

  get external() {
    return this._chain[0];
  },

  get internal() {
    return this._chain[this._chain.length - 1];
  },

  externalToInternal: function(chunk, encoding, cb) {
    this.external.to.internal.write(chunk, encoding, cb);
  },

  internalToExternal: function(chunk, encoding, cb) {
    this.internal.to.external.write(chunk, encoding, cb);
  }

});

module.exports = Client;
