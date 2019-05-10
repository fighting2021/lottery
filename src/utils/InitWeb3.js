let Web3 = require('web3')

// 创建web3实例
let web3 = new Web3()

// 使用用户自己的Provider来设置Web3实例
let provider = window.web3.currentProvider

// 设置Provider
web3.setProvider(provider)

// console.log("window.web3.provider : ", window.web3.version)
// console.log("my web3.provider : ", web3.version)

// 导出web3
module.exports = web3