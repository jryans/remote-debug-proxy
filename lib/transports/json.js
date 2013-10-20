'use strict';

let heritage = require('heritage');
let BidiTransform = require('../streams/bidi-transform');

function JSONTransport() {
  BidiTransform.call(this, {
    internal: {
      objectMode: true
    }
  });
}

JSONTransport.prototype = heritage.extend(BidiTransform.prototype, {

  // TODO: Test large / multi-chunk

  externalToInternal: function(chunk, encoding, cb) {
    let data = chunk.toString();

    let object;
    try {
      object = JSON.parse(data);
    } catch (e) {
      cb(e);
      return;
    }

    this.from.external.push(object);
    cb();
  },

  internalToExternal: function(object, encoding, cb) {
    let data;
    try {
      data = JSON.stringify(object, null, 2);
    } catch (e) {
      cb(e);
      return;
    }

    this.from.internal.push(data);
    cb();
  }

});

module.exports = JSONTransport;
