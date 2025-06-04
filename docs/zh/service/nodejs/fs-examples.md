# Node.js 文件系统（fs 模块）模块操作指南

文档基于 Node.js 官方文档：https://nodejs.org/api/fs.html

## 1. 引入模块

```javascript
const fs = require('node:fs');
```

## 2. 文件写入操作

| 功能                   | 异步方法               | 同步方法            |
| ---------------------- | ---------------------- | ------------------- |
| 写入文件               | `fs.writeFile`         | `fs.writeFileSync`  |
| 追加内容               | `fs.appendFile`        | `fs.appendFileSync` |
| 流式写入（大文件优化） | `fs.createWriteStream` | 无                  |

### 2.1 写入文件

```javascript
// 异步
fs.writeFile('text.txt', 'Hello', (err) => {
  if (err) console.error('写入失败', err);
  else console.log('写入成功');
});

// 同步
fs.writeFileSync('text.txt', 'Hello');
console.log('写入成功');
```

### 2.2 追加内容

```javascript
// 异步
fs.appendFile('text.txt', 'World', (err) => {
  if (err) console.error('追加失败', err);
  else console.log('追加成功');
});

// 同步
fs.appendFileSync('text.txt', '!');
```

### 2.3 流式写入（适合大文件）

```javascript
const stream = fs.createWriteStream('log.txt');
stream.write('日志1\n');
stream.write('日志2\n');
stream.end();
```

## 3. 文件读取操作

| 功能                   | 异步方法              | 同步方法          |
| ---------------------- | --------------------- | ----------------- |
| 读取文件               | `fs.readFile`         | `fs.readFileSync` |
| 流式读取（大文件优化） | `fs.createReadStream` | 无                |

### 3.1 普通读取

```javascript
// 异步
fs.readFile('text.txt', 'utf8', (err, data) => {
  if (err) console.error('读取失败', err);
  else console.log('读取成功', data);
});

// 同步
const data = fs.readFileSync('text.txt', 'utf8');
console.log('读取成功', data);
```

### 3.2 流式读取（适合大文件）

```javascript
const rs = fs.createReadStream('bigfile.txt', { encoding: 'utf8' });

rs.on('data', (chunk) => {
  console.log('收到数据块:', chunk.length);
});

rs.on('end', () => console.log('读取完成'));
rs.on('error', (err) => console.error('读取错误', err));
```

## 4. 文件操作

| 功能          | 异步方法    | 同步方法        |
| ------------- | ----------- | --------------- |
| 重命名 / 移动 | `fs.rename` | `fs.renameSync` |
| 删除文件      | `fs.unlink` | `fs.unlinkSync` |
| 删除文件/目录 | `fs.rm`     | `fs.rmSync`     |

### 4.1 重命名或移动

```javascript
// 异步
fs.rename('old.txt', 'new.txt', (err) => {
  if (err) console.error('重命名失败', err);
  else console.log('重命名成功');
});

// 同步
fs.renameSync('old.txt', 'folder/new.txt');
```

### 4.2 删除文件

```javascript
// 异步
fs.unlink('text.txt', (err) => {
  if (err) console.error('删除失败', err);
  else console.log('删除成功');
});

// 同步
fs.unlinkSync('text.txt');
```

### 4.3 删除文件夹（包括子目录）

```javascript
// 异步
fs.rm('testDir', { recursive: true, force: true }, (err) => {
  if (err) console.error('删除失败', err);
  else console.log('删除成功');
});

// 同步
fs.rmSync('testDir', { recursive: true, force: true });
```

## 5. 文件夹操作

| 功能       | 异步方法     | 同步方法         |
| ---------- | ------------ | ---------------- |
| 创建文件夹 | `fs.mkdir`   | `fs.mkdirSync`   |
| 读取文件夹 | `fs.readdir` | `fs.readdirSync` |
| 查看状态   | `fs.stat`    | `fs.statSync`    |

### 5.1 创建文件夹

```javascript
// 异步
fs.mkdir('parent/child', { recursive: true }, (err) => {
  if (err) console.error('创建失败', err);
  else console.log('创建成功');
});

// 同步
fs.mkdirSync('testDir');
```

### 5.2 读取文件夹

```javascript
// 异步
fs.readdir('./testDir', (err, files) => {
  if (err) console.error('读取失败', err);
  else console.log('目录内容:', files);
});

// 同步
const files = fs.readdirSync('./testDir');
console.log('目录内容:', files);
```

### 5.3 查看文件状态（fs.Stats）

```javascript
// 异步
fs.stat('./test.txt', (err, stats) => {
  if (err) return console.error(err);

  console.log('是否文件:', stats.isFile());
  console.log('是否目录:', stats.isDirectory());
});

// 同步
const stats = fs.statSync('text.txt');
console.log(stats);
```

## 6. 文件复制案例

### 6.1 普通方式

```javascript
fs.readFile('source.txt', (err, data) => {
  if (err) throw err;
  fs.writeFile('copy1.txt', data, (err) => {
    if (err) throw err;
    console.log('复制完成');
  });
});
```

### 6.2 流式方式（推荐大文件）

```javascript
const rs = fs.createReadStream('source.txt');
const ws = fs.createWriteStream('copy2.txt');
rs.pipe(ws);

ws.on('finish', () => console.log('复制完成（流式方式）'));
```
