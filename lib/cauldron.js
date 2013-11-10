'use strict';

let ClientListener = require('./client-listener');
let Server = require('./server');
let log = require('./utils/log');

let remote-debug-proxy = {

  start: function(specKey) {
    if (!specKey) {
      log.error('No client / server specified');
      process.exit(1);
    }

    // Client detection currently based on assuming things...
    let clientListener = new ClientListener(specKey);

    clientListener.on('client', this._onClient);

    clientListener.listen();
  },

  _onClient: function(client) {

    // Assume client and server are the same for now
    let server = new Server(client.name);
    server.connect(client.path);

    client.to.internal.pipe(server.from.internal);
    server.to.internal.pipe(client.from.internal);

  }

};

module.exports = remote-debug-proxy;
