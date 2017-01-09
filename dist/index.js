'use strict';

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function get(callback) {
  (0, _child_process2.default)('ioreg -l | grep Capacity | cut -d\' \' -f19', function (error, stdout) {
    if (error !== null) {
      console.log('exec error: ' + error);
      return null;
    }

    var lines = stdout.match(/[^\r\n]+/g);
    var capacityNow = parseInt(lines[0], 10);
    var capacityOriginal = parseInt(lines[3], 10);
    var health = capacityNow * 100 / capacityOriginal;
    callback(health);
  });
}

module.exports = get;