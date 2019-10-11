# React 模板

## 基于 create-react-app(react-scripts)

### 开发环境

- react 16.10.2
- react-scripts 3.2.0
- node [10.16.3, 12.8.1)
- npm [6.9.0, 6.10.3)
- git 2.22.0

### CSS Modules 配置

- 遵循 create-react-app 文档配置，使用官方推荐的 xxx.module.scss 方式自动开启

### Webpack 拓展配置

- **不要使用 npm run eject 破坏式构建方法**
- 使用 react-app-rewired 配合 customize-cra 在 config-overrides.js 中进行配置
- [react-app-rewired](https://github.com/timarney/react-app-rewired)
- [customize-cra](https://github.com/arackaf/customize-cra)

### 命令

- 安装 cnpm（务必）
  ```
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  ```
- 安装依赖
  ```
  $ cnpm i
  ```
- 本地运行项目
  ```
  $ npm start
  ```
- 打包项目
  ```
  $ npm run build
  ```
- 包大小解析
  - 简单版
    ```
    $ npm run analyze
    ```
  - 高级版
    ```
    $ npm run advanced-analyze
    ```
- 提交代码
  ~~git commit -m 'xxx'~~ → <br/>
  ```
  $ npm run commit
  ```
  - 自动提交
    ```
    $ ./scripts/gitPush.sh
    ```
- 代码统计
  ```
  $ npm run cloc
  ```
- 更新依赖
  - 安装 npm dependency(vscode 扩展)
  - 进入 package.json
  - 右键执行 Npm update (latest)
  - 完成后执行 cnpm i
  - 若报错或者运行缓慢可在 setting.json 中配置
    `"npm.registry": "https://registry.npm.taobao.org"`
    再次尝试

### 注意

- 兼容 ie11
- 懒加载/路由分割 使用 React 原生方法
- 可以 0 配置 或者在 config-overrides.js 中任意配置
