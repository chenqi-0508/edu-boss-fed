const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()

app.use(express.static(path.join(__dirname, '../dist')))

const bossProxy = createProxyMiddleware('/boss', {
  target: 'http://eduboss.lagou.com',
  changeOrigin: true
})
const frontProxy = createProxyMiddleware('/front', {
  target: 'http://edufront.lagou.com',
  changeOrigin: true
})

app.use(bossProxy)
app.use(frontProxy)

app.listen(3000, () => {
  console.log('running')
})
