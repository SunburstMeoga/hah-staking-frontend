'use strict'
module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_PATH: '"/"',
  VUE_APP_AXIOS_BASE_URL: '"/api"',
  VUE_APP_API_BASE_URL: '"https://test-vote.hashahead.org/dev-api/"',

  // 生产环境链配置
  VUE_APP_MAINNET_CHAIN_ID: '"0x2bf"', // 703
  VUE_APP_MAINNET_RPC_URL: '"https://rpc.hashahead.org/mrpc"',
  VUE_APP_MAINNET_CHAIN_NAME: '"Hash Ahead Mainnet"',
  VUE_APP_MAINNET_EXPLORER_URL: '"https://scan.hashahead.org/"',

  VUE_APP_SUBCHAIN_CHAIN_ID: '"0x2c0"', // 704
  VUE_APP_SUBCHAIN_RPC_URL: '"https://rpc.hashahead.org"',
  VUE_APP_SUBCHAIN_CHAIN_NAME: '"Hash Ahead ByteBloom"',
  VUE_APP_SUBCHAIN_EXPLORER_URL: '"https://scan.hashahead.org/"'
}
