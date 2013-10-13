'use strict';

let util = require('util');
let BidiTransform = require('../streams/bidi-transform');

function MozillaTransport() {
  BidiTransform.call(this, {
    internal: {
      objectMode: true
    }
  });
}

util.inherits(MozillaTransport, BidiTransform);

MozillaTransport.prototype = {

  transformExternalToInternal: function(chunk, encoding, cb) {
    console.log('Got data: ' + chunk);
    cb();
  }

};

module.exports = MozillaTransport;
