import shell from 'shelljs'

function get(callback) {
  shell.exec('ioreg -l | grep Capacity | cut -d\' \' -f19', {silent: true}, (code, stdout, stderr) => {
    if (code) {
      console.log('exec error: ' + stderr)
      return null
    }

    const lines = stdout.match(/[^\n]+/g)
    const capacityNow = parseInt(lines[0], 10)
    const capacityOriginal = parseInt(lines[3], 10)
    const health = (capacityNow * 100) / capacityOriginal
    callback(health)
  })
}

module.exports = get
