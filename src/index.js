import shell from 'shelljs'

const command = 'ioreg -l | grep Capacity | cut -d\' \' -f19'

function get(callback) {
  shell.exec(command, {silent: true}, (code, stdout, stderr) => {
    if (code) {
      console.log('exec error: ' + stderr)
      return {
        currentCapacity: 0,
        originalCapacity: 0,
        health: 0
      }
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

module.exports = get
