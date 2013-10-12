'use strict';

function Session(client, server) {
  this._clients = [];
  this._servers = [];

  if (client) {
    this.addClient(client);
  }
  if (server) {
    this.addServer(server);
  }
}

Session.prototype = {

  addClient: function(client) {
    this._clients.push(client);
  },

  addServer: function(server) {
    this._servers.push(server);
  }

};

exports = Session;
