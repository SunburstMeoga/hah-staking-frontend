'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_PATH: '"/"',
  VUE_APP_AXIOS_BASE_URL: '"/api"',
  VUE_APP_API_BASE_URL: 'https://testnet.hashahead.org/api/',

  // 开发/测试环境链配置
  VUE_APP_MAINNET_CHAIN_ID: '"0x11623"', // 71203
  VUE_APP_MAINNET_RPC_URL: '"https://rpc-testnet.hashahead.org/mrpc"',
  VUE_APP_MAINNET_CHAIN_NAME: '"Hash Ahead Testnet"',
  VUE_APP_MAINNET_EXPLORER_URL: '"https://scan-testnet.hashahead.org/"',

  VUE_APP_SUBCHAIN_CHAIN_ID: '"0x11624"', // 71204
  VUE_APP_SUBCHAIN_RPC_URL: '"https://rpc-testnet.hashahead.org"',
  VUE_APP_SUBCHAIN_CHAIN_NAME: '"Hash Ahead Testnet ByteBloom"',
  VUE_APP_SUBCHAIN_EXPLORER_URL: '"https://scan-testnet.hashahead.org/"',

  // 兼容旧版本的变量名
  VUE_APP_APPCHAIN_CHAIN_ID: '"0x11624"',
  VUE_APP_APPCHAIN_RPC_URL: '"https://rpc-testnet.hashahead.org"'
})
