const spaceBuffer = Buffer.from('20', 'hex')

module.exports = class CDXJEntry {
  constructor (linebuf) {
    let fspace = linebuf.indexOf(spaceBuffer)
    let lspace = linebuf.lastIndexOf(spaceBuffer)
    this._surtb = linebuf.slice(0, fspace)
    this._surt = null
    this._surtDidConvert = false
    this._dtb = linebuf.slice(fspace + 1, lspace - 1)
    this._dt = null
    this._dtDidConvert = false
    this._jsonb = linebuf.slice(lspace)
    this._json = null
    this._jsonDidConvert = false
  }

  get surt () {
    if (!this._surtDidConvert) {
      this._surtDidConvert = true
      this._surt = this._surtb.toString('utf8')
    }
    return this._surt
  }

  get dt () {
    if (!this._dtDidConvert) {
      this._dtDidConvert = true
      this._dt = this._dtb.toString('utf8')
    }
    return this._dt
  }

  get json () {
    if (!this._jsonDidConvert) {
      this._jsonDidConvert = true
      this._json = JSON.parse(this._jsonb.toString('utf8'))
    }
    return this._json
  }
}
