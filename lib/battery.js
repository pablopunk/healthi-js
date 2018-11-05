
const mac = require('./mac')
const linux = require('./linux')

const platforms = {
  'darwin': mac,
  'linux': linux
}

let canRun = {}
let commands = {}
let parse = {}

for (const platform in platforms) {
  canRun[platform] = platforms[platform].canRun
  commands[platform] = platforms[platform].commands
  parse[platform] = platforms[platform].parse
}

module.exports = { canRun, commands, parse }
