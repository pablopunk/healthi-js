'use strict';

var shell = require('shelljs');

var command = 'ioreg';
var options = ' -l | grep Capacity | cut -d\' \' -f19';

var commandExists = function commandExists(command) {
  return shell.which(command);
};

var get = async function get() {
  if (!commandExists(command)) {
    throw new Error(command + ' command does not exist');
  }

  var _shell$exec = shell.exec(command + options, { silent: true }),
      code = _shell$exec.code,
      stdout = _shell$exec.stdout,
      stderr = _shell$exec.stderr;

  if (code) {
    throw new Error(stderr);
  }

  var lines = stdout.match(/[^\n]+/g);
  if (lines === null) {
    throw new Error('error parsing "' + stdout + '"');
  }

  var capacityNow = parseInt(lines[0], 10);
  var capacityOriginal = parseInt(lines[3], 10);
  return {
    currentCapacity: capacityNow,
    originalCapacity: capacityOriginal,
    health: capacityNow * 100 / capacityOriginal
  };
};

module.exports = get;
