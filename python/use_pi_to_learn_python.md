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
4. 用Python控制LED
    - 看一看树莓派的引脚
    - 了解一点电路
    - 你看那个灯，像不像天上的星星
5. Blink LED
    - 时间的控制
    - 循环
6. 条件判断
    - 使用按键控制你的LED
7. 函数

8. 添加音效
    - 一个做游戏的库

9. 面向对象的编程

10. 结合起来
    - steady hand
    - 文件的读写

11. 玩起来

那就让我们开始吧！

## 四. 主要内容
### 1. Python是什么？为什么使用Python? Python怎么发音?

我们这里所说的Python呢，指的是一门程序语言。Python传说是这样子来的: 1989年的圣诞节，一个荷兰的年轻人吉多·范罗苏姆(Guido van Rossum)觉得很无聊便开发了一门程序语言来打发时间，于是一门新的程序语言便诞生了，它便是后来的Python。至于为什么会叫做Python(一种蟒蛇)呢? 这其实也很随意。那是因为那时有一部喜剧电视《Monty Python's Flying Circus》里面包含了这个词语。作者的初衷是很简单的，但是一不小心却改变了世界。

为什么要使用Python呢? 世上编程语言千千万，为啥要选Python？ 我想到一个常常被Python使用者提到的话"人生苦短，我用Python", 为什么这样说呢? 如今Python已经成为全世界最受欢迎的编程语言之一，全世界人民用Python开发了大量的函数库，你可以使用简单的几条语句实现很复杂的功能。这样可以让你专注于你要解决的问题, 而不用拘泥于细节，从而节约了大量的开发时间。另外一方面是Python太流行了，全世界都在用Python, 英国有的5岁小孩就开始玩树莓派，用的编程语言就是Python。所以为什么不选择Python呢?

我还想强调的一点就是Python的发音，这个音不是那么好发。Python `['paɪθɑn]`, 前面的`Py`年`[pai]`,和圆周率的Pi的发音是一样的，这没有什么问题。之后的`th`发`θ`， 咬住舌头即可。`on`就是`on the table`里面`on`的发音。注意体会一下。

在这一节，你可以了解到:
- *Python是怎么来的*
- *为什么要使用Python*
- *Python的正确发音*

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
在这一节中你可以了解到:
- *Python的交互模式和一般模式*
- *如何使用nano编写Python程序*
- *如何在终端运行Python程序*
- *如何为Python语言添加注释*
### 3. 用Python来问候这个世界
在这一小节我们来做一个仪式。编写一个程序命名为`say_hello.py`, 其中内容如下:
```python
print('Hello World!')
```
运行程序得到如下的效果:
```bash
[jack@jack-pc temp]$ python say_hello.py 
Hello World!
```
你可能会疑惑，为什么我要写这样一个一看就明白的程序，不就是输出一串字符串到屏幕吗? 这有什么了不起的。这其实是一个梗，最开始我学习C语言的时候，第一节课老师就让我编写了这样的一个程序，输出一串字符串`Hello World!`到屏幕上，我当时也不知道这是什么意思。也没有觉得有什么不对。后来学习`Python`的时候，第一节课又让我写这样一个输出`Hello World!`的程序。咦...How old are you? 怎么老是这个`Hello World!`。一查，哦... 原来C语言的创造者Kernighan, Brian W.和Ritchie, Dennis M.在他们的经典著作《*The C Programming Language*》中的第一个例子就是它。牛人随便的一个基本操作，被后来的人纷纷效仿。于是在你开始学习任意一门编程语言的时候，总是有人会教你写`Hello World!`程序。其实也是在后来我才明白了这个程序的真正含义，一方面这确实是一个梗，但是还有更重要的一方面。你能够正确运行`Hello World!`程序表示你的编程环境是搭建正确了，这是开始学习任意一门语言之前都必须做的。这同样让我想到了小时候做完纸飞机后，要哈一口气再飞。其实我之前一直想不明白，为什么要哈一口气? 真的可以让飞机飞的更远吗? 现在我明白了。哈气有两层含义:1.这是一个传统 2.这表示我的纸飞机做完，可以飞了。

在这一节你可以了解:
- *Hello World的来历*

### 4. 使用Python控制LED灯
很多时候，我们认为计算机像是台式机或者笔记本电脑，但树莓派向我们展示了计算机的另外一种形式。对我而言，树莓派最吸引我的地方并不是它有多小，而是树莓派有40个外接的引脚，通过外接的引脚我们可以和物理世界交互，从而完成各种有趣的应用。我们来看看树莓派的[引脚图](https://pinout.xyz/)吧:

<img src='/images/python/use_pi_to_learn_python/pi_pinout.png' width=500>

图中展示了两种引脚编号的方式，其中一种是物理引脚编号，也就是从1到40；另一种叫做Broadcom编号模式，也就是我们接下来要使用的模式。接下来我们将要使用Python来控制一个LED灯。

首先，来看一个简单的电路图:

<img src='/images/python/use_pi_to_learn_python/led_on_schematic.png' width=500>

从这个电路中可以看到，若`GPIO17`输出高电平，那么整个回路中存在电势差，则有电流流过LED,可以预测LED会被点亮。反之，`GPIO17`若输出低电平，LED不会被点亮。根据原理图，我们搭建下面的电路:

<img src='/images/python/use_pi_to_learn_python/led_on_breadboard.png' width=500>

硬件电路搭建好了，接下来就该我们的Python上场了。按照前面的讨论我们需要控制`GPIO17`的输出电平。当然，这不会很难。在树莓派的Python库中有这个一个叫做`RPi.GPIO`的库可以帮我们完成这项操作。为了演示的方便，我们直接在树莓派终端输入`python`，进入Python的交互模式，然后依次输入下面的命令:
```python
>>> import RPi.GPIO as GPIO
>>> GPIO.setmode(GPIO.BCM)
>>> GPIO.setup(17, GPIO.OUT)
>>> GPIO.output(17, True)
>>> 
```
哈哈，你注意到什么了吗? 看看你的效果是不是和我一样呢? 

<img src='/images/python/use_pi_to_learn_python/led_on_real.png' width=500>

不出所料，LED灯被点亮了。在上面的语句中:
- `import RPi.GPIO as GPIO`： 导入`RPi.GPIO`库，并简称为`GPIO`,这是很常规的一种操作，有一些Python库的名字很长，我们使用简称来方便我们编写程序。
- `IO.setmode(GPIO.BCM)`：我们指定使用Broadcom的引脚编号方式。
- `GPIO.setup(17, GPIO.OUT)`：用来指定`GPIO17`是作为输出引脚使用。
- `GPIO.output(17, True)`：使得`GPIO17`输出高电平，点亮LED

在这里，你可以继续输入`GPIO.output(17, False)`,看看LED是否和你预期的一样。
在结束本小节退出程序之前，依次在Python交互模式下输入:
```python
>>> GPIO.cleanup()
>>> exit()
```
在这里: 
- `GPIO.cleanup()`是为了在退出程序之前使得树莓派的引脚回到默认的状态，以此保证不对树莓派产生影响。好了，在这一小节你顺利地使用Python点亮了一颗LED,为你自己喝彩吧! 毕竟这是一个很好的开始，不是吗? 

在这一节，你可以了解到:
- *如何使用Python控制树莓派的引脚输出*

### 5. Blink LED
这一节我们的题目是`Blink LED`, 也就是说，我们要让LED灯变得一闪一闪。结合上一节的内容，给`GPIO17`高电平，则LED亮，给`GPIO17`低电平，则LED灭。那么一闪一闪的逻辑就该是下面的逻辑:
```
LED 亮
持续一段时间T1
LED 灭
持续一段时间T2
LED 亮
持续一段时间T3
LED 灭
持续一段时间T4
......
```
根据上面这个逻辑我们在一般模式下，编写程序`blink_led.py`, 内容如下:
```python
# -*- coding: utf-8 -*-
import time # 导入时间模块
import RPi.GPIO as GPIO # 导入GPIO引脚控制模块

GPIO.setmode(GPIO.BCM) # 使用BCM引脚编号模式
GPIO.setup(17, GPIO.OUT) # 设置GPIO17为输出引脚

GPIO.output(17, True) # LED 亮
time.sleep(0.5) # 延时0.5秒
GPIO.output(17, False) # LED 灭
time.sleep(0.5) # 延时0.5秒
GPIO.output(17, True) # LED 亮
time.sleep(0.5) # 延时0.5秒
GPIO.output(17, False) # LED 灭
time.sleep(0.5) # 延时0.5秒
GPIO.output(17, True) # LED 亮
time.sleep(0.5) # 延时0.5秒
GPIO.output(17, False) # LED 灭
time.sleep(0.5) # 延时0.5秒
GPIO.output(17, True) # LED 亮
time.sleep(0.5) # 延时0.5秒
GPIO.output(17, False) # LED 灭
time.sleep(0.5) # 延时0.5秒

GPIO.cleanup() # 恢复引脚到默认状态
```
在上面的程序中:
- `# -*- coding: utf-8 -*-`: 因为我在程序中使用了中文注释，因此在Python2中需要添加这样一条注释来避免报错；而在Python3中这条语句则不需要。
- `time.sleep(0.5)`：这条语句使得树莓派保持当前的状态不变，并持续0.5秒

通过`python blink_led.py`,运行程序。如果不出差错，那么可以看到LED灯亮灭了4次，然后停止闪烁。恩恩，效果还不错。但是你感觉这个程序写得怎么样呢?　是否有那么些复杂呢? 还有没有更简单的方法呢? 

咳咳，是时候引出我们的一号小Boss了，那就是`while`循环语句。我把上面的程序改成下面的程序`blink_led_while.py`:
```python
# -*- coding: utf-8 -*-
import time # 导入时间模块
import RPi.GPIO as GPIO # 导入GPIO引脚控制模块

GPIO.setmode(GPIO.BCM) # 使用BCM引脚编号模式
GPIO.setup(17, GPIO.OUT) # 设置GPIO17为输出引脚

counter = 0
while counter < 4:
    GPIO.output(17, True) # LED 亮
    time.sleep(0.5) # 延时0.5秒
    GPIO.output(17, False) # LED 灭
    time.sleep(0.5) # 延时0.5秒
    counter = counter + 1
GPIO.cleanup()
```


<Valine></Valine>