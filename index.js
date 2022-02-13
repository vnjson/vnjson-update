const fs = require('fs-extra')
const diff = require('diff-arrays-of-objects');
const path = require('path')
const getHash = require('./lib/get-hash.js')
const getUpdate = require('./lib/get-update.js')
const compare = require('./lib/compare.js')


//const original = require('./db/original.json')

async function updateVnjson(config){
  //  fs.remove(extractDir, ()=>{})
  await getUpdate(config)
  console.log('[ extract zip ]')

  
  const _update = await fs.readJson(config.update)
  const _local = await fs.readJson(config.local)

  //fs.writeJSON(path.resolve(config.zip+'/update.json' ), update, { spaces: 2 } )
  let existUpdate = diff(_update, _local, 'hash')
  if(existUpdate.removed.length===0){
    console.log('[+] Установлена последняя версия')
  }
  else{
    const _changes = await getHash( config.changes)
    compare (_update, _local, _changes)
  }
  //fs.writeJSON(path.resolve(config.zip+'/local-change.json' ), result, { spaces: 2 } )

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

