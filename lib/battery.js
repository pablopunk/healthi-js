const { existsSync } = require('fs')
const { shellSync } = require('execa')

const canRun = {
  darwin: function () {
    const { code } = shellSync('which ioreg')
    return code === 0
  },
  linux: function () {
    return existsSync('/sys/class/power_supply/BAT0/energy_full_design')
  }
}

const commands = {
  darwin: "ioreg -rc AppleSmartBattery | grep .*Capacity.* | cut -d' ' -f9",
  linux:
    'cat /sys/class/power_supply/BAT0/energy_full /sys/class/power_supply/BAT0/energy_full_design'
}

const parse = {
  darwin: function (output) {
    const lines = output.match(/[^\n]+/g)
    return { now: parseInt(lines[0], 10), original: parseInt(lines[3], 10) }
  },
  linux: function (output) {
    const lines = output.match(/[^\n]+/g)
    return { now: parseInt(lines[0], 10), original: parseInt(lines[1], 10) }
  }
}

module.exports = { canRun, commands, parse }
