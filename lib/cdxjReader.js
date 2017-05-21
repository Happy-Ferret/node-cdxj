const fs = require('fs-extra')
const Promise = require('bluebird')
const through2 = require('through2')
const bsplit = require('binary-split')
const untildify = require('untildify')
const CDXJEntry = require('./cdxjEntry')

class CDXJReader {
  static createReadStream (cdxjPath) {
    if (cdxjPath[0] === '~') {
      cdxjPath = untildify(cdxjPath)
    }
    return fs.createReadStream(cdxjPath)
      .pipe(bsplit())
      .pipe(through2.obj(function (line, encoding, next) {
        if (line !== null || line !== undefined) {
          this.push(new CDXJEntry(line))
        }
        next()
      }))
  }

  static readCDXJ (cdxjPath) {
    return new Promise((resolve, reject) => {
      let cdxEntries = []
      CDXJReader.createReadStream(cdxjPath)
        .on('data', entry => {
          cdxEntries.push(entry)
        })
        .on('end', () => {
          resolve(cdxEntries)
        })
    })
  }
}

module.exports = CDXJReader
