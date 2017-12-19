# healthi.js

<p align="center">
  <a href="https://www.npmjs.com/package/healthi"><img src="https://img.shields.io/npm/dt/healthi.svg" alt="Downloads" /></a>
  <a href="https://github.com/feross/standard"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Code Style" /></a>
  <a href="https://travis-ci.org/pablopunk/healthi-js"><img src="https://travis-ci.org/pablopunk/healthi-js.svg?branch=master" alt="Build Status" /></a>
  <p align="center">Simple module to get your PC's battery health</p>
</p>

## Install

Right now it supports mac and linux:

```sh
npm install healthi
```

## Usage

_Healthi_ works with promises since [version 2.0.0](https://github.com/pablopunk/healthi-js/releases/tag/2.0.0):

#### Example 1: await

```javascript
const health = require('healthi')
const battery = await health()
console.log(battery.health) //=> 90.76078670529044
```

#### Example 2: then

```javascript
const health = require('healthi')
health()
.then(console.log) //=> { currentCapacity: 5953,  originalCapacity: 6559,  health: 90.76078670529044 }
.catch(console.log)
```

## Result

The `battery` object has 3 attributes:

```js
{
  currentCapacity  // Example: 5953 mAh
  originalCapacity // Example: 6559 mAh
  health           // Example: 90.7 % (this is the current capacity compared to the original one)
}
```

## Contribute

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Feel free to open an issue or a pull request

## Author

| ![me](https://www.gravatar.com/avatar/fa50aeff0ddd6e63273a068b04353d9d?s=100) |
| ----------------------------------------------------------------------------- |
| © 2017 [Pablo Varela](https://twitter.com/pablopunk)                          |
