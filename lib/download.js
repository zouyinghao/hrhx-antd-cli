// 克隆
const { promisify } = require('util')

module.exports.clone = async function (repo, desc){
    const download = promisify(require('download-git-repo'))
    const ora = require('ora')
    // 进度条
    const process = ora(`正在为您创建 ${desc} 项目，请稍等 ......`)

    // 进度条开始转
    process.start()
    await download(repo, desc)
    // 完成以后，自动变成勾
    process.succeed()
}
