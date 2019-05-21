# 北京市金融局内网项目

## 基于create-react-app(react-scripts)

### 开发环境
* react 16.8.6
* react-scripts 3.0.1
* node 10.15.3
* npm 6.4.1


### 目录环境
```
public                                // 默认生成的目录
scripts                               // 默认生成的目录
src                                   // 项目源码目录
    |-api                             // 接口
    |-base                            // 业务功能界面
    |-common                          // 公共图片，css，js
        |-font
        |-image
        |-js
        |-style
    |-component                       // 组件
    |-router                          // 路由设置
    App.jsx                           // 入口页面jsx
    App.scss                          // 总体布局
    index.jsx                         // 入口项目jsx
config-overrides.js                   // 有关webpack其他配置（别名等）
```

### 运行
* 安装
    ```
    cnpm i
    ```
* 运行
    ```
    npm start
    ```
* 打包
    ```
    npm run build
    ```
* 更新
    * 安装 npm dependency（vscode扩展）
    * 进入package.json
    * 右键执行npm update