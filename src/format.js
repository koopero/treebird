module.exports = format

const _ = require('lodash')
    , stripAnsi = require('strip-ansi')
    , style = require('./style')

function format( data, opt ) {
  var width = opt.width

  if ( process.stdout.columns )
    width = process.stdout.columns

  var _circular = []
  var result = formatAnything( data, opt.indent, width )
  result = oneNewline( result )
  return result



  function formatAnything( data, indent, width ) {
    if ( data === undefined ) {
      return style.undefined( 'undefined' )
    } else if ( data === null ) {
      return style.null( 'null' )
    } else if ( _.isFunction( data ) ) {
      return formatFunction( data, indent, width )
    } else if ( _.isArray( data ) ) {
      return formatArray( data, indent, width )
    } else if ( _.isObject( data ) ) {
      return formatKeys( data, indent, width )
    } else if ( _.isNumber( data ) ) {
      return formatNumber( data )
    } else if ( _.isBoolean( data ) ) {
      return style.boolean( String(data) )
    } else if ( _.isString( data ) ) {
      return formatString( data, indent, width  )
    }
  }

  function formatFunction( func, index, width ) {
    return style.function('< function >')
  }

  function formatString( str, indent, width ) {
    if ( str.length == 0 ) {
      return style.empty("''")
    }

    var lines = str.split( /[\n]/ )

    if ( lines.length == 1 )
      return style.string( lines[0] )

    // if ( lines.length > )

    lines = lines.join( '\n'+indent )
    lines = style.longString( lines )

    return style.longDelim( '<<<' )
    +'\n'+indent
    +lines
    +style.longDelim( '>>>' )

  }

  function formatNumber( num ) {
    const isInt = num === Math.floor( num )
        , str = isInt ?
            style.int( num.toFixed(0) )
          : style.float( num.toFixed( opt.floatDigits ) )

    return str
  }

  function formatKeys( data, indent, width ) {
    if ( _circular.indexOf( data ) != -1 )
      return style.circular('<CIRCULAR>')

    _circular.push( data )

    var pairs = _.map( data, function ( value, key ) {
      var valueStr = formatAnything( value, indent + '  ', width - ( key.length + ': '.length ) )
        , keyStr = style.key(key)+style.delim(': ')
      var isMulti = valueStr.indexOf('\n') != -1

      return isMulti ?
        keyStr
        +valueStr
      : keyStr+valueStr
    })

    pairs = _.filter( pairs )
    if ( !pairs.length ) {
      _circular.pop()
      return style.empty( '{}' )
    }

    var pairsStrLen = pairs.reduce( function ( length, str ) {
      length = length || 0
      return length + stripAnsi( str ).length
    }, 0 )

    // delimiters
    pairsStrLen += ( pairs.length - 1 ) * 2 // ', '.length

    var canCompress = width && pairsStrLen < width
    var result

    if ( canCompress ) {
      result = style.delim('{ ')
      + pairs.join( style.delim(', ') )
      + style.delim(' }')
    } else {
      result = ''
      result += indent ? '\n'+indent : ''
      result += pairs.join('\n'+indent)

      while ( _.endsWith( result, '\n' ) )
        result = result.substr( 0, result.length - 1 )

      result += '\n'
    }

    _circular.pop()

    return result
  }

  function formatArray( data, indent, width ) {
    if ( _circular.indexOf( data ) != -1 )
      return style.circular('<CIRCULAR>')

    _circular.push( data )

    var canCompress = !!width

    var pairs = _.map( data, function ( v, k ) {
      var result = formatAnything(v, indent + '  ', width - ( ', '.length ) )
      if ( result.indexOf('\n') != -1 )
        canCompress = false

      return result
    })

    pairs = _.filter( pairs )
    if ( !pairs.length ) {
      _circular.pop()
      return style.empty( '[]' )
    }

    if ( canCompress ) {
      var pairsStrLen = pairs.reduce( function ( length, str ) {
        length = length || 0
        return length + stripAnsi( str ).length
      }, 0 )

      // delimiters
      pairsStrLen += ( pairs.length - 1 ) * 2 // ', '.length

      if ( pairsStrLen > width )
        canCompress = false
    }

    var result

    if ( canCompress ) {
      result = style.delim('[ ')
      + pairs.join( style.delim(', ') )
      + style.delim(' ]')
    } else {
      result = pairs
        .map( ( s ) => _.trimStart( s, '\n ' ) )
        .join('\n'+style.delim(indent+'- '))

      // console.log('RESULT', '{'+result+'}')
      result = ( indent ? '\n'+style.delim(indent+'- ') : '' ) + result
      result = oneNewline( result )
    }

    _circular.pop()

    return result
  }

}

function oneNewline( str ) {
  while ( _.endsWith( str, '\n' ) )
    str = str.substr( 0, str.length - 1 )

  str += '\n'
  return str
}
