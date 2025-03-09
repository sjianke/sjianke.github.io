# Git 提交流程

参考：

- [Git](https://git-scm.com/book/en/v2)
- [Git - Reference](https://git-scm.com/docs)
- [Git 大全 - Gitee.com](https://gitee.com/all-about-git)

## 1. 配置与初始化

### 1.1 用户信息配置

```sh
# 设置全局用户名和邮箱（适用于所有仓库）
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

# 查看当前配置
git config --list

# 编辑配置文件（全局或当前仓库）
git config -e [--global]
```

**说明**：

- `--global` 选项用于设置全局配置，如果省略该选项，只会影响当前仓库的设置。
- 配置后，可以使用 `git config --list` 查看当前的配置信息。

### 1.2 初始化仓库

```sh
# 初始化新仓库
git init [project-name]

# 克隆远程仓库
git clone <repository_url> [directory_name]
```

**说明**：

- `git clone` 会复制远程仓库内容到本地，并设置远程仓库默认名称为 `origin`。
- 若不指定 `directory_name` ，则默认使用远程仓库的名称作为本地仓库名称。

## 2. 仓库操作

```sh
# 创建文件并写入内容
echo "Hello Git" > README.md
```

## 3. 文件与暂存区

### 3.1 添加文件到暂存区

```sh
# 添加指定文件
git add file1.txt

# 添加所有文件（包括未跟踪文件）
git add --all

# 仅添加已跟踪文件的修改（不包含新增文件）
git add --update
```

### 3.2 撤销与对比

```sh
# 撤销暂存区的文件（保留工作区修改）
git reset HEAD file1.txt

# 比较工作区和暂存区之间的差异
git diff [<filename>]

# 比较暂存区和最新提交之间的差异
git diff --cached [<filename>]
```

### 3.3 查看暂存区状态与文件列表

```sh
# 查看暂存区的文件状态
git status

# 查看暂存区中的文件列表
git ls-files
```

## 4. 提交管理

### 4.1 提交与修改

```sh
# 提交暂存区文件
git commit -m "commit message"

# 跳过暂存区直接提交（仅限已跟踪文件）
git commit -am "commit message"

# 修改最近一次提交（重新编辑信息或内容）
git commit --amend

# 修改最近一次提交的提交信息
git commit --amend -m "new commit message"
```

### 4.2 撤销提交

```sh
# 软重置：保留修改到暂存区
git reset --soft HEAD~1

# 混合重置：保留修改到工作区（默认）
git reset --mixed HEAD~1

# 硬重置：完全丢弃修改（慎用！）
git reset --hard HEAD~1

# 生成逆向提交撤销指定提交
git revert <commit_hash>
```

### 4.3 查看提交统计信息

```sh
# 查看每个提交者的提交统计信息
git shortlog
```

## 5. 远程仓库

### 5.1 远程仓库配置

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

### 5.2 推送本地代码到远程仓库

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

### 5.3 拉取远程仓库代码

```sh
# 拉取远程仓库的 master 分支并合并到本地当前分支
git pull origin master

# 推荐先 fetch 再手动合并或变基
git fetch origin
git merge origin/master   # 或 git rebase origin/master
```

## 6. 查看提交历史

### 6.1 查看提交记录

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

### 6.2 查看引用日志

```sh
# 查看引用日志，显示 HEAD 和分支的历史记录
git reflog

```

### 6.3 恢复丢失的提交

```sh
# 查看引用日志找到具体提交哈希
git reflog
# 使用 reset 恢复到指定提交（谨慎操作）
git reset --hard <commit_hash>

```

### 6.4 查看某个提交的详细信息

```sh
# 查看某个提交的详细信息，包括提交的更改内容
git show <commit_hash>

```

## 7. 分支操作

Git 分支是 Git 中非常重要的一部分，它允许你在项目中同时进行多个任务。以下是常见的 Git 分支操作及其命令。

### 7.1 分支创建与切换

```sh
# 创建新分支（不切换到新分支）
git branch <new-branch>

# 创建并切换到新分支（两种写法）
git switch -c <new-branch>      # Git 2.23+ 推荐
git checkout -b <new-branch>    # 兼容旧版本

# 只切换分支
git switch <branch_name>      # Git 2.23+ 推荐
git checkout <branch_name>    # 兼容旧版本
```

### 7.2 删除分支

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

### 7.4 查看分支

- **查看本地分支**：

  ```sh
  git branch
  ```

- **查看所有本地和远程分支**：

  ```sh
  git branch -a
  ```

### 7.5 修改分支名称

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

### 7.6 更新本地分支

- **同步远程分支（删除本地已失效的远程分支引用）**：

  ```sh
  git fetch --prune     # 等效于 git remote update --prune
  ```

- **获取远程仓库的更新（不会自动合并）**：

  ```sh
  git fetch
  ```

### 7.7 分支合并

分支合并允许将两个分支的历史记录融合到一起，常用的合并方式有 `git merge` 和 `git rebase`。根据不同的场景选择合适的合并策略。

#### 7.7.1 合并分支

- **合并当前分支到目标分支**：

  1. 切换到目标分支：

     ```sh
     git switch <target_branch>
     ```

  2. 合并源分支（例如 `feature` 分支）：

     ```sh
     git merge <source_branch>
     ```

#### 7.7.2 解决冲突

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

#### 7.7.3 使用 `git rebase` 合并

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

### 7.8 `git merge` 与 `git rebase` 区别

- **`git merge`**：会创建一个新的合并提交，保留分支的合并历史。这种方式适合于想要保留分支合并历史的场景。

- **`git rebase`**：会把提交记录“移动”到目标分支上，历史记录更简洁，不会产生额外的合并提交。适用于希望保持线性历史的情况，但可能会丢失合并过程的详细记录。

#### 合并策略选择

- 如果你需要将不同的特性分支并入主分支并且希望保留完整的合并记录，可以使用 `git merge`。
- 如果你希望使历史提交更加整洁，并避免额外的合并提交，可以使用 `git rebase`。

### 7.9 常见问题与技巧

#### 7.9.1 同步远程分支

有时候，远程仓库的分支更新较快，想要在本地分支同步远程分支，可以使用以下命令：

```sh
git pull origin <branch_name>
```

#### 7.9.2 切换分支时未保存本地修改

如果你在切换分支前有本地修改，Git 会提示你有未提交的修改。此时，你可以：

- **暂存修改**：

  ```sh
  git stash
  ```

- **切换分支后恢复修改**：

  ```sh
  git stash pop
  ```

#### 7.9.3 查看分支合并历史

使用以下命令查看分支的合并历史：

```sh
git log --graph --oneline --all
```

## 8. 标签管理

### 8.1 创建标签

```sh
# 创建标签
git tag <tag_name>

# 创建带注释的标签
git tag -a v1.0 -m "Release version 1.0"
```

### 8.2 查看标签

```sh
# 查看所有标签
git tag

# 查看标签详细信息
git show <tag_name>
```

### 8.3 推送标签到远程仓库

```sh
# 推送标签到远程
git push origin <tag_name>

# 推送所有未同步的标签
git push origin --tags
```

### 8.4 删除标签

```sh
# 删除本地标签
git tag -d <tag_name>

# 删除远程标签
git push origin --delete <tag_name>
```

## 9. 存储操作

- **存储当前工作区的更改**

```sh
git stash [-u]
```

- 默认会存储工作区和暂存区的修改。
- 添加 `-u` 或 `--include-untracked` 可以存储未跟踪的文件：

- **查看存储列表**

```sh
git stash list
# 输出
stash@{0}: WIP on main: 5d3fd1f Fix login bug
stash@{1}: On dev: Updated styles
stash@{2}: Temp work on feature
```

- **恢复存储**

```sh
git stash apply [index]
```

- **删除存储**

```sh
git stash drop [index]
```

- **恢复并删除存储**

```sh
git stash pop [index]
```

- **清空所有存储**

```sh
git stash clear
```

- `[index]` 可通过 `git stash list` 查看，例如：`git stash pop stash@{0}`未添加索引，则默认为 `stash@{0}` 例如：`git stash pop`, `stash@{0}`索引可简写为数字，例如：`git stash pop stash@{1}` 同 `git stash pop 1`

## 10. 子模块操作

- **添加子模块**

```sh
git submodule add <repository_url> <path>
```

- **初始化并更新子模块**

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

## 11. 忽略文件

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

## 12. 常见命令简述

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
