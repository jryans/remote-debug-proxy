'use strict';

let tcp = require('./sockets/tcp');
let MozillaTransport = require('./transports/mozilla');

let specs = new Map();

specs.define = function(key, clientListener,
                        transport, lifetime, translator) {
  this.set(key, {
    clientListener: clientListener,
    transport: transport,
    lifetime: lifetime,
    translator: translator
  });
};

specs.define(
  'Firefox 26', tcp.listen,
  MozillaTransport
);

module.exports = specs;
