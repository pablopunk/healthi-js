const { shellSync } = require('execa')

const command = 'ioreg -rc AppleSmartBattery | grep Capacity'

const canRun = () => shellSync('which ioreg').code === 0

const parse = (output) => {
  const original = output.match(/"DesignCapacity"\s*=\s*(\d+)/)[1]
  const now = output.match(/"Capacity"\s*=\s*(\d+)/)[1]
  return { now: parseInt(now), original: parseInt(original) }
}

module.exports = {command, canRun, parse}
