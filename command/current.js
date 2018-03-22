const config = require('../config/config.json')
const chalk = require('chalk')




module.exports = () => {
    console.log('当前项目是')
  console.log(chalk.yellow(config.eventName))
}
