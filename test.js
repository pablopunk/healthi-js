const os = require('os')
const test = require('myass')
const { canRun, parse } = require('./lib/battery')

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

test('parses values on mac with spaces', async t => {
  const { now, original } = parse.darwin(`"AppleRawCurrentCapacity" = 2151
      "LegacyBatteryInfo" = {"Amperage"=18446744073709550878,"Flags"=4,"Capacity" = 5601,"Current"=2151,"Voltage"=11397,"Cycle Count"=620}
      "DesignCapacity" = 6559
"QmaxCell2"=1048,"QmaxCell0"=54551,"CycleCount"=620,"DesignCapacity" = 6559}`)
  t.is(now, 5601)
  t.is(original, 6559)
})

test('parses values on linux', async t => {
  const { now, original } = parse.linux(`
  native-path:          BAT1
  vendor:               GIGABYTE
  model:                Aero 14 V7
  power supply:         yes
  updated:              Mér 16 Xan 2019 20:13:19 CET (40 seconds ago)
  has history:          yes
  has statistics:       yes
  battery
    present:             yes
    rechargeable:        yes
    state:               fully-charged
    warning-level:       none
    energy:              94,24 Wh
    energy-empty:        0 Wh
    energy-full:         94,01 Wh
    energy-full-design:  94,24 Wh
    energy-rate:         0 W
    voltage:             16,686 V
    percentage:          100%
    capacity:            100%
    technology:          lithium-ion
    icon-name:          'battery-full-charged-symbolic'
  `)
  t.is(now, 94.01)
  t.is(original, 94.24)
})

test('can run on platform', async t => {
  if (os.platform() === 'Darwin') { // linux fails on travis
    t.true(canRun[os.platform()]())
  }
})
