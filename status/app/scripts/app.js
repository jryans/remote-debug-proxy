/*global define */
define([], function () {
  'use strict';

  var socket = new WebSocket('ws://localhost:6001/status');

  socket.onmessage = function (event) {
    var statusUpdate = JSON.parse(event.data);
    var message = '';
    message += '[' + statusUpdate.id + '] ';
    message += statusUpdate.direction + ' ';
    message += statusUpdate.fullName + ':\n';
    message += JSON.stringify(statusUpdate.packet, null, 2) + '\n';
    $('#status').append(message);
  };

  $('#select-all').click(function() {
    var status = document.querySelector('#status');
    var range = document.createRange();
    range.selectNodeContents(status);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  });
});
