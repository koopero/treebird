const treebird = require('../index')

const data = {
  'Undefined': undefined,
  'Function': (a) => a
}

data['Circular'] = data

treebird( data )
