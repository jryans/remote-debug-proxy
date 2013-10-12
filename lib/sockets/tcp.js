'use strict';

let net = require('net');
let Q = require('q');

let tcp = {

  willListen: function(options) {
    let port = 2285;
    if (options && options.on) {
      port = options.on;
    }

    return function() {
      let deferred = Q.defer();
      let listener = net.createServer();
      listener.listen(port, function() {
        deferred.resolve(listener);
      });
      return deferred.promise;
    };
  }

};

exports = tcp;
