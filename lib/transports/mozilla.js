'use strict';

let heritage = require('heritage');
let BidiTransform = require('../streams/bidi-transform');

function MozillaTransport() {
  BidiTransform.call(this, {
    internal: {
      //objectMode: true
    }
  });

  this.from.external._transform = this.transformExternalToInternal.bind(this);
  this.from.internal._transform = this.transformInternalToExternal.bind(this);
}

MozillaTransport.prototype = heritage.extend(BidiTransform.prototype, {

  transformExternalToInternal: function(chunk, encoding, cb) {
    console.log('E to I: ' + chunk);
    this.from.external.push(chunk);
    cb();
  },

  transformInternalToExternal: function(chunk, encoding, cb) {
    console.log('I to E: ' + chunk);
    this.from.internal.push(chunk);
    cb();
  }

});

module.exports = MozillaTransport;
