### 更新
2023-04-30: 将所有的配置信息从 `config/*.json` 文件迁移到 `.env` 文件中    
2023-04-15: 更新了数据库中File这张表的字段，需要执行`npm run db:drop-migrate`删除旧表并生成新表

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
   # 删除旧表并生成新表
   npm run db:drop-migrate 
   # 生成新表
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
| /api/file/:id/setTop | patch | 将指定id的图片设置为置顶 |
| /api/file/:id/cancelTop | patch | 取消置顶 |
| /api/file/sort | post | 图片排序接口 |


### 配置文件    
配置文件 .env 位于 config/ 目录下。