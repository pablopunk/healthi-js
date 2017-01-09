# healthi.js

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Build Status](https://travis-ci.org/pablopunk/healthi.js.svg?branch=master)](https://travis-ci.org/pablopunk/healthi.js)


*Simple module to get your Macbook's battery health*

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

### Build

```shell
npm run build
```
