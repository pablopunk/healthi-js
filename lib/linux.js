const { existsSync } = require('fs')

const command = 'cat /sys/class/power_supply/BAT1/voltage_now /sys/class/power_supply/BAT1/voltage_min_design'

const canRun = () => existsSync('/sys/class/power_supply/BAT1/voltage_now')

const parse = (output) => {
  const lines = output.match(/[^\n]+/g)
  return { now: parseInt(lines[0], 10), original: parseInt(lines[1], 10) }
}

module.exports = {command, canRun, parse}
