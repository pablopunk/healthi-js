const execa = require('execa')

const command = 'ioreg'
const options = ' -l | grep Capacity | cut -d\' \' -f19'

const commandExists = async command => {
  const { code } = await execa.shell(`which ${command}`)
  return code === 0
}

const get = async () => {
  if (!commandExists(command)) {
    throw new Error(`${command} command does not exist`)
  }

  const {code, stdout, stderr} = await execa.shell(command + options)

  if (code) {
    throw new Error(stderr)
  }

  const lines = stdout.match(/[^\n]+/g)
  if (lines === null) {
    throw new Error(`error parsing "${stdout}"`)
  }

  const capacityNow = parseInt(lines[0], 10)
  const capacityOriginal = parseInt(lines[3], 10)
  return {
    currentCapacity: capacityNow,
    originalCapacity: capacityOriginal,
    health: (capacityNow * 100) / capacityOriginal
  }
}

module.exports = get
