---
pageClass: linux-class
---

# 在Linux中我最常用的三种下载工具 
**Top three download tool I use in Linux**

在生活中我常常被一些Linux的学习者问到类似 “Linux下如何下载文件？” “Linux下有些什么下载软件？”这样的问题。因此我决定在这篇文章里面总结出我最常用的Linux下载工具。

在平常的工作学习中我使用下面的三个工具可以满足我下载文件的需要:
- **axel**
- **wget**
- **uget**

下面我们使用三种工具来下载Python开发环境 [Anacoda Linux Version](https://repo.anaconda.com/archive/Anaconda3-2018.12-Linux-x86_64.sh)

## 1.axel
`axel`可以同时使用多个连接下载文件, 是我经常用到的下载工具。下载速度也非常快。
### 安装:
对于Debian系列的Linux发行版:
``` bash
sudo apt install axel # Debian, Ubuntu, Mint
```
对于Arch系列的发行版:
```bash
sudo pacman -S axel # Arch, Manjaro
```

### 使用方法:
```bash
axel -n 10 https://repo.anaconda.com/archive/Anaconda3-2018.12-Linux-x86_64.sh
```
`-n` 用来制定连接的数目， 通常连接数越多，下载的速度越快。若在下载过程中出现卡顿的现象，使用`Ctrl C`中断程序，然后重复继续上面的命令，`axel`会接着刚在的下载内容继续下载。


## 2.wget
使用`wget`给我的感觉就是很稳，可能有些时候没有其他下载工具的速度快，但是它总是可以帮你完成你的需要。
### 安装:
对于Debian系列的Linux发行版:
``` bash
sudo apt install wget # Debian, Ubuntu, Mint
```
对于Arch系列的发行版:
```bash
sudo pacman -S wget # Arch, Manjaro
```

### 使用方法:
```bash
wget  https://repo.anaconda.com/archive/Anaconda3-2018.12-Linux-x86_64.sh
```

## 3.uget
`uget` 是一款带有图形界面的下载工具，和`axel`一样具有多连接下载的功能。但是限制了连接的最大个数是`16`个。不过同样可以达到很快的下载速度。
### 安装:
对于Debian系列的Linux发行版:
``` bash
sudo apt install uget # Debian, Ubuntu, Mint
```
对于Arch系列的发行版:
```bash
sudo pacman -S uget # Arch, Manjaro
```

### 使用方法:
打开`uget`, 按下新建下载的快捷键`Ctrl N`,然后添加下载连接，指定文件的保存位置，最大连接个数，点击`OK`进行下载。


## 4.总结
使用如下三个命令:
```bash
axel -n 10 https://repo.anaconda.com/archive/Anaconda3-2018.12-Linux-x86_64.sh
wget  https://repo.anaconda.com/archive/Anaconda3-2018.12-Linux-x86_64.sh
uget: max connections: 16
```
下载`Anaconda`(684.2M)的时间如下:
| axel |  wget |  uget |
| ---- | ---- | ---- |
|  3m49s  |  8m46s    |  1m46m  |

上面的结果仅作参考，具体的下载时间和你的网速有很大的关系。当遇到使用其中某种工具不能下载的情况，可以试试其他两种。找到最好的下载方式。希望这篇文章对你有帮助。



#### 欢迎留言:
<Valine></Valine>