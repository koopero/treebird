module.exports = header

const _ = require('lodash')

const style = require('./style')

function header( opt ) {
  var result = ''
  if ( opt.type ) {
    result += style.type( _.padStart( opt.type, 16 ) )
    result += '  '
  }

  if ( opt.path ) {
    result += style.path( opt.path )
    result += '  '
  }

  return result
}
