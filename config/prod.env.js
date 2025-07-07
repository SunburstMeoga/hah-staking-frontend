'use strict'
module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_PATH: '"/"',
  VUE_APP_AXIOS_BASE_URL: '"/api"',
  VUE_APP_API_BASE_URL: '"https://test-vote.hashahead.org/dev-api/"',

  // 生产环境链配置
  VUE_APP_MAINNET_CHAIN_ID: '"0x329"', // 809 (主链/mrpc端点)
  VUE_APP_MAINNET_RPC_URL: '"https://rpc.hashahead.org/mrpc"', // 主链使用/mrpc端点
  VUE_APP_MAINNET_CHAIN_NAME: '"Hash Ahead Mainnet"',
  VUE_APP_MAINNET_EXPLORER_URL: '"https://scan.hashahead.org/"',

  VUE_APP_SUBCHAIN_CHAIN_ID: '"0x2BF"', // 703 (应用链ByteBloom)
  VUE_APP_SUBCHAIN_RPC_URL: '"https://rpc.hashahead.org"', // 应用链不使用/mrpc
  VUE_APP_SUBCHAIN_CHAIN_NAME: '"Hash Ahead ByteBloom"',
  VUE_APP_SUBCHAIN_EXPLORER_URL: '"https://scan.hashahead.org/"',

  // 兼容旧版本的变量名
  VUE_APP_APPCHAIN_CHAIN_ID: '"0x2BF"',
  VUE_APP_APPCHAIN_RPC_URL: '"https://rpc.hashahead.org"'
}
