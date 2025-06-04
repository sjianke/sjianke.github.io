# 网络协议

HTTP 请求本质上是一个数据流，由请求头（headers）和请求体（body）组成。例如以下是一个完整的 HTTP 请求数据内容。

```txt
// 请求头
POST / HTTP/1.1
User-Agent: curl/7.26.0
Host: localhost
Accept: */*
Content-Length: 11
Content-Type: application/x-www-form-urlencoded


// 请求体
Hello World
```

## 创建 HTTP 服务

1. 创建 `helloHttp.js` 文件

   ```javascript
   // 加载 HTTP 模块
   const http = require('node:http');
   const hostname = '127.0.0.1';
   const port = 9000;

   // 创建 HTTP 服务器
   const server = http.createServer((request, response) => {
     // 用 HTTP 状态码和内容类型（Content-Type）设置 HTTP 响应头
     response.statusCode = 200;
     response.setHeader('Content-Type', 'text/html; charset=utf-8');
     // 发送响应体
     response.end('Hello World!');
   });

   // 监听 9000 端口的请求，注册一个回调函数记录监听开始
   server.listen(port, hostname, () => {
     console.log(`服务器运行于 http://${hostname}:${port}/`);
   });
   ```

   - request（请求对象）- 客户端发送到服务端的请求内容。
   - response（响应对象） - 服务端要发送给客户端的响应内容

2. 使用 node 执行 `helloHttp.js` 文件

   ```bash
   node helloHttp.js
   // 服务器启动后，你将看到控制台输出，指示服务器正在运行的 IP 地址：
   // 服务器运行于 http://127.0.0.1:9000/
   ```

3. 在浏览器中访问 URL `http://127.0.0.1:9000`，如果一切正常，浏览器会直接显示出“Hello world”字符串。

## 获取 HTTP 请求报文

通过 `resquest` 对象获取请求数据

| 含义           | 语法                                                              |
| -------------- | ----------------------------------------------------------------- |
| 请求方法       | request.method                                                    |
| 请求版本       | request.httpVersion                                               |
| 请求路径       | request.url                                                       |
| URL 路径       | require('url').parse(request.url).pathname                        |
| URL 查询字符串 | require('url').parse(request.url,true).query                      |
| 请求头         | request.headers                                                   |
| 请求体         | request.on('data', (chunk) =>{})<br />request.on('end', () => {}) |

注：

1. request.url 只能获取路径以及查询字符串，无法获取 URL 中的域名以及协议的内容。
2. request.headers 将请求信息转化成一个对象，并将属性名转化成小写。
3. 关于路径：如果访问网站的时候，只填写 IP 地址或域名信息，此时请求的路径为 `/`。
4. 关于 favicon.ico：这个属于浏览器自动发送的请求。

## 提取请求体和请求路径

### 提取 body

```javascript
const server = http.createServer((request, response) => {
  // 用 HTTP 状态码和内容类型（Content-Type）设置 HTTP 响应头
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html; charset=utf-8');

  let body = '';
  // 监听 body 数据传输事件
  request.on('data', (chunk) => {
    body += chunk;
  });

  // 监听数据传输结束事件
  request.on('end', () => {
    console.log(body);
    // 发送响应体
    response.end('Hello World!');
  });
});
```

### 提取查询字符串

```javascript
// 创建 HTTP 服务器
const server = http.createServer((request, response) => {
  // 用 HTTP 状态码和内容类型（Content-Type）设置 HTTP 响应头
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  // 解析路径
  // let res = url.parse(request.url, ture);
  // console.log(res.query);

  // 或 解析路径
  let url = new URL(request.url, 'http://127.0.0.1/');
  // 获取特定参数
  console.log(url.searchParams.get('id'));

  response.end('Hello World!');
});
```

## 设置响应报文

| 作用             | 语法                                              |
| ---------------- | ------------------------------------------------- |
| 设置响应状态码   | response.statusCode                               |
| 设置响应状态描述 | response.statusMessage('用的少')                  |
| 设置响应头       | response.setHeader('头名', '头值')                |
| 设置响应体       | response.write('内容');<br />response.end('结束') |

write 和 end 的两种情况：

1. write 和 end 结合使用，响应体比较分散

   ```javascript
   response.write('xx');
   response.write('xx');
   response.end(); // 每个请求，在处理的时候必须执行 end 方法
   ```

2. 单独使用 end ，响应体比较集中

   ```javascript
   response.end('xxx');
   ```

## 小案例

::: code-group

```javascript [server.js]
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
};

const server = http.createServer();

server.on('request', (req, res) => {
  const { pathname } = new URL(req.url, 'http://127.0.0.1');

  const filePath = path.resolve(
    __dirname,
    `.${pathname == '/' ? '/index.html' : pathname}`,
  );

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log('err', err);
      res.statusCode = 404;
      res.end('File not found');
      return;
    }
    const ext = path.extname(filePath);
    response.setHeader('Content-Type', mimeTypes[ext] || 'text/plain');
    res.end(data);
  });
});

server.listen(9000, () => {
  console.log('服务启动了...');
});
```

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./css/style.css" />
  </head>
  <body>
    <h1>点击表格变色</h1>
    <table border="1">
      <thead>
        <th>姓名</th>
        <th>性别</th>
        <th>家庭住址</th>
      </thead>
      <tbody>
        <tr>
          <td>小马哥</td>
          <td>男</td>
          <td>翻斗花园</td>
        </tr>
      </tbody>
    </table>

    <script src="./js/index.js"></script>
  </body>
</html>
```

```css [./css/style.css]
table {
  color: #fff;
  background-color: cadetblue;
}

td {
  cursor: pointer;
}

.active {
  background-color: pink;
}
```

```javascript [./js/script.js]
const node = document.querySelectorAll('td');

node.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (e.target) {
      e.target.classList.toggle('active');
    }
  });
});
```

:::
