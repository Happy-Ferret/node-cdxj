const fs = require('fs-extra')
const Promise = require('bluebird')
const bsplit = require('binary-split')
const CDXJEntry = require('./lib/cdxjEntry')

module.exports = function readCDXJ (path) {
  return new Promise((resolve, reject) => {
    let cdxEntries = []
    fs.createReadStream(path)
      .pipe(bsplit())
      .on('data', line => {
        cdxEntries.push(new CDXJEntry(line))
      })
      .on('end', () => {
        resolve(cdxEntries)
      })
  })
}
