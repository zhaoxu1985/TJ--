  module.exports = {
      devServer: {
        open: true,//自动打开浏览器
        disableHostCheck: true,
    //     proxy: 'https://kf.testw.top',
      },
    
  lintOnSave: false,
  chainWebpack: config => {
        //production：发布模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main.js') //配置打包入口文件
              //使用externals设置排除项，并在index.html中引入外部CDN资源
            config.set('externals', {
              vue:'Vue',
              'vue-router': 'VueRouter',
              vant:'vant',
              axios: 'axios',
              'core-js':'CoreJs',
              'element': 'ElementUi'
            })
          })
    }
}