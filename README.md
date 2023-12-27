# BodyBuddy_BackEnd

![example workflow](https://github.com/FaterYU/BodyBuddy_BackEnd/actions/workflows/main_ci.yaml/badge.svg)

**前端传送门**： [BodyBuddy](https://github.com/FaterYU/BodyBuddy)

**API文档**： [BodyBuddy](https://documenter.getpostman.com/view/20262088/2s9Ykt6enz)

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

### 3. 初始化数据库表

拉取数据库样例文件

```bash
wget http://share.fater.top/pic_video.zip && unzip pic_video.zip -d ./uploads && rm pic_video.zip
```

导入数据库样例信息

```bash
python3 sh/insert_data.py
```

### 4. 启动项目

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
- `sh`：数据库样例信息 shell 脚本目录
- `app.js`：入口文件
- `package.json`：项目配置文件
- `README.md`：项目说明文件
- `.gitignore`： Git 忽略文件
- `yarn.lock`： yarn 锁定文件

## 接口示例

从 [API文档](https://documenter.getpostman.com/view/20262088/2s9Ykt6enz) 导入

安装 [postman](https://www.postman.com/downloads/)，导入 [BodyBuddy.postman_collection.json](./BodyBuddy.postman_collection.json) 文件，即可查看接口示例

## 云服务

- 后端域名：http://bodybuddy.fater.top

postman 中的接口示例使用的是本地部署的后端服务，如果需要使用云服务，按以下示例修改接口地址

```diff
- http://localhost:12647/api/users/findAll
+ http://bodybuddy.fater.top/api/users/findAll
```
