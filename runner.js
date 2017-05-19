const readCDXJ = require('./index')

async function doIt () {
  const cdxj = await readCDXJ('/Users/jberlin/Documents/good_WAIL_ManagedCollections/collections/Wail/indexes/index.cdxj')
  cdxj.forEach(it => {
    console.log(it.surt)
  })
}

doIt().then(() => {

}).catch(error => {
  console.error(error)
})
