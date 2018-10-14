const os = require('os')
const execa = require('execa')
const { canRun, parse, commands } = require('./lib/battery')

async function getBattery (os) {
  if (!(os in commands)) {
    throw new Error(`OS not supported (${os})`)
  }

  if (!canRun[os]()) {
    return {
      now: 100,
      original: 100
    }
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
