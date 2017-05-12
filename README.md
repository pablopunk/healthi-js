# healthi.js

<p align="center">
  <a href="https://www.npmjs.com/package/healthi"><img src="https://img.shields.io/npm/dt/healthi.svg" alt="Downloads" /></a>
  <a href="https://github.com/feross/standard"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Code Style" /></a>
  <a href="https://travis-ci.org/pablopunk/healthi-js"><img src="https://travis-ci.org/pablopunk/healthi-js.svg?branch=master" alt="Build Status" /></a>
  <p align="center">Simple module to get your Macbook's battery health</p>
</p>

## Usage

Healhi works with promises since [version 2.0.0](https://github.com/pablopunk/healthi-js/releases/tag/2.0.0):

##### Example 1: await

```javascript
const health = require('healthi')
const battery = await health()
console.log(battery.health)
```

#### Example 2: then

```javascript
const health = require('healthi')
health().then(battery => {
  console.log(battery.health)
}).catch(err => {
  console.log(`Error: ${err.message}`)
})
```

### Contribute

Feel free to open an issue or a pull request

### Author

© 2017 [Pablo Varela](https://twitter.com/pablopunk)