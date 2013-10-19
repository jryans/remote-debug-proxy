'use strict';

//let status = require('./status');

let ClientListener = require('./client-listener');
let Server = require('./server');

let cauldron = {

  start: function() {
    // Client detection currently based on assuming things...
    let clientListener = new ClientListener('Firefox 26');

    clientListener.on('client', this._onClient);

    clientListener.listen();
  },

  _onClient: function(client) {

    let server = new Server('Firefox 26');
    server.connect();

    client.to.internal.pipe(server.from.internal);
    server.to.internal.pipe(client.from.internal);

  }

};

module.exports = cauldron;
