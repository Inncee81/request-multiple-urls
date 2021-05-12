# Request Multiple URLs
This is a package that takes a list (array) of URLs and returns their contents. It fetches the content (JSON data only) of each url and returns them in a Promise array. 

This package was developed using Typescript, and should therefore work in Javascript or Typescript projects. It should work for fetching data in browser, node, or React Native environments.

[Getting Started](#gettingstarted) |
[Development](#development) |
[Installation](#installation) |
[Usage ](#usage) | 
[Tests ](#tests)

## Getting started & Installation
Download and extract the package files to the appropriate location.

You can use Yarn or NPM. 

`npm install` to install dependencies.

```bash
$ cd request-multiple-urls
$ npm install
```

The Javascript code should already be present in the /lib directory. 
However, if needed, execute `npm run build` to transpile the Typescript code into Javascript code in the /lib directory.

## Development

- node >= v14 [![node](https://img.shields.io/badge/node-v14-blue.svg?cacheSeconds=2592000)](https://nodejs.org/en/download/)
- npm >= v6 [![npm](https://img.shields.io/badge/npm-v6.3.0-blue)](https://www.npmjs.com/get-npm)
---
- `npm run scan` to use snyk to check for any known and published package/dependency vulnerabilities. You may need an account and to authenticate for this.
- `npm run dev` - this package has ts-node-dev, should you need to run the Typescript code directly
- `npm run format` to tidy up the code with prettier
- `npm run lint` to analyse the code



## Usage

1. Import the package into where you intend to use the functionality in your project. You can use either the ES5 (require) or ES6 (import) syntax.

```js
const requestMultipleUrls = require("request-multiple-urls");
```

```js
import requestMultipleUrls from './request-multiple-urls';
```
2. Call requestMultipleUrls(urls), where urls is an array of URLs. 

Outside of any errors, this will return a promise (i.e. the result is thenable) containing an array of JSON objects being the content returned from the URLs.


```js
const urls = [
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json",
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json",
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json"
];

requestMultipleUrls(urls).then(urlContent => {
  console.log(JSON.stringify(urlContent, null, 4));
  
  urlContent.forEach(jsonContent => {
	  console.log(jsonContent)
  });
  
  // ...
}).catch((err) => {
	console.error(err)
});
```




## Tests

After installing dependencies, if you need to run tests, do so from the main directory of the package with either `npm test` or `npm run test`.

Jest is used for the testing in the package.


