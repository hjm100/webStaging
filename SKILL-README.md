## 技术依赖

1. node.js相关npm包

2. chalk 是一个颜色的插件。可以通过chalk.blue(‘hello world’)来改变颜色。

3. commander  npm install commander  一个帮助快速开发Nodejs命令行工具的package

###技术相关官方文档[主要技术说明：辅助技术下面逐步详解]

1. VUE             https://cn.vuejs.org/

2. node            http://nodejs.cn/

3. webpack         https://doc.webpack-china.org/

4. ECMAScript 6    http://es6.ruanyifeng.com/    (阮老师的ES6入门教程)

5. VUE开源         https://github.com/vuejs       (可以结合vue-cli学习)

### 快速开发Nodejs命令行工具 [commander的API]

1. Option(): 初始化自定义参数对象，设置“关键字”和“描述”

2. Command(): 初始化命令行参数对象，直接获得命令行输入

3. Command#command(): 定义一个命令名字

4. Command#action(): 注册一个callback函数

5. Command#option(): 定义参数，需要设置“关键字”和“描述”，关键字包括“简写”和“全写”两部分，以”,”,”|”,”空格”做分隔。

6. Command#parse(): 解析命令行参数argv

7. Command#description(): 设置description值

8. Command#usage(): 设置usage值

9. Command#alias：简写 sa (命令简写为sa 执行就是“cain sa”)


### node 文件操作

1. 写入文件 fs.writeFile

2. 删除文件 fs.unlink

3. 修改文件名称 fs.rename

4. 查看文件状态 fs.stat

5. 判断文件是否存在fs.exists

6. 更多相关请访问：http://nodejs.cn/api/fs.html

### inquirer NodeJs 交互式命令行工具

1. inquirer 一个常见的交互式命令行用户界面集合。

2. Inquirer.js给用户提供了一个漂亮的界面和提出问题流的方式

3. 安装: npm install inquirer

4. 编写一个小demo [你可以通过node app.js运行一下看看效果]

```
var inquirer = require('inquirer')
inquirer.prompt([
  {
    type: 'confirm',
    name: 'test',
    message: 'Are you handsome?',
    default: true
  }
]).then((answers) => {
  console.log('结果为:')
  console.log(answers)
})
```
5. Questions —— 问题 在回答完成后会返回一个Promise对象，在其then方法中可以获取到用户输入的所有回答。

6. 问题参数api如下所示：

```
{
  type: String, // 表示提问的类型，下文会单独解释
  name: String, // 在最后获取到的answers回答对象中，作为当前这个问题的键
  message: String|Function, // 打印出来的问题标题，如果为函数的话
  default: String|Number|Array|Function, // 用户不输入回答时，问题的默认值。或者使用函数来return一个默认值。假如为函数时，函数第一个参数为当前问题的输入答案。
  choices: Array|Function, // 给出一个选择的列表，假如是一个函数的话，第一个参数为当前问题的输入答案。为数组时，数组的每个元素可以为基本类型中的值。
  validate: Function, // 接受用户输入，并且当值合法时，函数返回true。当函数返回false时，一个默认的错误信息会被提供给用户。
  filter: Function, // 接受用户输入并且将值转化后返回填充入最后的answers对象内。
  when: Function|Boolean, // 接受当前用户输入的answers对象，并且通过返回true或者false来决定是否当前的问题应该去问。也可以是简单类型的值。
  pageSize: Number, // 改变渲染list,rawlist,expand或者checkbox时的行数的长度。
}
```
7. 其中，default, choices, validate, filter, when等函数都能被异步调用。同时返回一个promise或者通过使用this.async()函数来进行回调获取最终值。

8. 更多相关请访问：https://juejin.im/entry/5937c73cac502e0068cf1171

### path路径处理 (处理POSIX 与Windows上的路径区别)

1. path 模块提供了一些工具函数，用于处理文件与目录的路径

2. path 模块的默认操作会根据 Node.js 应用程序运行的操作系统的不同而变化。

3. 在 POSIX 上: path.basename('C:\\temp\\myfile.html');   // 返回: 'C:\\temp\\myfile.html'

4. 在 Windows 上: path.basename('C:\\temp\\myfile.html');  // 返回: 'myfile.html'

5. 更多相关请访问：http://nodejs.cn/api/path.html

----------------------------------------------------------

## 配置文件解析

1. rc结尾的文件通常代表运行时自动加载的文件，配置等等

2. .bowerrc文件：指定了将包安装到何处

3. .babelrc文件：这个文件是用来设置转码的规则和插件的 || 如果想使用es6语法，必须安装插件

4. postcss.config文件： 使用 PostCSS 进行 CSS 处理，配合webpack使用

5. .gitignore git是不允许提交一个空的目录到版本库上的,可以在空的文件夹里面建立一个.gitignore文件，然后提交去即可。

6. 在js文件的开头添加 "use strict"; 表示严格模式  即：v = 1; // 报错，v未声明;

7. 在style标签中写入scoped [<style scoped> 表示css样式只在当前页面中有效]

8. __dirname变量获得当前文件所在目录的完整目录名：

9. __filename变量获取当前模块文件的带有完整绝对路径的文件名
--------------------------------------------------------------

## 其他操作

1. rimraf 模块用来删除文件

2. [一般我们想要删除node_modules的时候很苦恼，你可以在全局安装这个npm包，使用命令行来快速删除node_modules]