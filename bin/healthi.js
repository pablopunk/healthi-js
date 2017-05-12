'use strict';

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = 'ioreg';
var options = ' -l | grep Capacity | cut -d\' \' -f19';

var commandExists = function commandExists(command) {
  return _shelljs2.default.which(command);
};

var get = async function get() {
  var battery = {
    currentCapacity: 0,
    originalCapacity: 0,
    health: 0
  };
  if (!commandExists(command)) {
    throw new Error(command + ' command does not exist');
  }

  var _shell$exec = _shelljs2.default.exec(command + options, { silent: true }),
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
  battery = {
    currentCapacity: capacityNow,
    originalCapacity: capacityOriginal,
    health: capacityNow * 100 / capacityOriginal
  };
  return battery;
};

module.exports = get;