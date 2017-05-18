const fs = require('fs-extra')
const Promise = require('bluebird')
const bsplit = require('binary-split')
const CdxjEntry = require('./lib/cdxjEntry')

module.export = function readCdxj (path) {
  return new Promise((resolve, reject) => {
    let cdxEntries = []
    fs.createReadStream(path)
      .pipe(bsplit())
      .on('data', line => {
        cdxEntries.push(new CdxjEntry(line))
      })
      .on('end', () => {
        resolve(cdxEntries)
      })
  })
}