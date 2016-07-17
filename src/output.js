const format = require('./format')
    , style = require('./style')
    , options = require('./options')

exports.log = function ( data, opt ) {
  opt = options( opt )
  opt.width = parseInt( opt.width ) || process.stdout.columns
  process.stdout.write( format( data, opt ) )
}


exports.error = function ( error ) {
  console.error( style.error( String( error ) ) )
}
