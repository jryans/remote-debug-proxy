'use strict';

let should = require('chai').should();

var cauldron = require('../lib/cauldron.js');

describe('cauldron', function() {
  describe('#awesome()', function() {
    it('should be awesome', function() {

      cauldron.should.have.property('awesome');

      should.equal(cauldron.awesome(), 'awesome');

    });
  });
});
