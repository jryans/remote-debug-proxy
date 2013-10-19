'use strict';

let heritage = require('heritage');
let BidiTransform = require('../streams/bidi-transform');

function MozillaTransport() {
  BidiTransform.call(this, {
    internal: {
      objectMode: true
    }
  });
}

MozillaTransport.prototype = heritage.extend(BidiTransform.prototype, {

  // TODO: Test large / multi-chunk

  externalToInternal: function(chunk, encoding, cb) {
    let decodedChunk = chunk.toString();

    let sepPosition = decodedChunk.indexOf(':');
    let expectedDataLength = parseInt(decodedChunk.slice(0, sepPosition), 10);
    let data = decodedChunk.slice(sepPosition + 1);

    if (data.length !== expectedDataLength) {
      cb(new Error('Expected data length ' + expectedDataLength +
                   ', got ' + data.length));
      return;
    }

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

    data = data.length + ':' + data;

    this.from.internal.push(data);
    cb();
  }

});

module.exports = MozillaTransport;
