'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_PATH: '"/"',
  VUE_APP_AXIOS_BASE_URL: '"/api"',
  VUE_APP_API_BASE_URL: 'https://testnet.hashahead.org/api/',
  VUE_APP_MAINNET_CHAIN_ID: '"0x11623"',  // 测试环境主链 71203
  VUE_APP_APPCHAIN_CHAIN_ID: '"0x11624"', // 测试环境应用链 71204
  VUE_APP_MAINNET_RPC_URL: '"https://rpc-testnet.hashahead.org/mrpc"',
  VUE_APP_APPCHAIN_RPC_URL: '"https://rpc-testnet.hashahead.org"'
})
