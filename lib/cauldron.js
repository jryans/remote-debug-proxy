'use strict';

let net = require('net');

let go = function() {

let server = net.createServer(function(c) {
  console.log('server connected');
  c.on('end', function() {
    console.log('server disconnected');
  });
  c.on('data', function(data) {
    console.log("RECV:\n" + data);
  });

  let sayHello = {
    from: "root",
    applicationType: 'browser',
    traits: {
      sources: true
    }
  };

  c.send = function(data) {
    let packet = JSON.stringify(data, null, 2);
    console.log("SEND:\n" + packet);
    c.write(packet.length + ':' + packet);
  };

  c.send(sayHello);
});



server.listen(6000, function() {
  console.log('server bound');
});

};

module.exports = go;
