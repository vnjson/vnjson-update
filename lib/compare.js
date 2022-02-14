const fs = require('fs-extra')
const diff = require('diff-arrays-of-objects');
const path = require('path')
const normalize = require('normalize-path');
const { exec } = require('child_process');
async function compare (_update, _local, config){

  let changes = diff(_update, _local, 'hash').removed

  if(changes.length>0){
      for(let item of changes){
          let src = path.resolve(config.update+'/'+item.file)
          let dest = path.resolve(path.join('../', config.local, item.file) )

          try{
              await fs.copy(src, dest, { overwrite: true, errorOnExist: true })
              console.log('[ updated ] '+normalize(dest))
          }
          catch(e){
              console.error('Не удалось перезаписать файл', e)
          }
      }

    
    let package = changes.find(item=>item.file.includes('package.json'))
    if(package){
      await install(config.local)
    }
    console.log('[+] Обновление установлено')
  }
  else{
    console.log('Установлена последняя версия')
  }
  fs.remove(config.zip)
}

module.exports = compare



function install(localProject){
return new Promise((resolve, reject)=>{
      exec(`cd ${localProject} | npm install`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        resolve()
      });

  })

}