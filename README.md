# healthi.js

<p align="center">
  <a href="https://www.npmjs.com/package/healthi"><img src="https://img.shields.io/npm/dt/healthi.svg" alt="Downloads" /></a>
  <a href="https://github.com/feross/standard"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Code Style" /></a>
  <a href="https://travis-ci.org/pablopunk/healthi-js"><img src="https://travis-ci.org/pablopunk/healthi-js.svg?branch=master" alt="Build Status" /></a>
  <p align="center">Simple module to get your Macbook's battery health</p>
</p>

## Example

```javascript
var health = require('healthi')

health(function(battery){
  console.log(battery.currentCapacity) // current mAh
  console.log(battery.originalCapacity) // original mAh
  console.log(battery.health) // health %
})
```

### Contribute

Feel free to open an issue or a pull request

```shell
npm run build # transpile code from src/ to bin/
npm run test  # run tests
```
