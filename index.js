const fs = require('fs-extra')
const diff = require('diff-arrays-of-objects');
const path = require('path')
const getHash = require('./lib/get-hash.js')
const getUpdate = require('./lib/get-update.js')



//const original = require('./db/original.json')

async function updateVnjson(config){
  //  fs.remove(extractDir, ()=>{})
  await getUpdate(config.zip)
  console.log('[ extract zip ]')

  

  let update = await getHash(config.update)
  let local = await getHash( config.local)
  //fs.writeJSON(path.resolve(config.zip+'/update.json' ), update, { spaces: 2 } )
  let result = diff(update, local, 'hash')
  //fs.writeJSON(path.resolve(config.zip+'/local-change.json' ), result, { spaces: 2 } )
  console.log('update-change')
  console.log(result.removed)
  console.log('local-change')
  console.log(result.added)
}


module.exports = updateVnjson
//
/*
added:
changed:
deprecated:
removed:
fixed
 */

