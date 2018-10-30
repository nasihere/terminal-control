# author-regex [![NPM version](https://badge.fury.io/js/author-regex.svg)](http://badge.fury.io/js/author-regex)


> Regular expression for parsing an `author` string into an object following npm conventions.

This the regex used by [parse-authors](https://github.com/jonschlinkert/parse-authors).


**Related**

 - [parse-author](https://github.com/jonschlinkert/parse-author)
 - [parse-authors](https://github.com/jonschlinkert/parse-authors)


## Install
#### Install with [npm](npmjs.org)

```bash
npm i author-regex --save
```
#### Install with [bower](https://github.com/bower/bower)

```bash
bower install author-regex --save
```

## Tests

Run

```bash
npm test
```

## Usage

```js
var re = require('author-regex');

function authors(str) {
  return re().exec(str);
}
console.log(author('Jon Schlinkert <foo@bar.com> (https://github.com/jonschlinkert)'));
```
Returns:

```js
[ 'Jon Schlinkert <foo@bar.com> (https://github.com/jonschlinkert)',
  'Jon Schlinkert',
  'foo@bar.com',
  'https://github.com/jonschlinkert',
  index: 0,
  input: 'Jon Schlinkert <foo@bar.com> (https://github.com/jonschlinkert)' ]
```

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on September 29, 2014._