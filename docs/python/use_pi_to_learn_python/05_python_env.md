---
pageClass: python-class
---

# Python环境

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
在这一节中你可以了解到:
- *Python的交互模式和一般模式*
- *如何使用nano编写Python程序*
- *如何在终端运行Python程序*
- *如何为Python语言添加注释*

<Livere/>