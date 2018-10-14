const { existsSync } = require('fs')
const { shellSync } = require('execa')

const canRun = {
  darwin: () => shellSync('which ioreg').code === 0,
  linux: () => existsSync('/sys/class/power_supply/BAT0/energy_full_design')
}

const commands = {
  darwin: 'ioreg -rc AppleSmartBattery | grep Capacity',
  linux:
    'cat /sys/class/power_supply/BAT0/energy_full /sys/class/power_supply/BAT0/energy_full_design'
}

const parse = {
  darwin: function (output) {
    const original = output.match(/"DesignCapacity"=(\d+)/)[1]
    const now = output.match(/"Capacity"=(\d+)/)[1]
    return { now: parseInt(now), original: parseInt(original) }
  },
  linux: function (output) {
    const lines = output.match(/[^\n]+/g)
    return { now: parseInt(lines[0], 10), original: parseInt(lines[1], 10) }
  }
}

module.exports = { canRun, commands, parse }
