'use strict';

function Client(options) {
  this._socket = options.socket;
  this._transport = options.transport;
  this._lifetime = options.lifetime;
  this._translator = options.translator;
}

Client.prototype = {

};

exports = Client;
