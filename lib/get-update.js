const fs = require('fs-extra')
const request = require('request')
const extractZIP = require('extract-zip')
const path = require('path')






async function getUpdate(config){

    let NAME = 'vnjson.zip'
    let src = path.resolve(config.zip+'/'+NAME);
    let extractDir = path.resolve(config.zip);
    if(await fs.exists(extractDir)){
      await fs.remove(config.zip);
    }
    await fs.mkdir(extractDir)
    return new Promise((resolve, reject)=>{
          request(config.url)
            .pipe(fs.createWriteStream(src))
            .on('close', async function () {
                console.log('[ download ] '+config.url)
                try {
                  await extractZIP(src, { dir: extractDir })
                  resolve()
                }
                catch (e){
                  console.error(e)
                  reject()
                }
                
            }) 
    }) 
}



module.exports = getUpdate;