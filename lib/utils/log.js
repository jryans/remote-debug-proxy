'use strict';

let chalk = require('chalk');

exports.error = function(msg) {
  console.log(chalk.bold.red('ERR: ') + msg);
};

exports.info = function(msg) {
  console.log(chalk.green('NFO: ') + msg);
};
