const fs = require('fs-extra');
const path = require('path');
const readDir = require('./lib/read-dir.js')
const getUpdate = require('./lib/get-update.js');
const overwrite = require('./lib/overwrite.js');
const YAML  = require('yaml')


const config = YAML.parse(fs.readFileSync(path.resolve(process.cwd()+'/config.yaml'), 'utf8'))

updateVnjson(config);





async function updateVnjson(configGlobal){
  
  const config = {
      url: configGlobal.updateSrc?.url||'https://github.com/vnjson/mcap/archive/refs/heads/main.zip',
      zip: '.vnjson',
      update: '.vnjson/' + configGlobal.updateSrc?.dir||'mcap-main',
      local: 'src'
  }

  await getUpdate(config);
  console.log('[ extract zip ]');


  const _update = await readDir(config.update);

  const dirs = configGlobal.updateDirs||['src'];

  for (const localDir of dirs) {
        await overwrite(_update, config.update, localDir );
        console.log(`[ + ] ${localDir}`);
  }
  fs.remove(config.zip);
  console.log('Обновление установлено');
}



