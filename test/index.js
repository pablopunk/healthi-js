import test from 'ava'
import shell from 'shelljs'
import health from '../bin/healthi'

test.cb('check battery health range', t => {
  t.plan(1)
  health(battery => {
    t.true(battery.health >= 0 && battery.health <= 100)
    t.end()
  })
})

const command = 'ioreg'

test('check command to exist', async t => {
  await t.true(Boolean(shell.which(command)))
})
