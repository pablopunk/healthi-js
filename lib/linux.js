const { shellSync } = require('execa')

const command = 'upower -i /org/freedesktop/UPower/devices/battery_BAT0 ; upower -i /org/freedesktop/UPower/devices/battery_BAT1'

const canRun = () => shellSync('which upower').code === 0

const parse = (output) => {
  const original = output.match(/energy-full-design:\s*([0-9,]*)\s*Wh/)[1]
  const now = output.match(/energy-full:\s*([0-9,]*)\s*Wh/)[1]
  return { now: parseFloat(now.replace(',', '.')), original: parseFloat(original.replace(',', '.')) }
}

module.exports = {command, canRun, parse}
