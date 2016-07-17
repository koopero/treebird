const _ = require('lodash')

const format = require('./format')
    , style = require('./style')
    , options = require('./options')
    , header = require('./header')

exports.log = function ( data, opt ) {
  opt = options( arguments )
  opt.width = parseInt( opt.width ) || process.stdout.columns

  var result = header( opt )
  if ( result && !opt.indent )
    opt.indent = '  '

  result += format( data, opt )
  process.stdout.write( result )
}


exports.error = function ( error ) {
  console.error( style.error( String( error ) ) )
}
