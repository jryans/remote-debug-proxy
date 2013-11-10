'use strict';

let chalk = require('chalk');

exports.error = function(msg) {
  let error = new Error(msg);
  let stack = error.stack.split('\n');
  stack.shift();
  stack = stack.join('\n');
  console.log(chalk.bold.red('ERR: ') + msg + '\n' + stack);
};

exports.warn = function(msg) {
  console.log(chalk.yellow('WRN: ') + msg);
};

exports.info = function(msg) {
  console.log(chalk.green('NFO: ') + msg);
};
