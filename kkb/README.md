### kkb Nodejs 层

### 本地测试环境设置
 > export NODE_ENV=development

### 在线测试环境设置
 > export NODE_ENV=staging

### 在线生产环境设置
 > export NODE_ENV=production

 Windows: SET NODE_ENV=production

### 运行需求

 * Nodejs 稳定版 7.7.0
 * Redis 服务器 >= 3.0.5

 ### 说明

- 框架 Expressjs
- 模板引擎 swig
- 缓存服务 redis



### 安装 运行
需要先全局安装 npm 和 bower,  npm 在安装 nodejs 时会自动安装

bower 全局安装方法  
```shell
 npm install -g bower
 npm install -g pm2
```
应用依赖安装
```shell
 npm install
 bower install
 npm run build
```

启动服务
npm run dev  开发环境的
npm run stage   在线测试环境设置
### 