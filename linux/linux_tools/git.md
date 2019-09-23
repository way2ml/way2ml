---
pageClass: linux-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-23 10:10:28
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-23 10:38:53
 -->
# git

git是一款版本管理的工具，可以用在管理代码的不同版本，论文的不同版本等等。同时Github的官网也提供云存储的功能。很多大牛写的算法也都会放在Github
上，因此学习git是很有必要的。

## 基础
初始化当前目录为git目录
```bash
git init
```

添加文件到git
```bash
git add hello.py
```

commit留下版本截图:
```bash
git commit -m '添加了一个hello.y的文件，开始学习git啦.'
```

在github官网创建远程仓库;
关联本地和远程:
```bash
git remote add origin git@github.com:HuangJiaLian/3DCNN.git
```

将本地程序推送到远程github仓库:
```bash
git push -u origin master
```



## 进阶

`--hard`参数有啥意义？这个后面再讲，现在你先放心使用。<br>
后悔药: `git reflog`<br>
Git的版本回退速度非常快，因为Git在内部有个指向当前版本的HEAD指针，当你回退版本的时候，Git仅仅是把HEAD从指向append GPL：<br>

`git add -u` ：他仅监控已经被add的文件（即tracked file），他会将被修改的文件提交到暂存区

`git checkout -b dev` : 创建并切换到dev分支

`git push origin dev` ：在`dev`中`commit`后推送到远程分支`dev`

添加本地现有库到远程端：
``` bash
cd existing_git_repo
git remote add origin https://gitee.com/Jack_Huang/Jquirc.git
git push -u origin master
```

码云添加key了以后
```
ssh -T git@gitee.com
```