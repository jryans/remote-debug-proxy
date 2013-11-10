'use strict';

let heritage = require('heritage');
let BidiTransform = require('../streams/bidi-transform');
let Message = require('../messages/message');
let Actor = require('../actors/actor');
let log = require('../utils/log');

function MozillaTranslator(owner) {
  BidiTransform.call(this, {
    internal: {
      objectMode: true
    },
    external: {
      objectMode: true
    }
  });

  this.owner = owner;
  this._actorMap = new Map();
  this._lastOutgoingType = '';
}

MozillaTranslator.prototype = heritage.extend(BidiTransform.prototype, {

  externalToInternal: function(object, encoding, cb) {
    // Validate incoming object
    if (!object.from) {
      log.error('No actor ID given in message');
      cb();
      return;
    }

    // Remember sending actor
    

    // Wrap into Message
    let msg = new Message(object);

    // Convert sender information
    msg.from = {
      device: this.owner
    };

    if (!this._detectMessage(msg)) {
      log.warn('Unable to detect message, ignoring');
    }

    this._recordActor(msg);

    this.from.external.push(msg);
    cb();
  },

  _getActor: function(actorID) {
    let actor = this._actorMap.get(actorID);

    if (actor) {
      return actor;
    }

    actor = new Actor(actorID);
    this._actorMap.set(actorID, actor);

    return actor;
  },

  // Don't test for explicit "form" values
  _detectMessage: function(msg) {
    // Change to be based on last outgoing
    if (msg.raw.applicationType) {
      // Describe allowed domains / types in Message
      msg.domain = 'device';
      msg.type = 'announce';
    }
  },

  _recordActor: function(msg) {
    if (msg.domain === 'device') {
      
  },

  internalToExternal: function(object, encoding, cb) {
    this.from.internal.push(object);
    cb();
  }

});

module.exports = MozillaTranslator;
