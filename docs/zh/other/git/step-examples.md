# git 提交流程

## 1.创建一个项目目录

```sh
# 创建文件夹、进入文件夹内
$ mkdir my-project
$ cd my-project
```

## 2.初始化 git

```sh
# 初始化 git
$ git init
```

## 3.创建文件

```sh
# 创建一个文件 并写入 Welcome to the project
$ echo "Welcome to the project" >> README.md
```

## 4.添加到暂存区

```sh
# "." 是添加全部文件到暂存区
$ git add .
# 想撤回？撤回暂存区所有文件
$ git reset
```

## 5.查看暂存区状态

```sh
$ git status
# On branch master
# Changes to be committed:
#   (use "git restore --staged <file>..." to unstage)
#         new:   README.md
```

## 6.提交代码

```sh
# 提交代码并填写提交信息
$ git commit -m "first commit"
# 想撤回？撤回提交并保留修改在暂存区
git reset --soft HEAD^
```

## 7.推送到远程仓库

注意： 需要先有远程仓库 [点击这里查看](/zh/other/git/basic-examples.html#%E6%8F%90%E4%BA%A4%E6%9C%AC%E5%9C%B0%E4%BB%93%E5%BA%93%E5%88%B0%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93)

```sh
# 推送到远程 master 分支
git push origin master
```

## 8.拉取远程代码

```sh
# 拉取 master 分支代码
git pull origin master
```

## 9.拉取远程仓库

```sh
# 拉取仓库 这里的地址为本项目
git clone https://github.com/sjianke/sjianke.github.io.git
```
