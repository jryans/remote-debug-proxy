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
      let streamingSocket = new WSStream(socket);
      streamingSocket.path = socket.upgradeReq.url;
      listener.emit('socket', streamingSocket);
    });

    listener.on('error', log.error);

    return Q.resolve(listener);
  },

  testConnect: function(port, path) {
    let socket = new WebSocket('ws://localhost:' + port + path);

    socket.on('connect', function() {
      log.info('Proxy connected to ' + this.logId);
    }.bind(this));

    socket.on('open', function() {
      log.info('Proxy connected to ' + this.logId);
    }.bind(this));

    socket.on('end', function() {
      log.info('Proxy disconnected from ' + this.logId);
    }.bind(this));

    socket.on('close', function() {
      log.info('Proxy disconnected from ' + this.logId);
    }.bind(this));

    socket.on('error', function(e) {
      log.error(this.logId + ': ' + e);
    }.bind(this));

    socket.on('open', function() {
      log.info('Sending test msg');

      let msg = {
        "method": "Worker.canInspectWorkers",
        "id": 1
      };

      let packet = JSON.stringify(msg);

      socket.send(packet);
    });

    socket.on('message', function(packet) {
      log.info('Got msg: ' + packet);
    });
  },

  connect: function(port, path) {
    return new WSStream('ws://localhost:' + port + path);
  }

};

module.exports = ws;
