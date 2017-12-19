const os = require('os')
const execa = require('execa')

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

async function getBattery (os) {
  if (!(os in commands)) {
    throw new Error(`OS not supported (${os})`)
  }

  const { code, stdout, stderr } = await execa.shell(commands[os])
  if (code) {
    throw new Error(stderr)
  }

  return parse[os](stdout)
}

const get = async () => {
  const { now, original } = await getBattery(os.platform())

  return {
    now,
    original,
    health: now * 100 / original
  }
}

module.exports = get
