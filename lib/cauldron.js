'use strict';

let net = require('net');
//let status = require('./status');

let tcp = require('./sockets/tcp');

let Client = require('./client');

let cauldron = {

  start: function() {
    let self = this;
    tcp.listen().then(function(listener) {
      // Client detection currently based on assuming things...
      listener.on('connection', self._onClientConnection);
    });
  },

  _onClientConnection: function(clientSocket) {
    let serverSocket;

    console.log('client connected to proxy');

    /* client.setEncoding('utf8');

    client.on('end', function() {
      console.log('client disconnected from proxy');
    });

    client.on('data', function(packet) {
      status.fromClient(packet);
      server.send(packet);
    });

    client.on('error', function(error) {
      console.log('CLIENT ERROR:\n' + error);
    });

    client.send = function(data) {
      let packet;
      if (typeof data !== 'string') {
        packet = JSON.stringify(data, null, 2);
        packet = packet.length + ':' + packet;
      } else {
        packet = data;
      }
      status.toClient(packet);
      client.write(packet);
    }; */

    serverSocket = net.connect({ port: 6000 }, function() {
      console.log('proxy connected to server');
    });

    let MozillaTransport = require('./transports/mozilla');
    //let cTP = new MozillaTransport();
    let sTP = new MozillaTransport();

    let client = new Client('Firefox 26');

    clientSocket
      .pipe(client.from.external)

      // C->S boundary

      .pipe(sTP.to.external)
      .pipe(serverSocket);

    serverSocket
      .pipe(sTP.from.external)

      // S->C boundary

      .pipe(client.from.internal)
      .pipe(clientSocket);

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
