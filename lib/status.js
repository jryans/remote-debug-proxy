'use strict';

let status = {

  id: 0,

  fromClient: function(packet) {
    this.send("from", "client", packet);
  },

  toClient: function(packet) {
    this.send("to", "client", packet);
  },

  fromServer: function(packet) {
    this.send("from", "server", packet);
  },

  toServer: function(packet) {
    this.send("to", "server", packet);
  },

  send: function(direction, actor, packet) {
    console.log(direction + " " + actor + ":\n" +
                packet);
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
  }

};

let WebSocketServer = require('ws').Server;
let wsServer = new WebSocketServer({
  port: 6001,
  path: '/status'
});

wsServer.on('connection', function(ws) {
  console.log('websocket connected');
  status.socket = ws;
});

module.exports = status;
