import test from 'ava'
import execa from 'execa'
import health from '..'

test('check battery health range', async t => {
  await health()
  .then(battery => {
    t.true(battery.health >= 0 && battery.health <= 100)
  })
  .catch(err => {
    if (err.message === 'error parsing ""') { // this can happen in TravisCI
      t.pass()
    } else {
      console.log(err)
      t.fail()
    }
  })
})

const command = 'ioreg'

test('check command to exist', async t => {
  await execa.shell(`which ${command}`)
    .then(({ code }) => t.is(code, 0))
})
