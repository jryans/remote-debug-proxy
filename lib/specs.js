'use strict';

let tcp = require('./sockets/tcp');
let ws = require('./sockets/ws');
let MozillaTransport = require('./transports/mozilla');
let JSONTransport = require('./transports/json');
//let BidiPassthrough = require('./streams/bidi-passthrough');

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

specs.define(
  'Chrome 32', ws.listen, ws.connect.bind(null, 9222),
  JSONTransport
);

module.exports = specs;
