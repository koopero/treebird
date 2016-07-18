const treebird = require('../index')

const longData = require('./loopin.json')

const shortData = {
  'Hello': 'world',
  'foo': 2
}

var path = 'foo/path/'

// treebird( longData, 'longData', path )
treebird( shortData, 'shortData', path )
