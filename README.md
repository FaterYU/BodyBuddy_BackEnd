# BodyBuddy_BackEnd

![example workflow](https://github.com/FaterYU/BodyBuddy_BackEnd/actions/workflows/main_ci.yaml/badge.svg)

[BodyBuddy](https://github.com/FaterYU/BodyBuddy) 的后端项目

## 依赖

- Node.js
- yarn
- MySQL

## 快速启动

### 1. 安装依赖

```bash
yarn
```

### 2. 初始化数据库

```bash
mysql -u root -p
```

输入密码后进入 MySQL 命令行, 创建数据库和用户，并授权

```sql
create database bodybuddy;
create user 'bodybuddy'@'%' identified by 'bodybuddy';
grant all on bodybuddy.* to 'bodybuddy'@'%';
```

### 3. 启动项目

```bash
yarn start
```

## 项目结构

```bash
.
├── public
├── config
├── models
├── views
├── controllers
├── routes
├── app.js
├── package.json
├── README.md
├── .gitignore
└── yarn.lock
```

- `public`：静态资源目录
- `config`：配置文件目录
- `models`：数据库模型目录
- `views`：视图目录
- `controllers`：控制器目录
- `routes`：路由目录
- `app.js`：入口文件
- `package.json`：项目配置文件
- `README.md`：项目说明文件
- `.gitignore`： Git 忽略文件
- `yarn.lock`： yarn 锁定文件

## 接口示例

安装 [postman](https://www.postman.com/downloads/)，导入 [BodyBuddy.postman_collection.json](./BodyBuddy.postman_collection.json) 文件，即可查看接口示例

## 云服务

- 后端域名：http://bodybuddy.fater.top

postman 中的接口示例使用的是本地部署的后端服务，如果需要使用云服务，按以下示例修改接口地址

```diff
- http://localhost:12647/api/users/findAll
+ http://bodybuddy.fater.top/api/users/findAll
```
