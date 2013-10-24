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

  externalToInternal: function(chunk, encoding, cb) {
    if (!this._data) {
      // Starting a new object
      let decodedChunk = chunk.toString();

      let sepPosition = decodedChunk.indexOf(':');
      this._expectedDataLength =
        parseInt(decodedChunk.slice(0, sepPosition), 10);
      this._data = decodedChunk.slice(sepPosition + 1);
    } else {
      // Getting more data
      this._data += chunk.toString();
    }

    if (this._data.length !== this._expectedDataLength) {
      // Need more data
      cb();
      return;
    }

    let object;
    try {
      object = JSON.parse(this._data);
    } catch (e) {
      cb(e);
      return;
    }

    this._data = null;
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
