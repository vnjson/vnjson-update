const fs = require('fs')
const YAML  = require('yaml')
const path = require('path')
const updateVnjson = require('../index.js')


const config = YAML.parse(fs.readFileSync(path.resolve(process.cwd()+'/config.yaml'), 'utf8'))

updateVnjson(path.resolve(config.src))

