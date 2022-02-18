# tj-client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# 目录说明
## 特别规范
  目录名字大写开头。
## src
###  network 网络请求相关的封装，比如 axios封装
###  components/Public 当前项目的公共组件

# CSS规范
1、编码每个组件时，切记要为 每一个组件根元素添加唯一 class， 不使用 style scoped
.father > 这样编写。

2、采用 vw 单位。
### 全局引入了vant


### Vuex各个功能分开
