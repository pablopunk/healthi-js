const os = require('os')
const execa = require('execa')
const { canRun, parse, command } = require('./lib/battery')

function getBattery (os) {
  if (!(os in command)) {
    throw new Error(`OS not supported (${os})`)
  }

  if (!canRun[os]()) {
    return new Promise((resolve, reject) => resolve({}))
  }

  return execa.shell(command[os])
    .then(({ code, stdout, stderr }) => {
      if (code) {
        throw new Error(stderr)
      }

      return parse[os](stdout)
    })
}

const get = () =>
  getBattery(os.platform())
    .then(({ now, original }) => ({now, original, health: now * 100 / original}))

module.exports = get
