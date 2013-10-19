'use strict';

let tcp = require('./sockets/tcp');
let MozillaTransport = require('./transports/mozilla');

let specs = new Map();

specs.define = function(key, clientListen, serverConnect,
                        transport, lifetime, translator) {
  this.set(key, {
    clientListen: clientListen,
    serverConnect: serverConnect,
    transport: transport,
    lifetime: lifetime,
    translator: translator
  });
};

specs.define(
  'Firefox 26', tcp.listen, tcp.connect.bind(null, 6000),
  MozillaTransport
);

module.exports = specs;
