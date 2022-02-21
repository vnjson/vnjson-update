
const path = require('path');
const normalize = require('normalize-path');
const walk = require('walk');
const crypto = require('crypto');
const fs = require('fs');

const hashStore = {};

module.exports = function (dir){

let collection = []
let options = {}
let walker = walk.walk(dir, options);

return new Promise((resolve, reject)=>{

    walker.on('file', async function (root, stats, next) {
      let file = path.join(root, stats.name)

      let _scenes = !file.includes('scenes')
      let _public =!file.includes('public')
      let _theme =!file.includes('theme.css')
      let _vnjson = !file.includes('/.vnjson')
      let _node_modules = !file.includes('node_modules')
      let _git = !file.includes('.git')
      if(_scenes&&_public&&_vnjson&&_node_modules&&_git&&_theme){
         
                  console.log(file)
        
          let hash = await getHash(file)
          let nFile = normalize(file).split( normalize(dir))
          nFile.shift()

          let obj = { hash, file: nFile.join('/') }
          collection.push(obj)
      }
      next();
    });

    walker.on('errors', function (root, nodeStatsArray, next) {
      next();
    });

    walker.on('end', function () {
        resolve(collection)
    });
 })




}


function getHash (file){
  return new Promise((resolve, reject)=>{
    try{
        const fileBuffer = fs.readFileSync(file);
        const hashSum = crypto.createHash('sha256');
        hashSum.update(fileBuffer);
        const hash = hashSum.digest('hex');
        resolve(hash)
    }
    catch(e){
      reject(e)
    }

  })
}