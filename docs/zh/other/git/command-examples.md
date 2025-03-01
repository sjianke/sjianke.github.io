# Git 提交流程

参考：

- [Git](https://git-scm.com/book/en/v2)
- [Git - Reference](https://git-scm.com/docs)
- [Git 大全 - Gitee.com](https://gitee.com/all-about-git)

## 1. 配置和设置

### 1.1 设置提交代码时的用户信息

```sh
# 编辑配置文件
git config -e [--global]

# 配置用户信息（全局或当前仓库）
git config [--global] user.name "<name>"
git config [--global] user.email "<email>"

# 移除某项配置
git config [--global] --unset user.name
```

**说明**：

- `--global` 选项用于设置全局配置，如果省略该选项，只会影响当前仓库的设置。
- 配置后，可以使用 `git config --list` 查看当前的配置信息。

## 2. 创建本地仓库或克隆远程仓库

### 2.1 创建本地 `git` 仓库

```sh
# 新建一个目录，并将其初始化为 Git 代码库
git init [project-name]
```

### 2.2 克隆远程仓库

```sh
# 从远程仓库克隆项目，可自定义本地仓库名称
git clone <repository_url> [<directory_name>]
```

**说明**：

- `git clone` 会复制远程仓库内容到本地，并设置远程仓库默认名称为 `origin`。
- 若不指定 `directory_name` ，则默认使用远程仓库的名称作为本地仓库名称。

## 3. 创建文件并修改

```sh
# 创建文件并写入 "Welcome to the project"
echo "Welcome to the project" > README.md
```

## 4. 暂存区操作

### 4.1 添加文件到暂存区

```sh
# 将指定文件添加到暂存区
git add <file1> <file2> ...

# 添加当前目录下的所有更改文件到暂存区，以下三种写法等效
git add .
git add -A
git add --all

# 仅更新已跟踪文件的暂存区内容
git add -u
git add --update
```

### 4.2 查看暂存区状态

```sh
# 查看暂存区的文件状态
git status

# 比较工作区和暂存区之间的差异
git diff [<filename>]

# 比较暂存区和最新提交之间的差异
git diff --cached [<filename>]

```

### 4.3 查看暂存区详细信息

```sh
# 查看暂存区中的文件列表
git ls-files

```

### 4.4 撤销暂存区的文件

```sh
# 撤销暂存区文件，返回工作区
git reset [<filename>]

```

## 5. 提交操作

### 5.1 提交文件

```sh
# 提交暂存区的文件并添加提交信息
git commit -m "first commit"

# 跳过暂存区直接提交已跟踪文件的更改
git commit -am "first commit"
```

### 5.2 修改提交信息

```sh
# 修改最近的一条提交信息，并使用默认编辑器编辑
git commit --amend

# 直接修改最近提交的提交信息
git commit --amend -m "new commit message"
```

### 5.3 撤销提交

#### 5.3.1 使用 `git reset` 重置历史记录

```sh
# 重置最近的一次提交，保留修改并将文件放入暂存区
git reset --soft HEAD~1

# 重置最近的一次提交，保留修改但不放入暂存区
git reset --mixed HEAD~1

# 重置最近的一次提交，丢弃所有更改（慎用）
git reset --hard HEAD~1
```

#### 5.3.2 使用 `git revert` 放弃指定提交的修改并生成新提交

```sh
# 撤销最近一次提交的修改，创建新提交记录
git revert HEAD
```

### 5.4 查看提交统计信息

```sh
# 查看每个提交者的提交统计信息
git shortlog
```

## 6. 远程仓库操作

### 6.1 设置远程仓库地址

```sh
# 设置远程仓库地址，'origin' 是默认的远程仓库名称
git remote add origin <url>

# 修改已有的远程仓库 URL 地址
git remote set-url origin <new-url>

# 查看当前所有配置的远程仓库及其 URL 地址
git remote -v

# 移除指定的远程仓库
git remote remove origin

# 重命名远程仓库
git remote rename origin upstream
```

### 6.2 推送本地代码到远程仓库

```sh
# 推送本地代码到远程仓库的 master 分支，并设置默认推送目标
git push -u origin master
# 强制推送（慎用！会覆盖远程历史记录）
git push -f origin <branch_name>

# 推送所有本地分支到远程仓库
git push --all origin

# 推送本地标签到远程仓库
git push origin --tags
```

### 6.3 拉取远程仓库代码

```sh
# 拉取远程仓库的 master 分支并合并到本地当前分支
git pull origin master

# 推荐先 fetch 再手动合并或变基
git fetch origin
git merge origin/master   # 或 git rebase origin/master
```

## 7. 查看提交历史

### 7.1 查看提交记录

```sh
# 查看提交历史
git log

# 查看简洁的提交历史
git log --oneline

# 以图形化形式查看提交历史
git log --graph --oneline --decorate

# 查看指定文件的提交历史
git log <filename>

# 查看最近 5 次提交记录
git log -n 5

```

### 7.2 查看引用日志

```sh
# 查看引用日志，显示 HEAD 和分支的历史记录
git reflog

```

### 7.3 恢复丢失的提交

```sh
# 查看引用日志找到具体提交哈希
git reflog
# 使用 reset 恢复到指定提交（谨慎操作）
git reset --hard <commit_hash>

```

### 7.4 查看某个提交的详细信息

```sh
# 查看某个提交的详细信息，包括提交的更改内容
git show <commit_hash>

```

## 8. 分支操作概述

Git 分支是 Git 中非常重要的一部分，它允许你在项目中同时进行多个任务。以下是常见的 Git 分支操作及其命令。

### 8.1 创建分支

- **创建新分支**（不切换到新分支）：

  ```sh
  git branch <branch_name>
  ```

- **创建并切换到新分支**：

  ```sh
  #创建并切换到新分支（两种写法）
  git switch -c <branch_name>      # Git 2.23+ 推荐
  git checkout -b <branch_name>    # 兼容旧版本
  ```

### 8.2 切换分支

- **切换到现有分支**：

```sh
git switch <branch_name>      # Git 2.23+ 推荐
git checkout <branch_name>    # 兼容旧版本
```

### 8.3 删除分支

- **删除本地分支**：

  ```sh
  git branch --delete <branch_name>
  ```

  或者强制删除：

  ```sh
  git branch -D <branch_name>
  ```

- **删除远程分支**：

  ```sh
  git branch -dr origin/<branch_name>
  git push origin --delete <branch_name>
  ```

### 8.4 查看分支

- **查看本地分支**：

  ```sh
  git branch
  ```

- **查看所有本地和远程分支**：

  ```sh
  git branch -a
  ```

### 8.5 修改分支名称

- **修改当前分支名称**：

  ```sh
  git branch -M <new_branch>
  ```

- **推送更名后的分支到远程仓库**：

  ```sh
  git push -u origin <new_branch>
  ```

- **删除远程旧分支**：

  ```sh
  git push origin --delete <old_branch>
  ```

### 8.6 更新本地分支

- **同步远程分支（删除本地已失效的远程分支引用）**：

  ```sh
  git fetch --prune     # 等效于 git remote update --prune
  ```

- **获取远程仓库的更新（不会自动合并）**：

  ```sh
  git fetch
  ```

### 8.7 分支合并

分支合并允许将两个分支的历史记录融合到一起，常用的合并方式有 `git merge` 和 `git rebase`。根据不同的场景选择合适的合并策略。

#### 8.7.1 合并分支

- **合并当前分支到目标分支**：

  1. 切换到目标分支：

     ```sh
     git switch <target_branch>
     ```

  2. 合并源分支（例如 `feature` 分支）：

     ```sh
     git merge <source_branch>
     ```

#### 8.7.2 解决冲突

如果在合并时发生冲突，Git 会提示需要手动解决冲突。一般流程如下：

1. 执行合并操作时，如果存在冲突，Git 会标记冲突文件为“未解决”（Unmerged）。你可以查看冲突状态：

   ```sh
   git status
   ```

2. 打开冲突文件，查找并手动解决冲突。Git 会在冲突区域标记出冲突内容，例如：

   ```text
   <<<<<<< HEAD
   当前分支的内容
   =======
   要合并的分支的内容
   >>>>>>> feature-branch
   ```

3. 解决冲突后，使用以下命令标记冲突已解决并提交：

   ```sh
   git add <resolved_file>
   git commit
   ```

#### 8.7.3 使用 `git rebase` 合并

`git rebase` 可以将一个分支的提交记录“移动”到另一个分支上，使提交历史更加整洁。

1. **使用 `git rebase` 进行合并**：

   切换到需要合并的分支，并执行以下命令：

   ```sh
   git rebase <target_branch>
   ```

2. 如果在执行 `rebase` 时发生冲突，Git 会暂停并提示你解决冲突，解决后，继续 `rebase`：

   ```sh
   git rebase --continue
   ```

   如果决定放弃合并操作，可以使用以下命令回退：

   ```sh
   git rebase --abort
   ```

### 8.8 `git merge` 与 `git rebase` 区别

- **`git merge`**：会创建一个新的合并提交，保留分支的合并历史。这种方式适合于想要保留分支合并历史的场景。

- **`git rebase`**：会把提交记录“移动”到目标分支上，历史记录更简洁，不会产生额外的合并提交。适用于希望保持线性历史的情况，但可能会丢失合并过程的详细记录。

#### 合并策略选择

- 如果你需要将不同的特性分支并入主分支并且希望保留完整的合并记录，可以使用 `git merge`。
- 如果你希望使历史提交更加整洁，并避免额外的合并提交，可以使用 `git rebase`。

### 8.9 常见问题与技巧

#### 8.9.1 同步远程分支

有时候，远程仓库的分支更新较快，想要在本地分支同步远程分支，可以使用以下命令：

```sh
git pull origin <branch_name>
```

#### 8.9.2 切换分支时未保存本地修改

如果你在切换分支前有本地修改，Git 会提示你有未提交的修改。此时，你可以：

- **暂存修改**：

  ```sh
  git stash
  ```

- **切换分支后恢复修改**：

  ```sh
  git stash pop
  ```

#### 8.9.3 查看分支合并历史

使用以下命令查看分支的合并历史：

```sh
git log --graph --oneline --all
```

## 9. 标签操作

### 9.1 创建标签

- **创建轻量级标签**

```sh
# 创建标签
git tag <tag_name>
```

- **创建带注释的标签**

```sh
git tag -a <tag_name> -m "Tag message"
```

### 9.2 查看标签

- **查看所有标签**

```sh
git tag
```

- **查看标签详细信息**

```sh
git show <tag_name>
```

### 9.3 推送标签到远程仓库

```sh
# 推送单个标签
git push origin <tag_name>

# 推送所有未同步的标签
git push origin --tags
```

### 9.4 删除标签

- **删除本地标签**

```sh
git tag -d <tag_name>
```

- **删除远程标签**

```sh
git push origin --delete <tag_name>
```

## 10. 存储操作

- **存储当前工作区的更改**

```sh
git stash
```

- **查看存储列表**

```sh
git stash list
```

- **恢复存储的更改**

```sh
git stash apply
```

- **删除存储的更改**

```sh
git stash drop
```

- **恢复并删除存储的更改**

```sh
git stash pop
```

## 11. 子模块操作

- **添加子模块**

```sh
git submodule add <repository_url> <path>
```

- **初始化和更新子模块**

```sh
git submodule update --init
```

- **查看子模块状态**

```sh
git submodule status
```

- **删除子模块时**，需要执行以下步骤：
  1. 从 `.gitmodules` 文件中删除子模块的条目。
  2. 从 Git 索引中移除子模块引用。
  3. 提交删除更改。

```sh
# 删除子模块（需依次执行）
git submodule deinit <path>    # 解除子模块绑定
git rm <path>                  # 从索引中移除
rm -rf .git/modules/<path>     # 清理残留文件（谨慎操作）
```

## 12. 忽略文件

- **创建** `.gitignore` **文件**

```txt
# 忽略所有 .log 文件
*.log

# 忽略 build 目录
/build/
```

- **使** `.gitignore` **文件生效**

```sh
# 仅更新 .gitignore 并重新添加文件
git add .gitignore
git commit -m "Update .gitignore"
# 若需清除历史中已提交的忽略文件，需针对具体文件操作
git rm --cached <file_to_ignore>
```

## 13. 常见命令简述

- **初始化仓库**：`git init`
- **克隆仓库**：`git clone <url>`
- **查看仓库状态**：`git status`
- **查看提交历史**：`git log`
- **提交更改**：`git commit -m "message"`
- **推送代码到远程仓库**：`git push origin <branch>`
- **拉取远程代码并合并**：`git pull origin <branch>`
- **添加文件到暂存区**：`git add <file>`
- **重置暂存区**：`git reset <file>`
- **查看远程仓库**：`git remote -v`
- **合并分支**：`git merge <branch>`
- **变基**：`git rebase <branch>`
- **常用选项**：
- `--global`：全局配置（对所有仓库生效）。
- `-u`/`--set-upstream`：关联远程分支（简化后续推送/拉取）。
- `-f`/`--force`：强制操作（覆盖历史，需谨慎）。
- `--global`：全局配置（对所有仓库生效）。
- `-u`/`--set-upstream`：关联远程分支（简化后续推送/拉取）。
- `-f`/`--force`：强制操作（覆盖历史，需谨慎）。

## 总结

此文档包含了创建本地仓库、配置用户信息、文件暂存、提交历史的查看、以及远程仓库的管理等基本 Git 操作。通过这些操作，你可以灵活地进行版本控制，管理本地与远程代码的提交与同步。
