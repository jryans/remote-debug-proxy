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

    this._listenerFactory = spec.clientListener;
  },

  start: function() {
    this._listenerFactory().then(function(listener) {
      listener.on('connection', this._onConnection.bind(this));
      this._listener = listener;
    }.bind(this));
  },

  _onConnection: function(clientSocket) {
    let client = new Client(this.specKey);
    client.socket = clientSocket;
    this.emit('client', client);
  }

});

module.exports = ClientListener;
