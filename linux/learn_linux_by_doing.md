---
pageClass: linux-class
---
# 动手学Linux教程
<img src='/images/linux/practical_Linux/learn_linux_with_jack.svg'>

## Linux简介: Linux到底是个啥?
Linux或许现在对你来说还很陌生，但是它默默地为你服务已经很久了。Linux, 一个广泛存在于我们生活中的操作系统。例如:常见的Andoid系统是建立在Linux基础上的，电子书阅读器Kindle里面的操作系统是用的Linux,风靡全球的微型计算机树莓派(Raspberry Pi)官方使用的操作系统Rasbian也是Linux; 全世界大多数的网站服务器是运行在Linux操作系统上的。

Linux很年轻。在1991的时候Linux由Linus Torvalds开始编写, 接着世界各地的开发者纷纷加入到这个项目的开发中。从1991年到现在，二十多年时间, Linux已经从一个Linus的一个个人项目变成了一个功能强大，存在于每个人生活中的世界项目。Linux的开发者们改变了世界，向他们致敬。如果你对这一段历史感兴趣，[《操作系统革命-Revolution OS》](https://www.bilibili.com/video/av9512574/)这部电影会让你了解Linux是如何一步步发展壮大的。
### Linux发行版
在我国，大多数人的桌面操作系统不是Linux, 而是Windows。其实，现在已经有了大量的Linux桌面操作系统。说到这里我想要给大家聊一聊**Linux发行版**(Linux distribution)这个概念。基于Linux内核(现在就简单理解为Linux最本质的那一部分)，开发人员根据自己的需求在内核之上再加工，加入大量的便于用户使用的软件，然后打包在一起便得到了一个Linux发行版。我们安装好Linux发行版之后只需要进行很少的修改便可以满足我们工作需要。

Linux发行版非常非常多，大家可以在[Disowatch](https://distrowatch.com/)上查看现在流行的Linux发行版。列举一些常用的Linux发行版:
<p align="center">
<div style="text-align:center" margin=auto> 
| [Debian](https://www.debian.org/) | [Ubuntu](https://ubuntu.com/)    | [Linux Mint](https://linuxmint.com/) |
| --------------------------------- | -------------------------------- | ------------------------------------ |
| [Manjaro](https://manjaro.org/)   | [Fedora](https://getfedora.org/) | [Centos](https://www.centos.org/)    |
 </div>
 </p>

另外值得一提的还有中国的两款Linux发行版:
- [Ubuntu Kylin](https://www.ubuntukylin.com/): 优麒麟，口号是做最有中国味的操作系统
- [Deepin](https://www.deepin.org/): 深度操作系统

### Linux桌面环境
对于安装在个人电脑上的Linux系统而言，进入系统后看到的一切就是Linux的桌面环境。不同于Windows默认只有一个桌面环境，Linux提供多种桌面环境供你选择。一些常见的桌面环境有:
- Cinnamon: 现代优雅
- MATE: 稳定传统
- GNOME: 经典的桌面环境
- XFCE: 轻量级
- KDE: 扩展性强


同一个发行版官方一般会提供几种桌面环境的ISO文件，你根据自己的喜好下载。Linux Mint官方主推的桌面环境就是Cinnamon, 推荐大家使用。

所以，**Linux是Linux操作系统的统称，Linux有很多种发行版，每一种发行版可以安装不同的桌面环境。**
::: tip
在这个教程最开始的那只很萌的企鹅叫做Tux,它是由Linus指定的Linux的吉祥物。
:::

## 开始使用Linux系统
了解了Linux操作系统之后，你可能同意Linux很重要，并且也想要继续学习Linux了。搜索引擎搜索:"如何安装Linux系统？"后得到的答案都是关于Ubunbu，Linux Mint等等信息。

如果你以前从没有接触过Linux操作系统，那么我推荐你使用[Ubuntu](https://ubuntu.com/), [Linux Mint](https://linuxmint.com/) 或者是有中国特色的[Ubuntu Kylin](https://www.ubuntukylin.com/)中的任意一种。推荐的理由是当你在你今后使用Linux的过程中遇到问题时，在网络上可以找到很多的解决方案。这三个Linux发行版都是在Debian的基础上建立起来的，使用方法几乎一模一样。

确定好接下来要使用的发行版后，到对应的官方网站下载好ISO镜像文件后，就需要安装系统了。这时你有下面这些选择:
1. 安装系统到你的笔记本或者台式机(可选覆盖原系统或与原系统并存): 运行速度快。
2. 安装系统到虚拟机(例如: [VirtualBox](https://www.virtualbox.org/)):在虚拟机中安装Linux不会对现有系统造成任何影响。

[这里](https://linuxmint-installation-guide.readthedocs.io/en/latest/choose.html)是LinuxMint的安装步骤, 动手实践是掌握Linux的核心要素。

::: tip
下载和安装Linux通常会比你预想花的时间更长，找一个空闲的时间来做这件事吧！
:::


## 图形化用户界面
Linux提供两种交互方式，一种是基于文本的交互，另一种是使用图形化界面。*图形化用户界面(Graphical User Interface:GUI)*，我们平时也叫作*图形界面*, 它可以让我们用鼠标，键盘，给我们显示出窗口。这样和我们交互不仅可以是文本，还能够是图片，窗口，按钮等。下面的音频控件使用的就是图形化的交互方式，你可以使用鼠标点击播放图标听音乐(加载可能需要一些时间)。
<p align="center">
<audio ref='themeSong' src="https://github.com/HuangJiaLian/DataBase0/blob/master/sound/My_Tree.mp3?raw=true" controls loop preload></audio>
</p>
Windows和MacOS大量使用GUI，因此你一定会对GUI非常熟悉。其实在Linux下也是可以使用GUI的，事实上Linux下的GUI界面已经相当不错了, 请看看下面的截图:

Linux Mint的Cinnamon桌面环境: 点击看大图。
[<p align="center">
<img src='/images/linux/practical_Linux/cinnamon.png'>
</p>](/images/linux/practical_Linux/cinnamon.png)
Manjaro的Cinnamon桌面环境: 点击看大图。
[<p align="center">
<img src='/images/linux/practical_Linux/manjaro.png'> 
</p>](/images/linux/practical_Linux/manjaro.png)

Linux Mint是我使用多年的系统, 非常稳定，曾多年稳居[Disowatch](https://distrowatch.com/)的榜首。Mint是基于Ubuntu，遇到问题，解决起来也比较容易。加上使用Cinnamon桌面环境，更使得Mint显得非常优雅，现代。

Manjaro是一款基于Arch Linux的发行版。不同于Arch的是，Manjaro比Arch更易用。Manjaro的口号是:Enjoy the simplicity。可见它非常的简洁。当你有一定的Linux使用经验后可以尝试这个非常优秀的Linux发行版。

::: tip
作为一个Linux初学者，在还不熟悉Linux的情况下，千万不要认为Linux的操作习惯不直观。要知道:复杂的工作需要复杂的工具，复杂的工具需要时间去掌握。事实上，使用一开始就就顺手的软件其实也是可以的，但是一旦你熟悉之后，往往简单顺手的软件不能满足你的需求，你不得不去找新的工具来解决你的问题。从长远来看，那些一开始就易用的软件往往会比那些功能强大需要时间掌握的软件更让人失望。

当我们使用一开始就好用的交互方式，最终我们会得到*计算机控制*的系统，当我们使用设计优良，强大需要时间掌握的交互方式，最终我们会得到*用户控制*的系统。
:::

## Linux工作环境

## 在Linux下使用键盘

## 终端下的应用
<p align="center">
<Aplayer id="ncvcbI5R8f720GBVGvIUG7Et7" />
</p>

## Linux下的用户手册

## 命令的语法
::: tip
Linux系统非常好用，但是需要学习。
:::
## 使用shell: 命令

## 使用shell: 初始化文件

## 标准I/O, 重定向和管道

## 过滤器: 介绍和基本操作

## 过滤器: 比较和提取

## 过滤器: 计数和格式化

## 过滤器: 选择，排序，比较和修改

## 正则表达式

## 显示文件

## vim编辑器

## Linux文件系统

## 目录操作

## 文件操作

## 进程和工作管理

## 远程管理



<!-- <Counter/> -->

参考: 
[1] ["Harley Hahn's Guide To Unix and Linux"](http://unix.harley.com/instructors/internet-resources/index.html)

<ClientOnly>
<Livere/>
</ClientOnly>
