'use strict';

let getBattery = (() => {
  var _ref = _asyncToGenerator(function* (os) {
    if (!(os in commands)) {
      throw new Error(`OS not supported (${os})`);
    }

    const { code, stdout, stderr } = yield execa.shell(commands[os]);
    if (code) {
      throw new Error(stderr);
    }

    return parse[os](stdout);
  });

  return function getBattery(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const os = require('os');
const execa = require('execa');

const commands = {
  darwin: "ioreg -rc AppleSmartBattery | grep .*Capacity.* | cut -d' ' -f9",
  linux: 'cat /sys/class/power_supply/BAT0/energy_full /sys/class/power_supply/BAT0/energy_full_design'
};

const parse = {
  darwin: function (output) {
    const lines = output.match(/[^\n]+/g);
    return { now: parseInt(lines[0], 10), original: parseInt(lines[3], 10) };
  },
  linux: function (output) {
    const lines = output.match(/[^\n]+/g);
    return { now: parseInt(lines[0], 10), original: parseInt(lines[1], 10) };
  }
};

const get = (() => {
  var _ref2 = _asyncToGenerator(function* () {
    const { now, original } = yield getBattery(os.platform());

    return {
      now,
      original,
      health: now * 100 / original
    };
  });

  return function get() {
    return _ref2.apply(this, arguments);
  };
})();

module.exports = get;
