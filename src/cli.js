const getStdin = require('get-stdin')
    , yaml = require('js-yaml')
    , fs = require('fs')
    , ArgumentParser = require('argparse').ArgumentParser

const output = require('./output')
    , pkg = require('../package')

const parser = new ArgumentParser( {
  version: pkg.version,
  addHelp: true,
  description: 'Log YAML/JSON'
})

parser.addArgument(
  'file',
  {
    help: 'Load from file',
    nargs: '?'
  }
)

var opt = parser.parseArgs()

getStdin()
.then( function ( stdin ) {
  var data

  if ( stdin && opt.file ) {
    throw new Error( 'Both stdin and file provided.')
  } else if ( opt.file ) {
    data = fs.readFileSync( opt.file, 'utf8' )
  } else if ( stdin ) {
    data = stdin
  }

  data = yaml.safeLoad( data )
  opt = {

  }
  output.log( data, opt )
})
.catch( function ( err ) {
  output.error( err )
  process.exit( 1 )
})
