'use strict';

const shell = require('shelljs');

const command = 'ioreg';
const options = ' -l | grep Capacity | cut -d\' \' -f19';

const commandExists = command => {
  return shell.which(command);
};

const get = async () => {
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
};

module.exports = get;
