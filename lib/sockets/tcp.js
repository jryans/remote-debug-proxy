'use strict';

let net = require('net');
let Q = require('q');
let log = require('../utils/log');

let tcp = {

  activeListeners: new Map(),

  listen: function(options) {
    let port = 2285;
    if (options && options.on) {
      port = options.on;
    }

    if (tcp.activeListeners.has(port)) {
      return Q.resolve(tcp.activeListeners.get(port));
    }

    let deferred = Q.defer();
    let listener = net.createServer();
    tcp.activeListeners.set(port, listener);

    listener.listen(port, function() {
      console.log('Listening for client on ' + port);
      deferred.resolve(listener);
    });

    listener.on('error', log.error);

    return deferred.promise;
  }

};

module.exports = tcp;
