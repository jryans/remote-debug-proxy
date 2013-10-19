'use strict';

let heritage = require('heritage');
let BidiTransform = require('./bidi-transform');

function BidiPassthrough() {
  BidiTransform.call(this);
}

BidiPassthrough.prototype = heritage.extend(BidiTransform.prototype, {

  externalToInternal: function(chunk, encoding, cb) {
    this.from.external.push(chunk);
    cb();
  },

  internalToExternal: function(chunk, encoding, cb) {
    this.from.internal.push(chunk);
    cb();
  }

});

module.exports = BidiPassthrough;
