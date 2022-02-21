const fs = require('fs-extra')
const diff = require('diff-arrays-of-objects');
const path = require('path')
const getHash = require('./lib/get-hash.js')
const getUpdate = require('./lib/get-update.js')
const compare = require('./lib/compare.js')

async function updateVnjson(localProject){

  const config = {
      url: 'https://github.com/vnjson/mcap/archive/refs/heads/main.zip',
      zip: '.vnjson',
      update: '.vnjson/mcap-main',
      local: localProject
  }
  await getUpdate(config)
  console.log('[ extract zip ]')


  const _update = await getHash(config.update)
  const _local = await getHash(config.local)

  compare(_update, _local, config)





}

module.exports = updateVnjson

