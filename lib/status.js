'use strict';

let status = {

  fromClient: function(packet) {
    console.log("WSSEND FROM CLIENT:\n" + packet);
    this.socket.send(packet);
  },

  toClient: function(packet) {
    console.log("WSSEND TO CLIENT:\n" + packet);
    this.socket.send(packet);
  }

};

let WebSocketServer = require('ws').Server;
let wsServer = new WebSocketServer({port: 6001});

wsServer.on('connection', function(ws) {
  console.log('websocket connected');
  status.socket = ws;
});

module.exports = status;
