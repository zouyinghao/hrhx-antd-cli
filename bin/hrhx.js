#!/usr/bin/env node

// 引入 commander 库
const program = require('commander')
// 定义 -v 查看版本号（同步 package.json 中的版本号）
program.version(require('../package.json').version)

program
    // 定制命令行
    .command('create <project-name>')
    // 定制命令行说明
    .description('create project [create 创建项目]')
    // 定制命令行做什么
    .action(require('../lib/create'))

program.parse(process.argv)
