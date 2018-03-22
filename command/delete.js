// 配置文件
const chalk = require('chalk')
const fs = require('fs')
const inquirer = require('inquirer')
const path = require('path')
const copyDir = require('copy-dir')
const del = require('del')

// 获取所有的项目路径
const allEventsConfig = require('../config/allEvents.json')
//获取当前项目路径
const currentNameConfig = require('../config/config.json')


module.exports = () => {
  const questions = [{
    type: 'list',
    name: 'names',
    message: '选取要删除的项目',
    choices: allEventsConfig.names
  }]

  inquirer.prompt(questions).then(function (answers) {
    // 修改配置信息
    let currentName = answers.names
    if (currentName === 'template') {
      console.log(chalk.red('无法删除模板项目'))
      return
    }
    if (currentName === currentNameConfig.eventName) {
      currentNameConfig.eventName = 'template'
      fs.writeFile(path.resolve(__dirname, '../config/config.json'), JSON.stringify(currentNameConfig, null, '\t'), 'utf-8', (err) => {
        if (err) console.log(chalk.red(err))
        console.log(chalk.green('当前项目切换为template'))
      })
    }
    let index = allEventsConfig.names.indexOf(currentName)
    allEventsConfig.names.splice(index, 1)
    fs.writeFile(path.resolve(__dirname, '../config/allEvents.json'), JSON.stringify(allEventsConfig, null, '\t'), 'utf-8', (err) => {
      if (err) console.log(chalk.red(err))
      console.log(chalk.green('删除' + currentName + '成功'))
    })

    del([path.resolve(__dirname, `../src/${currentName}`)])
    del([path.resolve(__dirname, `../dist/${currentName}`)])

  })
}
