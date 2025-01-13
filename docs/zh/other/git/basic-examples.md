# Git 基础

- Git Book <https://git-scm.com/book/zh/v2>
- 廖 雪 峰 <https://liaoxuefeng.com/books/git/introduction/index.html>
- 菜鸟教程 <https://www.runoob.com/git/git-tutorial.html>

## 安装 Git

- 下载地址 <https://git-scm.com/>
- 安装教程 <https://www.runoob.com/git/git-install-setup.html>

## 配置用户信息

配置个人的用户名称和电子邮件地址，这是为了在每次提交代码时记录提交者的信息

```sh
git config --global user.name "sJanKe"
git config --global user.email 789@qq.com
```

查看配置信息

```sh
# 检查全部配置
git config --global --list
# 检查某一项
git config --global user.name
git config --global user.email
```

编辑配置文件

```sh
git config --global --edit
```

## 初始化本地仓库

```sh
# 创建文件夹
mkdir my-project
cd my-project
# 初始化当前文件夹为仓库，执行成功后生成 .git 文件夹
git init
# 创建一个文件
echo "Welcome to the project" >> README.md
# 添加所有变化文件到暂存区
git add .
# 查看暂存库状态 - 此步骤可有可无
git status
# 提交本地仓库
git commit -m '初次提交'
# 通过 git log 或 git reflog 查看提交记录
git log

```

## 提交本地仓库到远程仓库

1. 需要先创建远程仓库，这里以 [gitee](https://gitee.com/) 为示例，其他平台相同，可根据创建仓库后提供的代码进行后续操作。
   ![alt text](/assets/images/git/createRepository.png)
   ![alt text](/assets/images/git/createRepository2.png)
