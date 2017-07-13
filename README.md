# lottery-ticket

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 介绍
本项目一共包含三个组件`lottery`，`intro`，`select`，其中`lottery`，`select` 均可复用，同时在`lottery`组件中通过配置相应参数实现各种彩票类型样式切换，具体参数详见对应文件。
所有交互均已实现。
父组件通过props传递参数给子组件，子组件通过emit发送事件给父组件进行通行。子组件不能操作父组件传递的数据。子组件只负责数据的展示，异步读取数据均在app.vue中实现。
