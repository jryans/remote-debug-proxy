'use strict';

let heritage = require('heritage');
let BidiTransform = require('./streams/bidi-transform');
let specs = require('./specs');
let log = require('./utils/log');

function Chain(specKey) {
  BidiTransform.call(this, {
    internal: {
      objectMode: true
    }
  });

  this._onDataInternal = this._onDataInternal.bind(this);
  this._onDataExternal = this._onDataExternal.bind(this);

  this.emptyChain();

  if (specKey) {
    this.buildFromSpec(specKey);
  }
}

Chain.prototype = heritage.extend(BidiTransform.prototype, {

  emptyChain: function() {
    this._chain = [];
  },

  buildFromSpec: function(specKey) {
    let spec = specs.get(specKey);

    if (!spec) {
      log.error('Unknown spec: ' + specKey);
    }

    this.addChainLink(new spec.transport());
  },

  attachExternalStream: function(stream) {
    // Assumes _chain is populated
    stream.pipe(this.external.from.external);
    this.external.to.external.pipe(stream);
  },

  addChainLink: function(link) {
    if (this._chain.length > 0) {
      this.internal.to.internal.removeListener('data', this._onDataInternal);
      this.external.to.external.removeListener('data', this._onDataExternal);

      this.internal.to.internal.pipe(link.from.external);
      link.to.external.pipe(this.internal.from.internal);
    }

    this._chain.push(link);

    this.internal.to.internal.on('data', this._onDataInternal);
    this.external.to.external.on('data', this._onDataExternal);
  },

  _onDataInternal: function(chunk) {
    this.to.internal.push(chunk);
  },

  _onDataExternal: function(chunk) {
    this.to.external.push(chunk);
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

module.exports = Chain;
