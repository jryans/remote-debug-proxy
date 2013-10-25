#!/usr/bin/env node --harmony
'use strict';

let opts = require('optimist').argv;
let cauldron = require('../lib/cauldron');

let specKey;
if (opts.f) {
  specKey = 'Firefox 26';
} else if (opts.c) {
  specKey = 'Chrome 32';
}

cauldron.start(specKey);
