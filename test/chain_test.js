'use strict';

let expect = require('chai').expect;

let Chain = require('../lib/chain.js');
let IdTransform = require('./id-transform');

describe('Chain', function() {
  it('should order links correctly', function(done) {

    let expecting = 2;

    let chain = new Chain();

    let trans1 = new IdTransform(1);
    let trans2 = new IdTransform(2);

    chain.addChainLink(trans1);
    chain.addChainLink(trans2);

    chain.to.internal.on('data', function(output) {
      expect(output.toString()).to.equal('a -> 1 -> 2');
      checkDone();
    });

    chain.from.external.write('a');

    chain.to.external.on('data', function(output) {
      expect(output.toString()).to.equal('1 <- 2 <- a');
      checkDone();
    });

    chain.from.internal.write('a');

    function checkDone() {
      if (!--expecting) {
        done();
      }
    }

  });
});
