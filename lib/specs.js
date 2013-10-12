'use strict';

let tcp = require('./sockets/tcp');

let specs = {

  define: function(key, clientSocket, serverSocket,
                   transport, lifetime, translator) {
    this.key = {
      clientSocket: clientSocket,
      serverSocket: serverSocket,
      transport: transport,
      lifetime: lifetime,
      translator: translator
    };
  }

};

specs.define(
  'Firefox 26',
  tcp.willListen()
);

exports = specs;
