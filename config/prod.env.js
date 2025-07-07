'use strict'
module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_PATH: '"/"',
  VUE_APP_AXIOS_BASE_URL: '"/api"',
  VUE_APP_API_BASE_URL: '"https://test-vote.hashahead.org/dev-api/"',

  // 生产环境链配置
  VUE_APP_MAINNET_CHAIN_ID: '"0x2BF"', // 703 (修复：使用正确的大写格式)
  VUE_APP_MAINNET_RPC_URL: '"https://rpc.hashahead.org"', // 修复：主链应该使用主RPC
  VUE_APP_MAINNET_CHAIN_NAME: '"Hash Ahead Mainnet"',
  VUE_APP_MAINNET_EXPLORER_URL: '"https://scan.hashahead.org/"',

  VUE_APP_SUBCHAIN_CHAIN_ID: '"0x2C0"', // 704 (修复：使用正确的大写格式)
  VUE_APP_SUBCHAIN_RPC_URL: '"https://rpc.hashahead.org/mrpc"', // 修复：应用链使用mrpc
  VUE_APP_SUBCHAIN_CHAIN_NAME: '"Hash Ahead ByteBloom"',
  VUE_APP_SUBCHAIN_EXPLORER_URL: '"https://scan.hashahead.org/"',

  // 兼容旧版本的变量名
  VUE_APP_APPCHAIN_CHAIN_ID: '"0x2C0"',
  VUE_APP_APPCHAIN_RPC_URL: '"https://rpc.hashahead.org/mrpc"'
}
