const chalk = require('chalk')

const style = {
  key: chalk.blue,
  delim: chalk.dim,
  boolean: chalk.yellow,
  int: chalk.yellow,
  float: chalk.red,
  string: chalk.white,
  function: chalk.magenta,
  empty: chalk.black,
  type: chalk.underline,
  path: chalk.magenta,
  longDelim: chalk.red,
  longString: chalk.grey,
  null: chalk.red,
  undefined: chalk.black,
  error: chalk.red,
  circular: chalk.red
}

module.exports = style
