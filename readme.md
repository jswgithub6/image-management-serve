### 2023-4-15 更新了数据库中File这张表的字段，需要删除旧表并执行npm run db:migrate命令生成新的表

### 技术栈
node.js + express + sequelize(ORM) + mysql
图片压缩 tinypng在线压缩api

### 使用

1. 安装依赖
   ```sh
   npm install
   ```
2. 创建数据库（需先安装mysql）
   ```sh
   npm run db:create
   ```

3. 修改config/dbconfig.json的数据库配置文件，测试连接mysql
   ```sh
   npm run db:test
   ```

4. 运行sequelize迁移文件，生成表
   ```sh
   npm run db:migrate
   ```

5. 启动服务
   ```sh
   npm run start
   ```

6. 打开http://localhost:3000/app

### api

| 接口地址 | 请求方式 | 接口功能 |
| ---- | ---- | ---- |
| /api/file/upload | post | 文件上传 |
| /api/file/ | get | 获取所有文件列表 |
| /api/file/reviewStatus/pass | get | 获取所有审核通过的图片 |
| /api/file/:id/reviewStatus/:status | patch | 将指定id文件的审核状态更新为status |
| /api/file/:id | delete | 删除指定id的文件 |
| /api/file/:id/isTop | patch | 将指定id的图片设置为置顶 |


### 配置文件

config/dbconfig.json 数据库配置文件
config/server.json 服务端口配置文件
config/tinify.json tinypng在线压缩api配置文件

