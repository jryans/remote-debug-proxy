/*global define */
define([], function () {
  'use strict';

  var socket = new WebSocket('ws://localhost:6001/status');

  socket.onmessage = function (event) {
    var statusUpdate = JSON.parse(event.data);
    var message = "";
    message += "[" + statusUpdate.id + "] ";
    message += statusUpdate.direction + " ";
    message += statusUpdate.actor + ":\n";
    message += statusUpdate.packet + "\n";
    $('#status').prepend(message);
  };
});
