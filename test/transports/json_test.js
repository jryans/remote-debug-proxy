'use strict';

let expect = require('chai').expect;

let JSONTransport = require('../../lib/transports/json');

describe('JSONTransport', function() {
  it('should accept split chunks from external', function(done) {

    let expecting = 2;

    let transport = new JSONTransport();

    let sampleData = [];
    for (let i = 0; i < 10000; i++) {
      sampleData.push(i);
    }

    let stringData = JSON.stringify(sampleData);

    expect(stringData.length).to.equal(48891);

    let part1 = stringData.substr(0, 25000);
    let part2 = stringData.substr(25000);

    transport.from.external.on('data', function(sampleObject) {
      expect(sampleObject).to.be.an('array');
      expect(sampleObject.length).to.equal(10000);
      checkDone();
    });

    // Try two parts
    transport.from.external.write(part1);
    transport.from.external.write(part2);

    // Try one large part
    transport.from.external.write(stringData);

    function checkDone() {
      if (!--expecting) {
        done();
      }
    }

  });
});
