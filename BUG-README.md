# bug说明

#### 1. windows遇到'NODE_ENV' 不是内部或外部命令，也不是可运行的程序或批处理文件。

 1. 解决办法：
 1. 安装cross-env:npm install cross-env -D
 1. 在NODE_ENV=xxxxxxx前面添加cross-env就可以了