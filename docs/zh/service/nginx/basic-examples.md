# Nginx 教程

## 一、简介

Nginx 是一款高性能的 Web 服务器和反向代理服务器，在互联网应用中被广泛使用。本教程将为你介绍 Nginx 的安装、常用命令以及配置文件的相关知识。

## 二、安装

### 2.1 下载地址

你可以从官方网站下载 Nginx：<https://nginx.org/en/download.html>

### 2.2 Windows 系统安装步骤

- **步骤 1：下载并解压**
  下载 `nginx/Windows` 版本，然后将下载的压缩文件解压到你指定的目录。
- **步骤 2：启动方式**
  - **方式一：直接启动**
    进入解压后的文件目录，找到 `nginx.exe` 文件，双击该文件即可启动 Nginx 服务。
  - **方式二：命令行启动（在 Nginx 目录下）**
    在 Nginx 目录下打开命令提示符（CMD），输入 `nginx` 命令并回车，即可启动 Nginx 服务。
  - **方式三：配置环境变量启动**
    配置系统环境变量，将 Nginx 的安装目录添加到系统的 `PATH` 环境变量中。这样，你就可以在全局的 CMD 命令行窗口中直接执行 `nginx` 命令来启动 Nginx 服务。

### 2.3 Linux 系统安装步骤

- **CentOS 系统**
  CentOS 系统可以通过 `yum` 包管理器来安装 Nginx。打开终端，执行以下命令：

  ```sh
  # 更新 yum 软件包索引
  yum update
  # 安装 Nginx
  yum install nginx
  ```

- **Ubuntu 系统**
  Ubuntu 系统可以通过 `apt` 包管理器来安装 Nginx。打开终端，执行以下命令：

  ```sh
  # 更新 apt 软件包索引
  apt update
  # 安装 Nginx
  apt install nginx
  ```

## 三、命令

### 3.1 查看 Nginx 版本

你可以使用以下命令查看 Nginx 的版本信息：

```nginx
nginx -v
```

### 3.2 启动 Nginx 服务

使用以下命令启动 Nginx 服务：

```nginx
nginx
```

### 3.3 信号控制命令（-s 选项）

`-s` 选项用于向 Nginx 的主进程发送信号，以实现不同的控制操作，常用信号及说明如下：

#### 3.3.1 强制停止 Nginx 服务（stop）

```sh
# 停止 Nginx 服务，强制停止所有进程，可能会导致正在处理的连接被中断。
nginx -s stop
```

#### 3.3.2 优雅关闭 Nginx 服务（quit）

```sh
# 优雅地关闭 Nginx 服务，会等待现有连接处理完毕后再停止服务，确保不会中断正在进行的业务。
nginx -s quit
```

#### 3.3.3 重新加载配置文件（reload）

```sh
# 重新加载 Nginx 配置文件，在不中断正在进行的连接的情况下，使新的配置生效。
nginx -s reload
```

#### 3.3.4 重新打开日志文件（reopen）

```sh
# 重新打开 Nginx 的日志文件，通常在进行日志文件切割等操作后使用。
nginx -s reopen
```

### 3.4 测试配置文件是否正确（-t 选项）

```sh
# 检查 Nginx 配置文件的语法是否正确，如果配置文件存在语法错误，会输出错误信息。
nginx -t
```

## 四、配置文件

### 4.1 配置文件位置

- **Windows**

  配置文件名为 `nginx.conf`，位于 `nginx 安装目录/conf/nginx.conf`。

- **Linux**

  配置文件名为 `nginx.conf`，通常位于以下目录之一：

  - `/etc/nginx`
  - `/usr/local/nginx/conf`
  - `/usr/local/etc/nginx`

### 4.2 Linux 系统下编辑配置文件

在 Linux 系统中，你可以使用 `vi` 或 `vim` 等命令行编辑器来编辑 Nginx 的配置文件。以下是使用 `vim` 编辑配置文件的示例：

[Linux vi/vim | 菜鸟教程](https://www.runoob.com/linux/linux-vim.html)

```sh
# 编辑 /etc/nginx/nginx.conf 文件
vim /etc/nginx/nginx.conf
```

### 4.3 修改配置文件后的操作

在修改 Nginx 的配置文件后，建议按照以下步骤操作：

```sh
# 第一步：使用 nginx -t 命令检查配置文件是否存在语法错误
nginx -t
# 第二步：如果配置文件没有问题，使用 nginx -s reload 命令重新加载配置文件，使新的配置生效
nginx -s reload
```
