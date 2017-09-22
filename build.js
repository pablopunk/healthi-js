'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const shell = require('shelljs');

const command = 'ioreg';
const options = ' -l | grep Capacity | cut -d\' \' -f19';

const commandExists = command => {
  return shell.which(command);
};

const get = (() => {
  var _ref = _asyncToGenerator(function* () {
    if (!commandExists(command)) {
      throw new Error(`${command} command does not exist`);
    }

    const { code, stdout, stderr } = shell.exec(command + options, { silent: true });

    if (code) {
      throw new Error(stderr);
    }

    const lines = stdout.match(/[^\n]+/g);
    if (lines === null) {
      throw new Error(`error parsing "${stdout}"`);
    }

    const capacityNow = parseInt(lines[0], 10);
    const capacityOriginal = parseInt(lines[3], 10);
    return {
      currentCapacity: capacityNow,
      originalCapacity: capacityOriginal,
      health: capacityNow * 100 / capacityOriginal
    };
  });

  return function get() {
    return _ref.apply(this, arguments);
  };
})();

module.exports = get;
