const fs = require('fs-extra');
const path = require('path');
const readDir = require('./lib/read-dir.js')
const getUpdate = require('./lib/get-update.js');
const overwrite = require('./lib/overwrite.js');

async function updateVnjson(localProject){
  const config = {
      url: 'https://github.com/vnjson/mcap/archive/refs/heads/main.zip',
      zip: '.vnjson',
      update: '.vnjson/mcap-main',
      local: localProject
  }
  await getUpdate(config)
  console.log('[ extract zip ]')


  const _update = await readDir(config.update);


  overwrite(_update,  config);





}

module.exports = updateVnjson

