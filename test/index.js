import test from 'ava'
import shell from 'shelljs'
import health from '..'

test('check battery health range', async t => {
  health()
  .then(battery => {
    t.true(battery.health >= 0 && battery.health <= 100)
  })
  .catch(err => {
    if (err.message === 'error parsing ""') { // this can happen in TravisCI
      t.pass()
    } else {
      t.fail()
    }
  })
})

const command = 'ioreg'

test('check command to exist', async t => {
  await t.true(Boolean(shell.which(command)))
})
