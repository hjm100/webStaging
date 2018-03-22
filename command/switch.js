// 配置文件
const chalk = require('chalk')
const fs = require('fs')
const inquirer = require('inquirer')
const path = require('path')
const copyDir = require('copy-dir')

// 获取所有的项目路径
const allEventsConfig = require('../config/allEvents.json')
//获取当前项目路径
const currentNameConfig = require('../config/config.json')

module.exports = () => {
  const questions = [{
    type: 'list',
    name: 'names',
    message: '选取当前需要开发或者打包的项目',
    choices: allEventsConfig.names,
    default: currentNameConfig.eventName
  }]

  inquirer.prompt(questions).then(function (answers) {
    // 修改配置信息
    let currentName = answers.names
    currentNameConfig.eventName = currentName
    fs.writeFile(path.resolve(__dirname, '../config/config.json'), JSON.stringify(currentNameConfig, null, '\t'), 'utf-8', (err) => {
      if (err) console.log(chalk.red(err))
      console.log(chalk.green('当前项目已切换为' + currentName))
    })
  })
}
