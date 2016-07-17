const format = require('./src/format')
    , output = require('./src/output')

const treebird = function treebird() {
  return output.log.apply( null, arguments )
}

treebird.format = format


module.exports = treebird
