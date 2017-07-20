# node-cdxj
Read cdxj files produced by [Pywb](https://github.com/ikreymer/pywb) using node.js.

Run `npm install cdxj` or `yarn add cdxj` to get started

[![npm Package](https://img.shields.io/npm/v/cdxj.svg?style=flat-square)](https://www.npmjs.com/package/cdxj)

## Example usage

### Example 1
```js
const CDXJReader = require('cdxj')

async function getMeSomeCDXJ () {
  let cdxj = await CDXJReader.readCDXJ('<path-to-cdxj-file>')
  cdxj.forEach(cdxjEntry => {
     console.log(`The URL in surt form for this entry is: ${cdxjEntry.surt}`)
     console.log(`The raw datetime for this entry is: ${cdxjEntry.dt}`)
     console.log(`The json data for this entry is: ${cdxjEntry.json}`)
  })
}
```

### Example 2
```js
const CDXJReader = require('cdxj')

const cdxjStream = CDXJReader.createReadStream('<path-to-cdxj-file>')

cdxjStream.on('data', cdxjEntry => { 
  console.log(cdxjEntry) 
})
```

## API
Full API documentation available at [n0tan3rd.github.io/node-cdxj](https://n0tan3rd.github.io/node-cdxj/)


[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
