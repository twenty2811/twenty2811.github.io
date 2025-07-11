const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        vm: require.resolve('vm-browserify')
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('provide')
      .use(webpack.ProvidePlugin, [
        {
          process: 'process',
        },
      ])

    config.module
      .rule('raw-md')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
})
