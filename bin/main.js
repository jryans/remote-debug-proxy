#!/usr/bin/env node --harmony
'use strict';

let opts = require('optimist').argv;
let remote-debug-proxy = require('../lib/remote-debug-proxy');

let specKey;
if (opts.f) {
  specKey = 'Firefox 26';
} else if (opts.c) {
  specKey = 'Chrome 32';
}

remote-debug-proxy.start(specKey);
