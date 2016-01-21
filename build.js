var childProcess = require('child_process')
var crypto = require('crypto')
var fs = require('fs')

childProcess.execSync('rm -Rf build')

childProcess.execSync('node_modules/.bin/webpack --config webpack.config.js --bail')

childProcess.execSync('cp src/index.html build')

var cssHash = crypto.createHash('md5').update(fs.readFileSync('build/frl.css')).digest('hex')
var jsHash = crypto.createHash('md5').update(fs.readFileSync('build/frl.js')).digest('hex')

var data = fs.readFileSync('build/index.html')
var replaced = data.toString().trim().replace('/frl.css', '/frl.css?' + cssHash).replace('/frl.js', '/frl.js?' + jsHash)

fs.writeFileSync('build/index.html', replaced)
