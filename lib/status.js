'use strict';

let log = require('./utils/log');

let status = {

  id: 0,

  send: function(direction, actor, packet) {
    log.info(direction + " " + actor + ":\n" +
             JSON.stringify(packet, null, 2));
    if (!this.socket) {
      return;
    }
    let statusUpdate = {
      id: ++this.id,
      direction: direction,
      actor: actor,
      packet: packet
    };
    this.socket.send(JSON.stringify(statusUpdate, null, 2));
  },

  observeChain: function(chain) {
    chain.transport.observe.internal(function(packet, direction) {
      this.send(direction, chain.type, packet);
    }.bind(this));
  }

};

const port = 6001;
let WebSocketServer = require('ws').Server;
let wsServer = new WebSocketServer({
  port: port,
  path: '/status'
});

log.info('Listening for status client on ' + port);

wsServer.on('connection', function(ws) {
  log.info('Status client connected');
  status.socket = ws;
});

module.exports = status;
