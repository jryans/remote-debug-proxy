'use strict';

let heritage = require('heritage');
let BidiTransform = require('../streams/bidi-transform');

function MozillaTransport() {
  BidiTransform.call(this, {
    internal: {
      //objectMode: true
    }
  });

  this.from.external._transform = this.transformExternalToInternal;
}

MozillaTransport.prototype = heritage.extend(BidiTransform.prototype, {

  transformExternalToInternal: function(chunk, encoding, cb) {
    console.log('Got data: ' + chunk);
    cb();
  }

});

module.exports = MozillaTransport;
