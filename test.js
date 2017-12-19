import { existsSync } from 'fs'
import test from 'ava'
import { shellSync } from 'execa'
import { canRun, parse } from './lib/battery'

test('parses values on mac', async t => {
  const { now, original } = parse.darwin(`5000
    5000
    NaN
    6000`)
  t.is(now, 5000)
  t.is(original, 6000)
})

test('parses values on linux', async t => {
  const { now, original } = parse.linux(`5000
    6000`)
  t.is(now, 5000)
  t.is(original, 6000)
})

test('can run on platform', async t => {
  if (existsSync('/sys/class/power_supply/BAT0/energy_full_design')) {
    t.true(canRun.linux())
  } else {
    const { code } = await shellSync('which ioreg')
    if (code === 0) {
      t.true(canRun.darwin())
    } else {
      t.pass()
    }
  }
})
