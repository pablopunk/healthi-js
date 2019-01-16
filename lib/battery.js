
const mac = require('./mac')
const linux = require('./linux')

const platforms = {
  'darwin': mac,
  'linux': linux
}

let canRun = {}
let command = {}
let parse = {}

for (const platform in platforms) {
  canRun[platform] = platforms[platform].canRun
  command[platform] = platforms[platform].command
  parse[platform] = platforms[platform].parse
}

module.exports = { canRun, command, parse }
