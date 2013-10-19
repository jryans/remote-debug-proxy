'use strict';

let ClientListener = require('./client-listener');
let Server = require('./server');

let cauldron = {

  start: function() {
    // Client detection currently based on assuming things...
    //let clientListener = new ClientListener('Firefox 26');
    let clientListener = new ClientListener('Chrome 32');

    clientListener.on('client', this._onClient);

    clientListener.listen();
  },

  _onClient: function(client) {

    let server = new Server('Chrome 32');
    server.connect();

    client.to.internal.pipe(server.from.internal);
    server.to.internal.pipe(client.from.internal);

  }

};

module.exports = cauldron;
