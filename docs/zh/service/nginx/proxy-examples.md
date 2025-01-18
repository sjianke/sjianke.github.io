# 反向代理

Nginx 反向代理是一种服务器配置方式，它接收客户端请求并将这些请求转发到一个或多个后端服务器。这样，客户端并不直接与后端服务器交互，而是通过 Nginx 作为中介。反向代理的主要用途包括负载均衡、安全防护、缓存优化、请求过滤等。

## 工作原理

- 客户端向 Nginx 发送请求。
- Nginx 根据配置规则将请求转发给一个或多个后端服务器。
- 后端服务器处理请求并返回响应。
- Nginx 将响应转发给客户端。

## 常用命令

```text
# 设置被代理服务器地址
proxy_pass http://bilibili.com;
# 设置代理请求头
proxy_set_header
```

## 案例 1 - 配置代理

访问被转到哔哩哔哩

```nginx
location / {
  root html;
  index index.html index.htm;
  proxy_pass http://bilibili.com;
}
```

1. **location** 指令定义 URI 匹配规则，这里 **/** 表示匹配所有请求。
2. **root** 指令定义网站的根目录。
3. **index** 指令定义默认首页文件的顺序。
4. **proxy_pass** 指令将请求转发到指定的后端服务器。

## 案例 2 - 解决跨域

1. 创建一个 html 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      fetch('http://localhost:9999/api/list')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        })
    </script>
  </body>
</html>
```

2. 创建一个 Nodejs 服务

```js
const express = require('express')
const app = express()

app.get('/api/list', (req, res) => {
  res.send({
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  })
})

app.listen(9999, () => {
  console.log('Server is running on port 9999')
})
```

3. 使用浏览器打开 index.html 并打开控制台 (快捷键 F12 ) 会看到以下错误信息

> [!CAUTION]
> Access to fetch at 'http://localhost:9999/api/list' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

4. 打开 nginx 配置文件，配置如下

```nginx
# 匹配 /api/ 路径
location /api/ {
    # 允许跨域请求的源
    add_header 'Access-Control-Allow-Origin' '*';
    # 允许跨域请求的方法
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    # 允许跨域请求的头部
    add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
    # 代理地址
    proxy_pass http://localhost:9999;
}
```

5. 修改 index.html 中的接口地址为 nginx 服务地址

```html
<script>
  // 访问 nginx 默认地址
  fetch('http://localhost:9999/api/list') // [!code --]
  fetch('http://localhost:80/api/list') // [!code ++]
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
</script>
```

6. 刷新 index.html 页面，得到以下数据，完成。

> [!TIP]
> → \{items: Array(5)\}
