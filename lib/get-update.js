const fs = require('fs-extra')
const request = require('request')
const extractZIP = require('extract-zip')
const path = require('path')


const URL = 'https://github.com/vnjson/mcap/archive/refs/heads/main.zip'
const NAME = 'vnjson.zip'



function getUpdate(outputDir){
    let src = path.resolve(outputDir+'/'+NAME)
    let extractDir = path.resolve(outputDir)

    return new Promise((resolve, reject)=>{
          request(URL)
            .pipe(fs.createWriteStream(src))
            .on('close', async function () {
                console.log('[ download ] '+URL)
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



module.exports = getUpdate