const fs = require('fs-extra');
const path = require('path');
const normalize = require('normalize-path');
const { exec } = require('child_process');

async function overwrite (_update, updateDir, localDir){
  return new Promise(async (resolve, reject)=>{
      for(const item of _update){
          const src = path.resolve( path.join(updateDir, item.file) );
          const newPathToFile = item.file.replace('src', localDir)
          const dest = path.join( path.resolve(localDir), '../',  newPathToFile);
          try{
              await fs.copy(src, dest, { overwrite: true, errorOnExist: false });
          }
          catch(e){
              console.error('Не удалось перезаписать файл', e);
              reject();
          }
      }


    install(localDir)
      .then(()=>{
          resolve();
      })
      .catch(e=>console.error(e))

  });  

}

module.exports = overwrite;



function install(localProject){
return new Promise((resolve, reject)=>{
      exec(`cd ${process.cwd()} | npm install`, (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          reject();
        }
        resolve()
      });

  })

}