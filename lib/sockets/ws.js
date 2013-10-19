'use strict';

let WebSocket = require('ws');
let WSStream = require('websocket-stream');
let Q = require('q');
let log = require('../utils/log');

let ws = {

  activeListeners: new Map(),

  listen: function(port) {
    if (!port) {
      port = 2285;
    }

    if (ws.activeListeners.has(port)) {
      return Q.resolve(ws.activeListeners.get(port));
    }

    let listener = new WebSocket.Server({ port: port });
    ws.activeListeners.set(port, listener);

    log.info('Listening for WS client on ' + port);

    listener.on('connection', function(socket) {
      listener.emit('socket', new WSStream(socket));
    });

    listener.on('error', log.error);

    return Q.resolve(listener);
  },

  connect: function(port, path) {
    return new WSStream('ws://localhost:' + port + path);
  }

};

module.exports = ws;
