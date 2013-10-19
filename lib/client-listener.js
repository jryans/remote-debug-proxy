'use strict';

let events = require('events');
let heritage = require('heritage');
let specs = require('./specs');
let log = require('./utils/log');
let Client = require('./client');

function ClientListener(specKey) {
  this.specKey = specKey;
  this.buildFromSpec(specKey);
}

ClientListener.prototype = heritage.extend(events.EventEmitter.prototype, {

  buildFromSpec: function(specKey) {
    let spec = specs.get(specKey);

    if (!spec) {
      log.error('Unknown spec: ' + specKey);
    }

    this._listen = spec.clientListen;
  },

  listen: function() {
    this._listen().then(function(listener) {
      listener.on('socket', this._onSocket.bind(this));
      this._listener = listener;
    }.bind(this));
  },

  _onSocket: function(clientSocket) {
    let client = new Client(this.specKey);
    client.socket = clientSocket;
    this.emit('client', client);
  }

});

module.exports = ClientListener;
