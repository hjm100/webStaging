// 配置文件
const chalk = require('chalk')
const fs = require('fs')
const inquirer = require('inquirer')
const path = require('path')
const copyDir = require('copy-dir')

// 获取所有的项目路径
const allEventsConfig = require('../config/allEvents.json')


module.exports = () => {
  console.log('本命令为创建新项目')
  const questions = [{
    type: 'input',
    name: 'eventName',
    message: '项目名称',
    default: 'default'
  }]

  inquirer.prompt(questions).then(function (answers) {
    // 修改配置信息
    let eventName = answers.eventName
    copyDir(path.resolve(__dirname, '../src/template'), path.resolve(__dirname, `../src/${eventName}`), (err) => {
      if (err) {
        console.log(err)
      } else {
        allEventsConfig.names.push(eventName)
        fs.writeFile(path.resolve(__dirname, '../config/allEvents.json'), JSON.stringify(allEventsConfig, null, '\t'), 'utf-8', (err) => {
          if (err) console.log(chalk.red(err))
          console.log(chalk.green('项目创建成功!'))
        })
      }
    })
  })
}
