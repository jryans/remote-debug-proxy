/* jshint -W078 */

'use strict';

let stream = require('stream');

function BidiTransform(options) {
  this._clientToServer = new stream.Transform();
  this._serverToClient = new stream.Transform();

  if (options.client) {
    this.clientEndState = options.client;
  }
  if (options.server) {
    this.serverEndState = options.server;
  }
}

BidiTransform.prototype = {

  get to() {
    return {
      client: this._serverToClient,
      server: this._clientToServer
    };
  },

  get from() {
    return {
      client: this._clientToServer,
      server: this._serverToClient
    };
  },

  set clientEndState(options) {
    for (let option in options) {
      this._clientToServer._writableState[option] = options[option];
      this._serverToClient._readableState[option] = options[option];
    }
  },

  set serverEndState(options) {
    for (let option in options) {
      this._clientToServer._readableState[option] = options[option];
      this._serverToClient._writableState[option] = options[option];
    }
  }

};

module.exports = BidiTransform;
