/* jshint -W078 */

'use strict';

let stream = require('stream');

function BidiTransform(options) {
  this._externalToInternal = new stream.Transform();
  this._internalToExternal = new stream.Transform();

  this._externalToInternal._transform = this.externalToInternal.bind(this);
  this._internalToExternal._transform = this.internalToExternal.bind(this);

  if (options && options.external) {
    this.externalState = options.external;
  }
  if (options && options.internal) {
    this.internalState = options.internal;
  }
}

BidiTransform.prototype = {

  get to() {
    return {
      external: this._internalToExternal,
      internal: this._externalToInternal
    };
  },

  get from() {
    return {
      external: this._externalToInternal,
      internal: this._internalToExternal
    };
  },

  set externalState(options) {
    for (let option in options) {
      this._externalToInternal._writableState[option] = options[option];
      this._internalToExternal._readableState[option] = options[option];
    }
  },

  set internalState(options) {
    for (let option in options) {
      this._externalToInternal._readableState[option] = options[option];
      this._internalToExternal._writableState[option] = options[option];
    }
  }

};

module.exports = BidiTransform;
