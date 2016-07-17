module.exports = header

const _ = require('lodash')

const style = require('./style')

function header( opt ) {
  if ( !opt.path && !opt.type )
    return ''

  var result = ''
  result += style.type( _.padStart( opt.type, 16 ) )
  result += '  '
  result += style.path( opt.path )
  result += '  '

  return result
}
