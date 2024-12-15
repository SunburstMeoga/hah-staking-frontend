'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_PATH: '"/"',
  VUE_APP_AXIOS_BASE_URL: '"/api"',
  VUE_APP_API_BASE_URL: 'https://testnet.hashahead.org/api/'
})
