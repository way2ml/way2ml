---
pageClass: python-class
---
# 我用树莓派带你学会Python
## 一. 背景
大家好。为了大家更了解我，我先做一个自我介绍。我叫黄杰，本科念的电子信息工程，毕业后做了两年的图像处理工程师，硕士的研究方向是机器学习。在大学二年级下学期（2013年）的时候，无意之间发现了树莓派(Raspberry Pi)。一瞬间就被它的小巧，功能强大折服。原来电脑可以是这样的。也是从那个时候开始接触Linux操作系统，Python编程语言等。毕业设计也是用树莓派做了一个扫描翻译的机器，后来也因为这个毕业设计和成像扫描有关，上海一家做自动识别的公司招我去他们那里做软件工程师，从事图像处理的工作。也正是因为从树莓派上面学到的Linux和Python的知识促使我一步一步向机器学习这个方向靠拢。可以说这个小小的计算机真正地改变了我的生活。

## 二. 目的
从2013年到如今(2019),使用Python也快六年了。周围也有很多伙伴想要学习Python,无奈很多人对于学习编程这件事都有一种固有的观念--编程很难。我想了很久，如何让编程看起来不是那么难？如何让它看起来有趣？如果我作为一名初学编程的人我希望怎么学习？ 如何让编程看得见？ 其中最后一个问题启发了开启这个教程。我将会用Python控制最简单的电子元器件，让编程和实实在在的物体交互，希望能够让你真真切切感受你在编程，你在控制这个世界。最后通过Python完成一个实体游戏机Steady Hand来学会Python。

## 三. 目录 
下面是主要的内容:
1. Python简介
    - Python的含义
    - Python的发音
2. Python环境
    - Python常见的两种模式
    - Python的注释
3. 用Python问候这个世界
    - 来历，这其实是一个信仰
    - 意义
    - 字符串
4. 使用Python点亮那个LED
    - Python软件库的安装
    - 看一看树莓派的引脚
    - 了解一点电路
    - 你看那个灯，像不像天上的星星
5. 时间的控制
    -闪亮的LED

6. 条件判断
    - 使用按键控制你的LED

7. 循环
    - 一闪一闪

8. 函数

9. 添加音效
    - 一个做游戏的库

10. 面向对象的编程

11. 结合起来
    - steady hand
    - 文件的读写

12. 玩起来

那就让我们开始吧！

## 四. 主要内容
### 1. Python是什么？为什么使用Python? Python怎么发音?

我们这里所说的Python呢，指的是一门程序语言。Python传说是这样子来的: 1989年的圣诞节，一个荷兰的年轻人吉多·范罗苏姆(Guido van Rossum)觉得很无聊便开发了一门程序语言来打发时间，于是一门新的程序语言便诞生了，它便是后来的Python。至于为什么会叫做Python(一种蟒蛇)呢? 这其实也很随意。那是因为那时有一部喜剧电视《Monty Python's Flying Circus》里面包含了这个词语。作者的初衷是很简单的，但是一部小心却改变了世界。

为什么要使用Python呢? 世上编程语言千千万，为啥要选Python？ 我想到一个常常被Python使用者提到的话"人生苦短，我用Python", 为什么这样说呢? 如今Python已经成为全世界最受欢迎的编程语言之一，全世界人民用Python开发了大量的函数库，你可以使用简单的几条语句实现很复杂的功能。这样可以让你专注于你要解决的问题, 而不用拘泥于细节，从而节约了大量的开发时间。另外一方面是Python太流行了，全世界都在用Python, 英国有的5岁小孩就开始玩树莓派，用的编程语言就是Python。所以为什么不选择Python呢?

我还想强调的一点就是Python的发音，这个音不是那么好发。Python `['paɪθɑn]`, 前面的`Py`年`[pai]`,和圆周率的Pi的发音是一样的，这没有什么问题。之后的`th`发`θ`， 咬住舌头即可。`on`就是`on the table`里面`on`的发音。注意体会一下。

### 2. Python环境
Python环境有几种模式，往往容易让初学Python的小伙伴们混淆。首先，让我给你介绍一下Python的**交互模式**。打开你的终端，输入`python`，你便得到类似如下的窗口：
```bash
[jack@jack-pc ~]$ python
Python 3.6.2 |Continuum Analytics, Inc.| (default, Jul 20 2017, 13:51:32) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-1)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```

其中`>>>`表示等待你键入指令。此时我们输入`125*3/78`,按下`Enter`键，立即便可以得到我们的计算结果：
```bash
[jack@jack-pc ~]$ python
Python 3.6.2 |Continuum Analytics, Inc.| (default, Jul 20 2017, 13:51:32) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-1)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 125*3/78
4.8076923076923075
>>> 
```
在这里你可以看到，**对于一些简单的操作，简单的测试，语法演示等，交互模式是很方便的**。
退出交互模式我们使用`exit()`命令或者使用结束快捷键`Ctrl+D`，如下:
```bash
[jack@jack-pc ~]$ python
Python 3.6.2 |Continuum Analytics, Inc.| (default, Jul 20 2017, 13:51:32) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-1)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 125*3/78
4.8076923076923075
>>> exit()
[jack@jack-pc ~]$ 
```

交互模式不能够满足我们所有的需要，尤其是当我们编写的程序有很多行代码的时候。我们就需要使用Python的一般模式，也就是把需要执行的指令写在一个文本里面，通常这个文件的后缀是`.py`表示是这个文本是Python的源代码。在命令行中输入下面的命令:
```bash
nano first_try.py
```
这条命令的意思是使用`nano`这个文本编辑器，来编辑我们的Python源代码`first_try.py`。于是得到下面的编辑界面:
```bash
  GNU nano 3.2                     first_try.py                                









                                 [ New File ]
^G Get Help    ^O Write Out   ^W Where Is    ^K Cut Text    ^J Justify
^X Exit        ^R Read File   ^\ Replace     ^U Uncut Text  ^T To Spell
```
在上面的编辑界面输入我们的Python代码。
```python
# This is a python program
2+3
print('We love Python!')
print(1+1)
```

然后按`Ctrl O` ,然后按`Enter`写入文件，再按`Ctrl X`退出编辑。此时在命令行中输入`ls`便可以看到多出了一个文件`first_try.py`。于是我们便写好了第一个Python程序。接下来使用下面的命令来执行我们刚刚写好的Python程序:
```bash
python first_try.py
```
于是得到如下的结果：
```bash
[jack@jack-pc temp]$ python first_try.py 
We love Python!
2
```
仔细观察程序的运行结果，我们可以发现
- 程序中的第一句`# This is a python program`并没有输出到屏幕。
- 程序中的第二句`2+3`的值`5`并没有输出到屏幕。

为什么呢? 很简单。第一句中有以`#`开头的句子，这是作为注释存在的，也就是Python的解释器不会执行这条语句，而写注释的目的是为了帮助看程序的人了解这段程序在做什么。在必要的地方写上你的注释是一个很好的习惯。因为在一年以后，你可能没有办法知道你你现在写的程序是在做什么，如果你没有写必要的注释的话。**写注释可以方便自己和他人，是一个好的习惯。**

在第二句中的`2+3`的值没有输出到屏幕，这又是为什么呢? 记住这里我们不是使用的交互模式，因此Python的解释器只会计算`2+3`的值，因为你只是让它计算了`2+3`的值，而没有让它输出计算的值到屏幕。在一般模式下，**Python总是做你让它做的事**。如果你真的要叫它输出计算出的值，可以利用下面的命令:
```python
print(2+3)
```
<Valine></Valine>