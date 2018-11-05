'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // 统一登录配置
  host: '"localhost"', 
  port: '"8000"', 
  uamRootUrl: '"http://localhost:8081/"',
  targetAppCode: '"testApp"'
})
