import test from 'ava'
import shell from 'shelljs'
import health from '../dist/index'

test('check battery health range', async t => {
  health(battery => {
    t.true(battery.health >= 0 && battery.health <= 100)
  })
})

const command = 'ioreg'

test('check command to exist', async t => {
  t.true(Boolean(shell.which(command)))
})
