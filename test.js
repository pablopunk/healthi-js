import os from 'os'
import { existsSync } from 'fs'
import test from 'ava'
import { shellSync } from 'execa'
import { canRun, parse } from './lib/battery'

test('parses values on mac', async t => {
  const { now, original } = parse.darwin(`"AppleRawCurrentCapacity" = 2151
      "AppleRawMaxCapacity" = 5601
      "MaxCapacity" = 5601
      "CurrentCapacity" = 2151
      "LegacyBatteryInfo" = {"Amperage"=18446744073709550878,"Flags"=4,"Capacity"=5601,"Cu
rrent"=2151,"Voltage"=11397,"Cycle Count"=620}
      "DesignCapacity" = 6559
      "BatteryData" = {"StateOfCharge"=9984,"Voltage"=11397,"QmaxCell1"=6936,"ResScale"=0,
"QmaxCell2"=1048,"QmaxCell0"=54551,"CycleCount"=620,"DesignCapacity"=6559}`)
  t.is(now, 5601)
  t.is(original, 6559)
})

test('parses values on linux', async t => {
  const { now, original } = parse.linux(`5000
    6000`)
  t.is(now, 5000)
  t.is(original, 6000)
})

test('can run on platform', async t => {
  switch (os.platform()) {
    case 'darwin': {
      const { code } = shellSync('which ioreg')

      if (code === 0) {
        t.true(canRun.darwin())
      } else {
        t.pass()
      }
      break
    }
    case 'linux': {
      if (existsSync('/sys/class/power_supply/BAT0/energy_full_design')) {
        t.true(canRun.linux())
      } else {
        t.pass()
      }
      break
    }
    default: {
      t.pass()
    }
  }
})
