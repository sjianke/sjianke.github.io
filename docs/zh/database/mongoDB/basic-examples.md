# MongoDB 关系型数据库

## 1. 数据库命令

1. 显示所有数据库

   ```shell
   show dbs
   ```

2. 切换到指定的数据库，如果数据库不存在则自动创建数据库

   ```shell
   use 数据库名
   ```

3. 显示当前所在数据库

   ```shell
   db
   ```

4. 删除当前数据库

   ```shell
   use 库名
   db.dropDatabase()
   ```



## 2. 集合命令

1. 创建集合

   ```shell
   db.createCollection('集合名称')
   ```

2. 显示当前数据库中的所有集合

   ```shell
   show collections
   ```

3. 删除某个集合

   ```shell
   db.集合名称.drop()
   ```

4. 重命名集合

   ```shell
   db.集合名.renameCollection('新名称')
   ```



## 3. 文档命令

1. 插入文档

   ```shell
   db.集合名.insertOne(文档对象)
   db.users.insertOne({name: '张三', age: 18})
   ```

2. 查询文档

   ```shell
   db.集合名.find(查询条件?)
   db.users.find({name: '张三'})
   ```

   _id 是 mongodb 自动生成的唯一编号，用来唯一标识文档

3. 更新文档

   ```shell
   db.集合名.updateOne(查询条件, 新的文档)
   db.集合名.updateOne({name: '张三'},{$set:{age:19}})
   ```

4. 删除文档

   ```shell
   db.集合名.delete(查询条件)
   ```



## 4. 字段类型

文档接口可选的结构字段类型列表

| 类型       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| String     | 字符串                                                       |
| Number     | 数字                                                         |
| Boolean    | 布尔值                                                       |
| Array      | 数组，也可以使用 [] 表示                                     |
| Date       | 日期                                                         |
| Mixed      | 任意类型，需要使用 `mongoose.Schema.Types.Mixed` 指定        |
| ObjectId   | 对象ID, 需要使用 `mongoose.Schema.Types.ObjectId` 指定       |
| Decimal128 | 高精度数字，需要使用 `mongoose.Schema.Types.Decimal128` 指定 |

