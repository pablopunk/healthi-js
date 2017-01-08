import exec from 'child_process'

function get(callback) {
  exec('ioreg -l | grep Capacity | cut -d\' \' -f19', (error, stdout) => {
    if (error !== null) {
      console.log('exec error: ' + error)
      return null
    }

    const lines = stdout.match(/[^\r\n]+/g)
    const capacityNow = parseInt(lines[0], 10)
    const capacityOriginal = parseInt(lines[3], 10)
    const health = (capacityNow * 100) / capacityOriginal
    callback(health)
  })
}

module.exports = get
