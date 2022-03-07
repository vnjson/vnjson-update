const fs = require('fs-extra');
const path = require('path');
const normalize = require('normalize-path');
const { exec } = require('child_process');

async function compare (_update, config){



      for(let item of _update){
          let src = path.resolve( path.join(config.update, '../', item.file) )
          let dest = path.join( config.local,  item.file)

          try{
              await fs.copy(src, dest, { overwrite: true, errorOnExist: true })
              //console.log('[ updated ] '+normalize(dest))
          }
          catch(e){
              console.error('Не удалось перезаписать файл', e)
          }
      }

    fs.remove(config.zip)
    await install(config.local);
    console.log('[+] Обновление установлено')



}

module.exports = compare



function install(localProject){
return new Promise((resolve, reject)=>{
      exec(`cd ${localProject} | npm install`, (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          return;
        }
        resolve()
      });

  })

}