'use strict';

let net = require('net');
let status = require('./status');

let tcp = require('./sockets/tcp');

let cauldron = {

  start: function() {
    let self = this;
    tcp.listen().then(function(listener) {
      // Client detection currently based on assuming things...
      listener.on('connection', self._onClientConnection);
    });
  },

  _onClientConnection: function(client) {
    let server;

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

    server = net.connect({ port: 6000 }, function() {
      console.log('proxy connected to server');
    });

    let MozillaTransport = require('./transports/mozilla');
    let cTP = new MozillaTransport();
    let sTP = new MozillaTransport();

    client
      .pipe(cTP.from.external)
      .pipe(cTP.to.external)
      .pipe(server);

    server
      .pipe(sTP.from.external)
      .pipe(sTP.to.external)
      .pipe(client);

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
