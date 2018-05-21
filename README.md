<br>
<p align="center">
  <img width="500px" src="img/logo.svg" alt="puppy" />
</p>
<br>

> 一个记账本功能的pwa项目。

## 技术栈

`vue`三件套 = `vue` + `vuex` + `vue-router`

ui = `vant`

本地存储 = `localstorage`

pwa应用和用啥框架没有关系，主要是`service-work`，这里因为`vue`有提供一个pwa的模板所以就直接用了，ui的组件库用了`vant`，这个库专注移动端，像数字键盘等组件还是很不错的。

## 在线地址

可以访问[在线地址](https://limengke123.github.io/#/)，`ios`系统可以添加到桌面使用。
或者扫描二维码：

<p align="center">
  <img width="300px" src="img/qrcode.png" alt="qrcode" />
</p>
<br>


## 图片

![首页](/img/IMG_1779.PNG)

<details><summary>其他截图</summary><br>
<p>操作</p>   
<img width="100%" src="img/IMG_1780.PNG" alt="操作" />
<br>
<p>列表</p>
<img width="100%" src="img/IMG_1781.PNG" alt="列表" />
<br>
<p>日期筛选</p>
<img width="100%" src="img/IMG_1782.PNG" alt="日期筛选" />
<br>
</details>

## 待完成

- [X] 时间处理类
- [X] 流水记录(日期查询)
- [ ] 统计报表
- [ ] 离线缓存
- [ ] 闪屏处理
- [ ] icon处理
- [ ] 首部、底部icon、文字优化
- [ ] 第二个模块(Note)
- [ ] 第三个模块(About)


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
