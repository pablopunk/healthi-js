import shell from 'shelljs'

const command = 'ioreg'
const options = ' -l | grep Capacity | cut -d\' \' -f19'

const commandExists = command => {
  return shell.which(command)
}

const get = callback => {
  let battery = {
    currentCapacity: 0,
    originalCapacity: 0,
    health: 0
  }
  if (!commandExists(command)) {
    console.log(command + ' command does not exist')
    callback(battery)
    return
  }

  shell.exec(command + options, {silent: true}, (code, stdout, stderr) => {
    if (code) {
      console.log('exec error: ' + stderr)
      return null
    }

    const lines = stdout.match(/[^\n]+/g)
    if (lines === null) {
      console.log('error: ' + stdout)
      callback(battery)
      return
    }
    const capacityNow = parseInt(lines[0], 10)
    const capacityOriginal = parseInt(lines[3], 10)
    battery = {
      currentCapacity: capacityNow,
      originalCapacity: capacityOriginal,
      health: (capacityNow * 100) / capacityOriginal
    }
    callback(battery)
  })
}

module.exports = get
