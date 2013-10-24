'use strict';

let net = require('net');
let Q = require('q');
let log = require('../utils/log');

let tcp = {

  activeListeners: new Map(),

  listen: function(port) {
    if (!port) {
      port = 2285;
    }

    if (tcp.activeListeners.has(port)) {
      return Q.resolve(tcp.activeListeners.get(port));
    }

    let deferred = Q.defer();
    let listener = net.createServer();
    tcp.activeListeners.set(port, listener);

    listener.listen(port, function() {
      log.info('Listening for TCP client on ' + port);
      deferred.resolve(listener);
    });

    listener.on('connection', listener.emit.bind(listener, 'socket'));

    listener.on('error', log.error);

    return deferred.promise;
  },

  connect: function(port) {
    return net.connect({ port: port });
  }

};

module.exports = tcp;
