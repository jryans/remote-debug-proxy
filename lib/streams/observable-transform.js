'use strict';

let heritage = require('heritage');
let stream = require('stream');

function ObservableTransform() {
  stream.Transform.call(this);
}

ObservableTransform.prototype = heritage.extend(stream.Transform.prototype, {

  _transform: function(chunk) {
    this.emit('write', chunk);
    this.transform.apply(this, arguments);
  }

});

module.exports = ObservableTransform;
