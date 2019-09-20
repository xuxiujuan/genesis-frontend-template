'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,

  devServer: {
    port: 8081,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: `http://127.0.0.1:8081/mock`,
        changeOrigin: true
      }
    }
    // proxy: {
    //   '/api': {
    //     target: 'http://alpha.orientsec.com.cn:8000',
    //     changeOrigin: true,
    //     headers: {
    //       'X-Forwarded-For': 'localhost:8081'
    //     }
    //   },
    //   '/gateway': {
    //     target: 'http://alpha.orientsec.com.cn:8000',
    //     changeOrigin: true,
    //     headers: {
    //       'X-Forwarded-For': 'localhost:8081'
    //     }
    //   },
    //   '/rw_api': {
    //     target: 'http://alpha.orientsec.com.cn:8000',
    //     changeOrigin: true,
    //     headers: {
    //       'X-Forwarded-For': 'localhost:8081'
    //     },
    //     pathRewrite: {
    //       '^/rw_api': ''
    //     }
    //   },
    //   '/node_api': {
    //     target: 'http://localhost:7001',
    //     changeOrigin: true,
    //     headers: {
    //       'X-Forwarded-For': 'localhost:8081'
    //     },
    //     pathRewrite: {
    //       '^/node_api': ''
    //     }
    //   }
    // }
  },

  configureWebpack: {
    name: 'genesis-frontend-template',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  chainWebpack(config) {
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(process.env.NODE_ENV === 'development', config =>
      config.devtool('cheap-source-map')
    )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          genesisUI: {
            name: 'chunk-genesisUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?genesis-ui(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
