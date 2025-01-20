# Nginx 配置

Nginx 是一款高性能的 HTTP 和反向代理服务器，同时也是一个 IMAP/POP3 代理服务器。由于其高效的性能和配置灵活性，Nginx 被广泛应用于 Web 服务和负载均衡中。以下是关于 Nginx 配置的详细讲解：

菜鸟教程 - nginx 详细配置 <https://www.runoob.com/w3cnote/nginx-setup-intro.html>

## 1. **Nginx 配置文件结构**

Nginx 的配置文件通常位于 `/etc/nginx/nginx.conf`，可以分为以下几部分：

- **全局配置**：一般在文件的开头，用来设置 Nginx 的全局参数，影响所有虚拟主机的配置。
- **事件模块**：用于配置 Nginx 工作进程和网络连接相关的参数。
- **HTTP 模块**：配置 HTTP 服务，包括 Web 服务器的配置、负载均衡、缓存等。
- **Server 块**：用于定义虚拟主机的配置，多个 `server` 块可以定义多个虚拟主机。
- **Location 块**：用于定义请求 URI 的处理规则，可以根据 URL 路径匹配来定义如何处理请求。

## 2. **配置文件基本结构**

一个 Nginx 配置文件大致结构如下：

```nginx
# 全局配置
user nginx;  # 设置 Nginx 的运行用户和组，通常设置为 nginx 用户
worker_processes 1;  # 设置 Nginx 使用的工作进程数，通常根据 CPU 核心数调整
error_log /var/log/nginx/error.log warn;  # 设置错误日志的文件路径和日志级别，'warn' 表示记录警告级别及以上的错误
pid /var/run/nginx.pid;  # 设置存放 Nginx 进程 ID 的文件路径

# 事件模块配置
events {
    worker_connections 1024;  # 每个工作进程最大支持的连接数
    # 其他事件模块设置，比如使用 epoll 等优化 I/O 操作
}

# HTTP 模块配置
http {
    # 配置 MIME 类型文件，帮助 Nginx 识别不同文件的类型
    include /etc/nginx/mime.types;
    # 设置默认的文件类型，如果无法确定文件的 MIME 类型，则使用此类型
    default_type application/octet-stream;

    # 日志配置
    access_log /var/log/nginx/access.log;  # 设置访问日志文件路径

    # 开启 Gzip 压缩
    gzip on;  # 启用 Gzip 压缩，减少数据传输量
    gzip_types text/plain application/xml application/javascript;  # 设置要压缩的文件类型
    gzip_min_length 1000;  # 设置文件大小超过 1000 字节才进行压缩

    # 配置缓存路径
    proxy_cache_path /data/nginx/cache keys_zone=my_cache:10m;  # 配置缓存路径和缓存区域大小
    proxy_cache_key "$host$request_uri";  # 设置缓存键，以主机名和请求 URI 作为缓存的唯一标识
    proxy_cache_use_stale error timeout updating;  # 设置缓存过期后的行为，错误、超时时使用过期缓存

    # 配置服务器块，定义一个虚拟主机
    server {
        listen 80;  # 设置监听的端口，80 是 HTTP 默认端口
        server_name localhost;  # 设置服务器名称，这里是 localhost，可以使用域名

        # 访问日志设置，记录当前虚拟主机的访问日志
        access_log /var/log/nginx/localhost.access.log main;

        # 定义根目录，处理请求时查找文件的起始路径
        location / {
            root /usr/share/nginx/html;  # 根目录设置为 /usr/share/nginx/html
            index index.html index.htm;  # 默认访问的首页文件
        }

        # 针对某个路径（如 /images/）的处理规则
        location /images/ {
            root /data/images/;  # 对于 /images/ 路径，映射到 /data/images/ 目录
        }

        # 针对 PHP 请求的处理规则
        location ~ \.php$ {
            fastcgi_pass 127.0.0.1:9000;  # 将 PHP 请求转发到本地的 FastCGI 服务器
            fastcgi_param SCRIPT_FILENAME /var/www/html$fastcgi_script_name;  # 设置 PHP 脚本文件的路径
            include fastcgi_params;  # 引入 FastCGI 相关的配置
        }
    }

    # 配置另一个虚拟主机
    server {
        listen 443 ssl;  # 启用 SSL，监听 HTTPS 默认端口 443
        server_name example.com;  # 配置虚拟主机的域名

        ssl_certificate /etc/nginx/ssl/example.com.crt;  # 设置 SSL 证书文件路径
        ssl_certificate_key /etc/nginx/ssl/example.com.key;  # 设置 SSL 证书密钥文件路径

        # 根目录设置及默认首页
        location / {
            root /var/www/html;
            index index.html;
        }
    }
}

```

## 3. **关键配置项**

### 3.1 **全局配置**

全局配置通常位于配置文件的顶部，影响整个 Nginx 进程的设置。

- `user nginx;`  
  设置 Nginx 运行的用户和组。
- `worker_processes 1;`  
  设置工作进程的数量，通常设置为 CPU 核心数。

- `error_log /path/to/log/file;`  
  设置错误日志的文件路径及日志级别，通常包括 `debug`, `info`, `notice`, `warn`, `error`, `crit`。

- `pid /path/to/nginx.pid;`  
  设置存储 Nginx 进程 ID 的文件路径。

### 3.2 **事件模块**

`events` 块用于设置 Nginx 处理网络连接的参数。

- `worker_connections 1024;`  
  每个工作进程最大支持的连接数。

- `use epoll;`  
  Linux 系统下的 I/O 多路复用方法，通常用于高并发场景。

### 3.3 **HTTP 模块**

http` 模块是 Nginx 的核心模块，用于处理 HTTP 请求。它包含许多配置项：

- `include /etc/nginx/mime.types;`
   引入 MIME 类型配置文件，用于根据文件后缀名推测文件类型（如 `.html` 为 `text/html`）。
- `default_type application/octet-stream;`
   当无法确定文件 MIME 类型时，默认为二进制流类型 `application/octet-stream`。
- `access_log /var/log/nginx/access.log;`
   设置访问日志文件的路径。
- `gzip on;`
   启用 Gzip 压缩功能，可以减少传输的数据量，从而提高网站的加载速度。
- `gzip_types`
   指定启用压缩的 MIME 类型，例如 `text/plain` 和 `application/javascript` 等。
- `gzip_min_length 1000;`
   设置启用压缩的最小文件大小，只有超过 1000 字节的文件才会被压缩。
- `proxy_cache_path`
   设置缓存的存储路径和缓存区域大小，`keys_zone` 是缓存区域的名字和大小，`my_cache:10m` 表示创建一个 10MB 的缓存区域。
- `proxy_cache_key "$host$request_uri";`
   设置缓存的键，通常使用请求的主机名和 URI 作为唯一标识。
- `proxy_cache_use_stale`
   设置当缓存过期时，Nginx 在错误、超时等情况下仍然使用过期的缓存。

### 3.4 **Server 模块**

`server` 模块定义了每个虚拟主机的配置。你可以在一个 `http` 块中配置多个 `server` 块。

- `listen 80;`
   指定监听的端口号，这里是 HTTP 的默认端口 80。
- `server_name localhost;`
   配置服务器的域名或 IP 地址，这里设置为 `localhost`，你可以根据实际需要更改为实际的域名。
- `access_log`
   为该虚拟主机指定单独的访问日志文件。
- `location / { ... }`
   匹配 `/` 路径的所有请求，通常用于指定默认的网页根目录。

### 3.5 **Location 模块**

`location` 模块用于根据请求的 URI 来决定如何处理请求。可以使用正则表达式或前缀匹配来确定请求的路径。

```nginx
location /images/ {
    root /data/images/;
}

location ~ \.php$ {
    fastcgi_pass 127.0.0.1:9000;
    fastcgi_param SCRIPT_FILENAME /var/www/html$fastcgi_script_name;
    include fastcgi_params;
}
```

- `location /path/`  
  匹配所有以 `/path/` 开头的请求。

- `location ~ \.php$`  
  使用正则表达式匹配 `.php` 后缀的请求。

- `fastcgi_pass`  
  将请求传递给 FastCGI 服务，通常用于 PHP 请求。

- `root`  
  设置请求的根目录路径。

## 4. **反向代理配置**

Nginx 作为反向代理时，可以将客户端的请求转发到后台服务器处理。例如：

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;  # 代理到本地的 8080 端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 5. **负载均衡配置**

Nginx 支持多种负载均衡策略，如轮询、IP 哈希等。例如：

```nginx
http {
    upstream backend {
        server backend1.example.com;
        server backend2.example.com;
    }

    server {
        location / {
            proxy_pass http://backend;
        }
    }
}
```

这段配置会将请求轮询地转发到 `backend1.example.com` 和 `backend2.example.com`。

## 6. **SSL 配置**

Nginx 也可以作为 HTTPS 服务器提供安全通信，以下是简单的 SSL 配置：

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/nginx/ssl/example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/example.com.key;

    location / {
        root /var/www/html;
        index index.html;
    }
}
```

- `listen 443 ssl;`  
  启用 HTTPS 监听端口 443。

- `ssl_certificate`  
  配置 SSL 证书路径。

- `ssl_certificate_key`  
  配置 SSL 密钥路径。

## 7. **常用的 Nginx 配置优化**

- **启用 Gzip 压缩：**

```nginx
http {
    gzip on;
    gzip_types text/plain application/xml application/javascript;
    gzip_min_length 1000;
}
```

- **缓存配置：**

```nginx
http {
    proxy_cache_path /data/nginx/cache keys_zone=my_cache:10m;
    proxy_cache_key "$host$request_uri";
    proxy_cache_use_stale error timeout updating;
}
```

## 总结

Nginx 配置的核心在于理解不同模块的作用及其配置项的含义。掌握了这些配置项，您可以灵活地配置 Nginx 来满足各种 Web 服务需求，包括负载均衡、反向代理、SSL 加密等。
