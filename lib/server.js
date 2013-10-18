'use strict';

let heritage = require('heritage');
let Chain = require('./chain');

function Server(specKey) {
  Chain.call(this, specKey);
}

Server.prototype = heritage.extend(Chain.prototype, {

});

module.exports = Server;
