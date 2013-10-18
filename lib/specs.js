'use strict';

let MozillaTransport = require('./transports/mozilla');

let specs = new Map();

specs.define = function(key,
                        transport, lifetime, translator) {
  this.set(key, {
    transport: transport,
    lifetime: lifetime,
    translator: translator
  });
};

specs.define(
  'Firefox 26', MozillaTransport
);

module.exports = specs;
