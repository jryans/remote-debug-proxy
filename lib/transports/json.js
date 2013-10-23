'use strict';

let heritage = require('heritage');
let BidiTransform = require('../streams/bidi-transform');

let log = require('../utils/log');

function JSONTransport() {
  BidiTransform.call(this, {
    internal: {
      objectMode: true
    },
    external: {
      highWaterMark: 1024 * 1024
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
      data = JSON.stringify(object);
    } catch (e) {
      cb(e);
      return;
    }

    this.from.internal.push(data);
    cb();
  }

});

module.exports = JSONTransport;
