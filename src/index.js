import shell from 'shelljs'

const command = 'ioreg'
const options = ' -l | grep Capacity | cut -d\' \' -f19'

function get(callback) {
  if (!commandExists(command)) {
    console.log(command + ' command does not exist')
    return {
      currentCapacity: 0,
      originalCapacity: 0,
      health: 0
    }
  }

  shell.exec(command + options, {silent: true}, (code, stdout, stderr) => {
    if (code) {
      console.log('exec error: ' + stderr)
      return null
    }

    const lines = stdout.match(/[^\n]+/g)
    const capacityNow = parseInt(lines[0], 10)
    const capacityOriginal = parseInt(lines[3], 10)

    callback({
      currentCapacity: capacityNow,
      originalCapacity: capacityOriginal,
      health: (capacityNow * 100) / capacityOriginal
    })
  })
}

function commandExists(command) {
  return shell.which(command)
}

module.exports = get

