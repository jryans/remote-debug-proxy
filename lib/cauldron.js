'use strict';

let net = require('net');
//let status = require('./status');

let ClientListener = require('./client-listener');
let Server = require('./server');

let cauldron = {

  start: function() {
    // Client detection currently based on assuming things...
    let clientListener = new ClientListener('Firefox 26');

    clientListener.on('client', this._onClient);

    clientListener.start();
  },

  _onClient: function(client) {
    let serverSocket;

    serverSocket = net.connect({ port: 6000 }, function() {
      console.log('proxy connected to server');
    });

    let server = new Server('Firefox 26');

    client.to.internal

      // C->S boundary

      .pipe(server.from.internal)
      .pipe(serverSocket);

    serverSocket
      .pipe(server.from.external)

      // S->C boundary

      .pipe(client.from.internal);

    /* server.setEncoding('utf8');

    server.on('end', function() {
      console.log('server disconnected from proxy');
    });

    server.on('data', function(packet) {
      status.fromServer(packet);
      client.send(packet);
    });

    server.on('error', function(error) {
      console.log('SERVER ERROR:\n' + error);
    });

    server.send = function(data) {
      let packet;
      if (typeof data !== 'string') {
        packet = JSON.stringify(data, null, 2);
        packet = packet.length + ':' + packet;
      } else {
        packet = data;
      }
      status.toServer(packet);
      server.write(packet);
    }; */
  }

};

module.exports = cauldron;
