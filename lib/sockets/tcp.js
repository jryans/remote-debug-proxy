'use strict';

let net = require('net');
let Q = require('q');

let tcp = {

  activeListeners: new Map(),

  listen: function(options) {
    let port = 2285;
    if (options && options.on) {
      port = options.on;
    }

    if (this.activeListeners.has(port)) {
      return Q.resolve(this.activeListeners.get(port));
    }

    let deferred = Q.defer();
    let listener = net.createServer();
    this.activeListeners.set(port, listener);
    listener.listen(port, function() {
      console.log('Listening for client on ' + port);
      deferred.resolve(listener);
    });
    return deferred.promise;
  }

};

module.exports = tcp;
