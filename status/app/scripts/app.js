/*global define */
define([], function () {
  'use strict';

  var socket = new WebSocket('ws://localhost:6001');

  socket.onmessage = function (event) {
    console.log(event.data);
  };

  return '\'Allo \'Allo!';
});
