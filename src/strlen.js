const stripAnsi = require('strip-ansi')

module.exports = function strlen( str ) {
  return stripAnsi( str ).length
}
