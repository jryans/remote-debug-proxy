'use strict';

let heritage = require('heritage');
let Chain = require('./chain');
let log = require('./utils/log');
let specs = require('./specs');
let status = require('./status');

let id = 0;

function Server(specKey) {
  Chain.call(this, specKey);
  this.type = 'server';
  this.name = specKey;
  this._id = id++;

  status.observeChain(this);
}

Server.prototype = heritage.extend(Chain.prototype, {

  get logId() {
    if (!this._logId) {
      this._logId = this.name + ' ' + this.type + ' (#' + this._id + ')';
    }
    return this._logId;
  },

  set socket(socket) {
    this._socket = socket;

    socket.on('connect', function() {
      log.info('Proxy connected to ' + this.logId);
    }.bind(this));

    socket.on('end', function() {
      log.info('Proxy disconnected from ' + this.logId);
    }.bind(this));

    socket.on('error', function(e) {
      log.error(this.logId + ': ' + e);
    }.bind(this));

    this.attachExternalStream(socket);
  },

  buildFromSpec: function(specKey) {
    Chain.prototype.buildFromSpec.call(this, specKey);

    let spec = specs.get(specKey);

    if (!spec) {
      log.error('Unknown spec: ' + specKey);
    }

    this._connect = spec.serverConnect;
  },

  connect: function() {
    this.socket = this._connect.apply(null, arguments);
  }

});

module.exports = Server;
