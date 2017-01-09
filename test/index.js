import test from 'ava'
import health from '../dist/index'

test('check battery health range', async t => {
  health(battery => {
    t.true(battery.health >= 0 && battery.health <= 100)
  })
})

