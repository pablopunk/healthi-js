'use strict';

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function get(callback) {
  _shelljs2.default.exec('ioreg -l | grep Capacity | cut -d\' \' -f19', { silent: true }, function (code, stdout, stderr) {
    if (code) {
      console.log('exec error: ' + stderr);
      return null;
    }

    var lines = stdout.match(/[^\n]+/g);
    var capacityNow = parseInt(lines[0], 10);
    var capacityOriginal = parseInt(lines[3], 10);
    var health = capacityNow * 100 / capacityOriginal;
    callback(health);
  });
}

module.exports = get;