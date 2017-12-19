import test from 'ava'
import { parse } from './lib/battery'

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
