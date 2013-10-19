'use strict';

let heritage = require('heritage');
let Chain = require('./chain');
let log = require('./utils/log');
let status = require('./status');

let id = 0;

function Client(specKey) {
  Chain.call(this, specKey);
  this.type = 'client';
  this.name = specKey;
  this._id = id++;

  status.observeChain(this);
}

Client.prototype = heritage.extend(Chain.prototype, {

  get logId() {
    if (!this._logId) {
      this._logId = this.name + ' ' + this.type + ' (#' + this._id + ')';
    }
    return this._logId;
  },

  set socket(socket) {
    this._socket = socket;

    log.info(this.logId + ' connected to proxy');

    socket.on('end', function() {
      log.info(this.logId + ' disconnected from proxy');
    }.bind(this));

    socket.on('error', function(e) {
      log.error(this.logId + ': ' + e);
    }.bind(this));

    this.attachExternalStream(socket);
  }

});

module.exports = Client;
