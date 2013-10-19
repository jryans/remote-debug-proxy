'use strict';

let heritage = require('heritage');
let Chain = require('./chain');
let log = require('./utils/log');

let id = 0;

function Client(specKey) {
  Chain.call(this, specKey);
  this.specKey = specKey;
  this._id = id++;
}

Client.prototype = heritage.extend(Chain.prototype, {

  get logId() {
    return this.specKey + ' client (#' + this._id + ')';
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
