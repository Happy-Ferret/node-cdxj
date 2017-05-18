# node-cdxj
Currently this project only supports reading cdxj files

## Example usage

```js
const readCDXJ = require('cdxj')

async function getMeSomeCDXJ () {
  let cdxj = await readCDXJ('<path-to-cdxj-file>')
  cdxj.forEach(cdxjEntry => {
     console.log(`The URL in surt form for this entry is: ${cdxjEntry.surt}`)
     console.log(`The raw datetime for this entry is: ${cdxjEntry.dt}`)
     console.log(`The json data for this entry is: ${cdxjEntry.json}`)
  })
}

```

## API

#### readCDXJ([path-to-cdxj-file])

Returns a Promise that resolves with an array of CDXJEntrys
or rejects if an error occurred

#### CDXJEntry
Properties
- `surt`: returns the CDXJEntries URL key in surt form
- `dt`: returns the raw (string) datetime associated with the CDXJEntry
- `json`: returns the parsed JSON data associated with the CDXJEntry

The properties are lazily transformed to their appropriate values the first time
the getter for a property is called. Internally they are kept as a raw [Buffer](https://nodejs.org/api/buffer.html)