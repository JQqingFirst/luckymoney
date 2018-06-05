var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../lucky/index.html'),
        assetsRoot: path.resolve(__dirname, '../lucky'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 65521,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/webapi': {
                target: 'http://test.leapp.leaicai.com',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/webapi': '/webapi'
                },
                headers: {
                  Referer: 'http://test.leapp.leaicai.com'
                }
            }
        },
        cssSourceMap: false
    }
}
