const md5File = require('md5-file');
const path = require('path');
const normalize = require('normalize-path');
const walk = require('walk');

const hashStore = {};

module.exports = function (dir){
let collection = []
let options = {}
let walker = walk.walk(dir, options);

return new Promise((resolve, reject)=>{

    walker.on('file', function (root, stats, next) {
      let _scenes = !root.includes('scenes')
      let _public = !root.includes('public')
      let _vnjson = !root.includes('/.vnjson')
      let _node_modules = !root.includes('node_modules')
      let _git = !root.includes('.git')
      if(_scenes&&_public&&_vnjson&&_node_modules&&_git){
          let file = path.join(root, stats.name)
          let hash = md5File.sync(file)
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