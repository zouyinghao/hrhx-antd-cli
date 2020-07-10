// 打印欢迎界面（生成界面的过程是一个异步的回调过程，使用promisify封装）
const {promisify} = require('util')
const figlet = promisify(require('figlet'))

// 生成欢迎界面之前，先清空命令行
const clear = require('clear')

// 打印彩色的 log 函数
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))

// 克隆
const {clone} = require('./download')

// 打开浏览器
const open = require('open')

// 程序 install自动安装依赖
const spawn = async (...args) => {
    const {spawn} = require('child_process')
    return new Promise(resolve => {
        // 子进程
        const proc = spawn(...args)
        // 正常流
        proc.stdout.pipe(process.stdout)
        // 错误流
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}

module.exports = async name => {
    // 打印欢迎界面
    const ora = require('ora')

    // 清屏
    clear()
    const data = await figlet('Welcome   HRHX')
    log(data)

    // clone 项目
    // log(`🚀 正在为您创建 [${name}] 项目 ......`)
    // 进度条
    const loading1 = ora(`正在为您创建 ${name} 项目，请稍等 ......`)
    loading1.start()
    await clone('github:zouyinghao/hrhx-antd-template', name)
    loading1.succeed()

    // 自动安装依赖
    // log(`正在为您安装 [${name}] 项目依赖，请稍等 ......`)
    // const loading2 = ora(`正在为您安装 [${name}] 项目依赖，请稍等 ......`)
    // loading2.start()
    // await spawn('yarn', ['install'], {cwd: `./${name}`, shell: process.platform === 'win32'})
    // loading2.succeed()
    //
    // const sign = await figlet('HRHX   ANTD')
    // log(sign)

//     log(chalk.green(`
//                                     🔨 安装完成：
//                                     To get Start:
// ====================================================================================
// ██╗    ██╗ ███████╗  ██╗    ██╗ ██╗   ██╗     █████╗   ███╗   ██╗ ████████╗ ██████╗
// ██║    ██║ ██╔═══██╗ ██║    ██║ ╚██╗ ██╔╝   ██╔════██╗ ████╗  ██║ ╚══██╔══╝ ██╔══██╗
// █████████║ ███████╔╝ █████████║  ╚═██╔═╝    █████████║ ██╔██╗ ██║    ██║    ██║  ██║
// ██╔════██║ ██╔═══██╗ ██╔════██║  ██╔╝██╗    ██╔════██║ ██║╚██╗██║    ██║    ██║  ██║
// ██║    ██║ ██║   ██║ ██║    ██║ ██╔╝ ╚██╗   ██║    ██║ ██║ ╚████║    ██║    ██████╔╝
// ╚═╝    ╚═╝ ╚═╝   ╚═╝ ╚═╝    ╚═╝ ╚═╝   ╚═╝   ╚═╝    ╚═╝ ╚═╝  ╚═══╝    ╚═╝    ╚═════╝
//
//                 Hrhx Ant Design Pro ------ Author：zouyh@sspss.com.cn
//                             Create Date: 2020-07-05
//
//                                   cd ${name}
//                                   yarn serve
// ====================================================================================
//     `))

    log(chalk.yellow(`
    
                                   _ooOoo_  
                                  o8888888o  
                                  88" . "88  
                                  (| -_- |)  
                                   O\\ = /O  
                               ____/\`---'\\____  
                             .   ' \\\\| |// \`.  
                              / \\\\||| : |||// \\  
                            / _||||| -:- |||||- \\  
                              | | \\\\\\ - /// | |  
                            | \\_| ''\\---/'' | |  
                             \\ .-\\__ \`-\` ___/-. /  
                          ___\`. .' /--.--\\ \`. . __  
                       ."" '< \`.___\\_<|>_/___.' >'"".  
                      | | : \`- \\``\\ _ /\`;.\`/ - \` : | |  
                        \\ \\ \`-. \\_ __\\ /__ _/ .-\` //  
                ======\`-.____\`-.___\\_____/___.-\`____.-'======  
                                   \`=------='  

                ..................................................
                         佛祖保佑                   永无BUG 
                     佛曰:  
                             写字楼里写字间，写字间里程序员；  
                             程序人员写程序，又拿程序换酒钱。  
                             酒醒只在网上坐，酒醉还来网下眠；  
                             酒醉酒醒日复日，网上网下年复年。  
                             但愿老死电脑间，不愿鞠躬老板前；  
                             奔驰宝马贵者趣，公交自行程序员。  
                             别人笑我忒疯癫，我笑自己命太贱；  
                             不见满街漂亮妹，哪个归得程序员？

    `
    ))

    // log('正在为您启动项目，启动成功后会自动为您打开浏览器，您无需手动操作！')
    // await spawn('yarn', ['serve'], {cwd: `./${name}`, shell: process.platform === 'win32'})
}
