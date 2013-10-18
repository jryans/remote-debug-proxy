'use strict';

let util = require('util');
let heritage = require('heritage');
let BidiTransform = require('../lib/streams/bidi-transform');

function IdTransform(id) {
  BidiTransform.call(this);
  this._id = id;
}

IdTransform.prototype = heritage.extend(BidiTransform.prototype, {

  externalToInternal: function(chunk, encoding, cb) {
    this.from.external.push(chunk + ' -> ' + this._id);
    cb();
  },

  internalToExternal: function(chunk, encoding, cb) {
    this.from.internal.push(this._id + ' <- ' + chunk);
    cb();
  }

});

module.exports = IdTransform;

