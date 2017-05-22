/** @external {ReadableStream} https://nodejs.org/api/fs.html#fs_class_fs_readstream */
/** @ignore */
const fs = require('fs-extra')
/** @ignore */
const Promise = require('bluebird')
/** @ignore */
const through2 = require('through2')
/** @ignore */
const bsplit = require('binary-split')
/** @ignore */
const untildify = require('untildify')
const CDXJEntry = require('./cdxjEntry')

/**
 * @desc CDXJReader that provides two means to read a cdxj file
 * @example
 * const cdxjStream = CDXJReader.createReadStream('<path-to-cdxj-file>')
 * cdxjStream.on('data', cdxjEntry => { console.log(cdxjEntry) })
 */
class CDXJReader {
  /**
   * @desc Parse a cdxj file. Returns a Readable Stream which emits {@link CDXJEntry}s
   * @param {string} cdxjPath the path to the cdxj file to parse, supports ~ paths
   * @return {ReadableStream<CDXJEntry>}
   */
  static createReadStream (cdxjPath) {
    cdxjPath = untildify(cdxjPath)
    return fs.createReadStream(cdxjPath)
      .pipe(bsplit())
      .pipe(through2.obj(function (line, encoding, next) {
        if (line !== null || line !== undefined) {
          this.push(new CDXJEntry(line))
        }
        next()
      }))
  }

  /**
   * @desc Read a cdxj file in its entirety
   * @param {string} cdxjPath the path to the cdxj file to parse, supports ~ paths
   * @return {Promise<CDXJEntry[],Error>}
   */
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
