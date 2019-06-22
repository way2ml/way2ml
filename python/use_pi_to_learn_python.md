---
pageClass: python-class
---
# 我用树莓派带你入门Python
## 一. 背景
大家好。首先欢迎你来到这里听我给你聊一聊树莓派和Python的故事。我叫黄杰，小时候大家都叫我阿梁。我考虑了好久之后给自己起了一个网名就叫做`阿梁也叫Jack_Huang`,希望这样可以让你们更快地记住我。我本科的专业是电子信息工程，毕业后做了两年的图像处理工程师，在硕士期间的研究方向是机器学习。

在大学二年级下学期（2013年）的时候，无意之间发现了树莓派(英文叫做Raspberry Pi)，一瞬间就被它的小巧，功能强大折服。原来电脑还可以是这样的。也是从那个时候我开始接触Linux操作系统，Python语言等。我的本科毕业设计也是用树莓派做了一个扫描翻译的机器。后来也因为这个毕业设计和成像扫描有关，我到了上海一家做自动识别的公司，从事图像处理的工作。由于工作的需要，同样也是自己的兴趣，我决定考研继续学习。正是因为从树莓派上面学到的Linux和Python的知识促使我一步一步向机器学习这个方向靠拢，促使我在研究生阶段选择了机器学习这个方向。可以说这个小小的计算机真正地改变了我的生活。

## 二. 目的
从2013年到如今(2019),使用Python也快六年了。周围也有很多伙伴想要学习Python,无奈很多人对于学习编程这件事都有一种固有的观念--编程很难。我想了很久，如何让编程看起来不是那么难？如何让它看起来有趣？如果我作为一名初学编程的人我希望怎么学习？ 如何让编程看得见？ 其中最后一个问题启发了开启这个教程。我将会用Python控制最简单的电子元器件，让编程和实实在在的物体交互，希望能够让你真真切切感受你在编程，你在控制这个世界。最后通过Python完成一个实体游戏机Steady Hand来综合运用这个教程里提到的知识，带你入门Python。

## 三. 目录 
下面是主要的内容:

|     内容      | 知识点 |
| ----------------------- | --------------------- |
| 1. Python简介 |Python是怎么来的？Python是什么意思?Python怎么发音?|
| 2. Python环境 |Python有哪两种常见的**两种模式**?如何编写,运行Python程序? Python如何**注释**?|
| 3. 用Python问候这个世界 |Hello World程序是怎么来的? 有什么意义?|
| 4. 用Python控制LED灯 |如何Python控制硬件?如何用Python点亮LED灯?|
| 5. Blink LED |如何利用Python**控制时间**? 如何编写**while循环**语句? 如何**处理异常**?|
| 6. Python检测按键状态 |如何编写**if语句**? 如何使用Python**检测按键**的状态?|
| 7. 编写更优雅的程序|什么是**模块化的编程思想**?如何一步步**优化程序**?如何编写**for循环**语句?|
| 8. 播放音乐|如何使用Python**播放音乐**?|
| 9. 记录挑战成功数据|如何**记录时间**? 如何**写入和读取文件**?|
| 10. 面向对象的编程|什么是**面向对象的编程**?如何写面向对象的程序?|
| 11. Steady Hand游戏设计|什么是Steady Hand? 如何编写游戏程序? 如何**调试程序**? 如何让游戏更好玩?|
那就让我们开始吧！

## 四. 主要内容
## 1. Python是什么？为什么使用Python? Python怎么发音?

我们这里所说的Python呢，指的是一门程序语言。Python传说是这样子来的: 1989年的圣诞节，一个荷兰的年轻人吉多·范罗苏姆(Guido van Rossum)觉得很无聊便开发了一门程序语言来打发时间，于是一门新的程序语言便诞生了，它便是后来的Python。至于为什么会叫做Python(一种蟒蛇)呢? 这其实也很随意。那是因为那时有一部喜剧电视《Monty Python's Flying Circus》里面包含了这个词语。作者的初衷是很简单的，但是一不小心却改变了世界。

为什么要使用Python呢? 世上编程语言千千万，为啥要选Python？ 我想到一个常常被Python使用者提到的话"人生苦短，我用Python", 为什么这样说呢? 如今Python已经成为全世界最受欢迎的编程语言之一，全世界人民用Python开发了大量的函数库，你可以使用简单的几条语句实现很复杂的功能。这样可以让你专注于你要解决的问题, 而不用拘泥于细节，从而节约了大量的开发时间。另外一方面是Python太流行了，全世界都在用Python, 英国有的5岁小孩就开始玩树莓派，用的编程语言就是Python。所以为什么不选择Python呢?

我还想强调的一点就是Python的发音，这个音不是那么好发。Python `['paiθɑn]`, 前面的`Py`年`[pai]`,和圆周率的Pi的发音是一样的，这没有什么问题。之后的`th`发`θ`， 咬住舌头即可。`on`就是`on the table`里面`on`的发音。注意体会一下。

在这一节，你可以了解到:
- *Python是怎么来的*
- *为什么要使用Python*
- *Python的正确发音*

## 2. Python环境
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
## 3. 用Python来问候这个世界
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

## 4. 使用Python控制LED灯
很多时候，我们认为计算机像是台式机或者笔记本电脑，但树莓派向我们展示了计算机的另外一种形式。对我而言，树莓派最吸引我的地方并不是它有多小，而是树莓派有40个外接的引脚，通过外接的引脚我们可以和物理世界交互，从而完成各种有趣的应用。我们来看看树莓派的[引脚图](https://pinout.xyz/)吧:
<p align="center">
<img src='/images/python/use_pi_to_learn_python/pi_pinout.png' width=500>
</p>
图中展示了两种引脚编号的方式，其中一种是物理引脚编号，也就是从1到40；另一种叫做Broadcom编号模式，也就是我们接下来要使用的模式。接下来我们将要使用Python来控制一个LED灯。

首先，来看一个简单的电路图:
<p align="center">
<img src='/images/python/use_pi_to_learn_python/led_on_schematic.png' width=500>
</p>
从这个电路中可以看到，若`GPIO17`输出高电平，那么整个回路中存在电势差，则有电流流过LED,可以预测LED会被点亮。反之，`GPIO17`若输出低电平，LED不会被点亮。根据原理图，我们搭建下面的电路:

<p align="center">
<img src='/images/python/use_pi_to_learn_python/led_on_breadboard.png' width=500>
</p>

硬件电路搭建好了，接下来就该我们的Python上场了。按照前面的讨论我们需要控制`GPIO17`的输出电平。当然，这不会很难。在树莓派的Python库中有这个一个叫做`RPi.GPIO`的库可以帮我们完成这项操作。为了演示的方便，我们直接在树莓派终端输入`python`，进入Python的交互模式，然后依次输入下面的命令:
```python
>>> import RPi.GPIO as GPIO
>>> GPIO.setmode(GPIO.BCM)
>>> GPIO.setup(17, GPIO.OUT)
>>> GPIO.output(17, True)
>>> 
```
哈哈，你注意到什么了吗? 看看你的效果是不是和我一样呢? 
<p align="center">
<img src='/images/python/use_pi_to_learn_python/led_on_real.png' width=500>
</p>
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

## 5. Blink LED
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

当然有，我们可以使用`while`循环语句。
`while`语句的特征[1]:
- `while`关键字
- 一个条件(一个表达式，它的值是`True`或者`False`)
- 一个冒号
- 一组缩进的代码

我把上面的程序改成下面的程序`blink_led_while.py`:
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
这里的`while`就是`while`循环语句的标志，　其后接一个条件表达式，在我们这里的表达式是`counter < 4`, Python会判断`counter`是不是小于`4`, 若是，那么这个表达式`counter < 4`就是正确的，在Python里面用`True`来表示正确。反之用`False`来表示假。在我们这个例子中`counter`最开始的值是`0`, 因此在第一次循环的时候`counter < 4`其实就是`0 < 4`, 当然这个表达式为真，因此程序继续执行`while`里面的内容(一组缩进的代码)，也就是这一部分:
```python
    GPIO.output(17, True) # LED 亮
    time.sleep(0.5) # 延时0.5秒
    GPIO.output(17, False) # LED 灭
    time.sleep(0.5) # 延时0.5秒
    counter = counter + 1
```
运行试试看吧。若是我们想要它一直闪烁，直到我们发出信号说停止才停止，那应该怎么做呢? 
```python
# -*- coding: utf-8 -*-
import time # 导入时间模块
import RPi.GPIO as GPIO # 导入GPIO引脚控制模块

GPIO.setmode(GPIO.BCM) # 使用BCM引脚编号模式
GPIO.setup(17, GPIO.OUT) # 设置GPIO17为输出引脚
try:
    counter = 0
    while True: # 无限循环 
        GPIO.output(17, True) # LED 亮
        time.sleep(0.5) # 延时0.5秒
        GPIO.output(17, False) # LED 灭
        time.sleep(0.5) # 延时0.5秒
        counter = counter + 1
except KeyboardInterrupt:
    print('Exiting ...')
    GPIO.cleanup()
```
这里面需要提到的是:
- `while True:`表示无限循环，　程序会永无止境地执行下去。
- `try:`, `except:` 是搭配起来使用的结构。在一般的情况下，程序会运行`try:`内部的代码；直到出现异常情况程序会才会运行`except:`内部的代码。例如在我们的例子中，首先我们运行程序，可以看到LED灯在不停的闪烁。然后我们按下`Ctrl C`发出一个键盘中断信号。程序会接收这个异常行为，判断该异常行为属于`KeyboardInterrupt`,于是便执行`except KeyboardInterrupt:`的内部代码，从而结束程序的运行。

这一节我们通过完成`Blink LED`可以了解到:
- `while`循环语句的使用
- 条件表达式的真假
- `try:` `except:`语句处理异常情况

## 6. 使用Python检测按键状态
在这节中，我们会用Python检测按键的状态，根据按键不同的状态来做出不同的反应[2]。首先，让我们来看一看按键的物理特性,如图:
<p align="center">
<img src='/images/python/use_pi_to_learn_python/push_button.svg' width='50%'> 
</p>
它有这几个关键的性质:
1. 数字相同的引脚内部是相连的
2. 数字不同的引脚内部是断开的
3. 当按下按键后,数字不同的引脚由断开状态变为相连的状态

按照给出的原理图: 
<p align="center">
<img src='/images/python/use_pi_to_learn_python/button_led_shematic.png' width='50%'>
</p>
搭建出下面的电路:
<p align="center">
<img src='/images/python/use_pi_to_learn_python/button_led.png' width='50%'>
</p>
接下来，我们通过编程来获取第一个按键开关的状态。编写程序`detect_button.py `: 
``` python
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)

while True:
    input_state = GPIO.input(27)
    if input_state == False:
        print('Button Pressed')
        time.sleep(0.2)
```

在上面的程序里面:
1. `GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)` 设置`GPIO27`引脚为输入引脚，并设置为引脚**上拉**,即`pull up`模式。上拉模式的内部原理如下:
<p align="center">
<img src='/images/python/use_pi_to_learn_python/pullup.svg' width='50%'>
</p>

在设置`GPIO27`的引脚为输入引脚上拉模式后, 树莓派检测到的引脚电平为高电平(True), 当按下按键后，树莓派检测到`GPOI27`的电平为低电平(False)。

2. 通过无限循环来检测`GPIO27`的输入电平，如果检测到低电平(即第一个按键被按下), 则终端打印输出`Button Pressed`。

3. 第一次出现了`if`语句，它有下面的几个特征:
    - `if`关键字
    - 一个条件(一个为`True`或者`False`的表达式)
    - 一个冒号
    - 一组缩进的代码

当条件为`True`时，执行一次`if`的缩进代码；否则不执行`if`缩进代码。
运行`detect_button.py`，　按下第一个按键，看看有什么反应。退出程序记得按`Ctrl C`。

**练习**:

结合现在了解到的知识，你能够设计实现通过按下第二个按键点亮LED灯的程序吗？

通过本节，我们可以了解到:
- `if`语句的基本语法
- 使用Python检测按键的状态

## 7. 一步一步编写更优雅的程序
到这里我们已经用做了两个小应用了，包括:
- Blink LED
- 用按键控制LED灯的亮灭

因此是时候讲一讲怎么样编写更优雅的程序了。本节我们实现这样一个功能:

**当按下按键1,LED以5次/s的速度闪烁50次;当按下按键2,LED以10次/s的速度闪烁50次;**

更好的程序有一个基本的原则是程序模块化，我们将有固定功能的程序段放在一起，作为一个功能模块。这样当我们使用这个功能的时候直接调用这个功能模块。这里功能模块专业的名字叫做**函数**,我们通过函数使得程序更为模块化。首先我们先以我们现有的知识来实现上面提到的功能。

我们先来想一想大体的思路: 首先，应该是引脚初始化，和LED相连的引脚应该设置成输出，和Button相连的引脚应该设置成上拉输入模式；其次，我们要在一个无限循环里面检测按键的不同状态；最后，判断出不同的状态，然后用亮灭和时间控制，计数等来控制LED的闪烁快慢和次数。简单的功能，实现起来还不是那么简单呢。让我们开始吧！

第一步, 函数库的导入和引脚初始化等
```python
# -*- coding: utf-8 -*-
import RPi.GPIO as GPIO # GPIO引脚库
import time # 用来控制时间


GPIO.setmode(GPIO.BCM) # 设定采用的引脚模式
GPIO.setup(17, GPIO.OUT) # 设置与LED相连的引脚: GPIO17为输出引脚

# 设置与Button相连的两个引脚为输入引脚，上拉模式
GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)
```

第二步，检测按键的状态
首先，在这里，按键状态的检测是一个不断检测的过程，也叫做循环检测，因此我们使用`while True:`来实现无限循环；其次，检测按键分为两个步骤:1.检测到有按键按下．2.判断出是哪一个Button被按下。根据这个思路我们编写下面的按键检测程序: 
```python
while True:
    # 读取两个输入引脚的状态
    button1_state = GPIO.input(27)
    button2_state = GPIO.input(22)
    # 判断是否有button被按下
    if button1_state == False or button2_state == False: # 有Button被按下
        # 判断是哪一个键被按下
        if button1_state == False: # 第一个Button被按下
            # 慢闪50下
            pass
        else:# 第二个Button被按下
            # 快闪50下
            pass
    else:
        time.sleep(0.2)
```
这里需要解释下面几点:
1. `if` `else`语句, 前面我们介绍了`if`语句, 没有指定当`if`的条件为`False`的时候做什么操作;这里的`if` `else`语句，当`if`的条件满足的时候则执行`if`的缩进代码段，否则执行`else`的缩进代码段。在我们这里`else`对应的缩进代码段为`time.sleep(0.2)`.这句话的的唯一作用就是给树莓派减负，暂停运算`0.2s`.
2. `pass`代表什么也不做。它存在的意义是为了使得程序的结构完整。因为我们在这一步还没有添加对应Button按下后闪烁LED的程序，因此我们使用pass在对应的位置占位使得程序的结构完整。


第三步，添加不同Button对应的LED闪烁函数
以5次/s的速度闪烁50次可以用下面的程序语言来表示:
```python
counter1 = 0
t = 1./5./2.
while counter1 < 50:
    GPIO.output(17, True)
    time.sleep(t)
    GPIO.output(17, False)
    time.sleep(t)
    counter1 = counter1 + 1
```
以每秒10次的速度闪烁50次可以用下面的程序语言来表示:
```python
counter2 = 0
t = 1./10./2.
while counter1 < 50:
    GPIO.output(17, True)
    time.sleep(t)
    GPIO.output(17, False)
    time.sleep(t)
    counter2 = counter2 + 1
```

第四步，组合起来。
编写程序`control_led_with_button.py`,内容如下:
```python
# -*- coding: utf-8 -*-
import RPi.GPIO as GPIO # GPIO引脚库
import time # 用来控制时间


GPIO.setmode(GPIO.BCM) # 设定采用的引脚模式
GPIO.setup(17, GPIO.OUT) # 设置与LED相连的引脚: GPIO17为输出引脚

# 设置与Button相连的两个引脚为输入引脚，上拉模式
GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)

while True:
    # 读取两个输入引脚的状态
    button1_state = GPIO.input(27)
    button2_state = GPIO.input(22)
    # 判断是否有button被按下
    if button1_state == False or button2_state == False: # 有Button被按下
        # 判断是哪一个键被按下
        if button1_state == False: # 第一个Button被按下
            # 慢闪50下
            counter1 = 0
            t = 1./5./2.
            while counter1 < 50:
                GPIO.output(17, True)
                time.sleep(t)
                GPIO.output(17, False)
                time.sleep(t)
                counter1 = counter1 + 1
        else:# 第二个Button被按下
            # 快闪50下
            counter2 = 0
            t = 1./10./2.
            while counter2 < 50:
                GPIO.output(17, True)
                time.sleep(t)
                GPIO.output(17, False)
                time.sleep(t)
                counter2 = counter2 + 1
    else:
        time.sleep(0.2)
```
这个程序基本可以实现功能了，但是还没有对键盘中断做出相应的处理，在第二次运行程序的时候会出现下面的警告:
```bash
RuntimeWarning: This channel is already in use, continuing anyway.  Use GPIO.setwarnings(False) to disable warnings.
```
那是因为，我们没有在退出时候使GPIO的引脚恢复到默认的设置。因此我们在下一步添加对应的功能。
`control_led_with_button_ctrl_c.py`,内容如下:
```python
# -*- coding: utf-8 -*-
import RPi.GPIO as GPIO # GPIO引脚库
import time # 用来控制时间


GPIO.setmode(GPIO.BCM) # 设定采用的引脚模式
GPIO.setup(17, GPIO.OUT) # 设置与LED相连的引脚: GPIO17为输出引脚

# 设置与Button相连的两个引脚为输入引脚，上拉模式
GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)
try:
    while True:
        # 读取两个输入引脚的状态
        button1_state = GPIO.input(27)
        button2_state = GPIO.input(22)
        # 判断是否有button被按下
        if button1_state == False or button2_state == False: # 有Button被按下
            # 判断是哪一个键被按下
            if button1_state == False: # 第一个Button被按下
                # 慢闪50下
                counter1 = 0
                t = 1./5./2.
                while counter1 < 50:
                    GPIO.output(17, True)
                    time.sleep(t)
                    GPIO.output(17, False)
                    time.sleep(t)
                    counter1 = counter1 + 1
            else:# 第二个Button被按下
                # 快闪50下
                counter2 = 0
                t = 1./10./2.
                while counter2 < 50:
                    GPIO.output(17, True)
                    time.sleep(t)
                    GPIO.output(17, False)
                    time.sleep(t)
                    counter2 = counter2 + 1
        else:
            time.sleep(0.2)
# 处理按键中断，安全退出程序
except KeyboardInterrupt:
    print('Exiting ...')
    GPIO.cleanup()
```
第五步, 使用函数让程序模块化
在这一步中我们首先想想，我们的程序有哪些主要功能:
- 初始化引脚
- 读取输入引脚状态
- LED闪烁
那现在我们就把这几个功能定义为函数吧:
```python
# 初始化引脚
def setup():
    GPIO.setmode(GPIO.BCM) # 设定采用的引脚模式
    GPIO.setup(17, GPIO.OUT) # 设置与LED相连的引脚: GPIO17为输出引脚

    # 设置与Button相连的两个引脚为输入引脚，上拉模式
    GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)
```

```python
def readPinStatus(pinNum):
    status = GPIO.input(pinNum)
    return status
```

```python
def buttonPressed(button1_state, button2_state):
    return (button1_state == False or button2_state == False)
```

```python
def blink(speed, times):
    counter = 0
    t = 1./speed/2.
    while counter < times:
        GPIO.output(17, True)
        time.sleep(t)
        GPIO.output(17, False)
        time.sleep(t)
        counter = counter + 1    
```

```python
def safeExit():
    print('Exiting ...')
    GPIO.cleanup()
```

从上面的例子中可以了解到，函数有下面这些特征:
1. 包含 `def` 关键字
2. 有一个和功能相关的函数名，例如这里的`setup`
3. 可以携带参数，在括号里面,第一个例子我们没有传入参数
4. 有带有缩进的程序段
5. 可以有返回值

接下来我们定义一个主函数`main()`, 主函数调用前面的函数，来控制整个程序。

```python
def main():
    setup()
    try:
        while True:
            button1_state = readPinStatus(27)
            button2_state = readPinStatus(22)
            if buttonPressed(button1_state, button2_state):
                if button1_state == False:
                    blink(5,50)
                else:
                    blink(10,50)
            else:
                time.sleep(0.2)
    except KeyboardInterrupt:
        safeExit()
```

最后调用`main()`函数, 把上面的部分写在`control_led_with_functions.py`,内容是下面的样子:
```python
# -*- coding: utf-8 -*-
import RPi.GPIO as GPIO # GPIO引脚库
import time # 用来控制时间

################################
# 1. 函数定义
################################
# 引脚初始化函数
def setup():
    GPIO.setmode(GPIO.BCM) # 设定采用的引脚模式
    GPIO.setup(17, GPIO.OUT) # 设置与LED相连的引脚: GPIO17为输出引脚

    # 设置与Button相连的两个引脚为输入引脚，上拉模式
    GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# 输入引脚状态读取函数
def readPinStatus(pinNum):
    status = GPIO.input(pinNum)
    return status

# 判断是否有键被按下
def buttonPressed(button1_state, button2_state):
    return (button1_state == False or button2_state == False)

# LED闪烁函数
def blink(speed, times):
    counter = 0
    t = 1./speed/2.
    while counter < times:
        GPIO.output(17, True)
        time.sleep(t)
        GPIO.output(17, False)
        time.sleep(t)
        counter = counter + 1

# 安全退出函数
def safeExit():
    print('Exiting ...')
    GPIO.cleanup()

# 主函数
def main():
    setup()
    try:
        while True:
            button1_state = readPinStatus(27)
            button2_state = readPinStatus(22)
            if buttonPressed(button1_state,button2_state):
                if button1_state == False:
                    blink(5,50)
                else:
                    blink(10,50)
            else:
                time.sleep(0.2)
    except KeyboardInterrupt:
        safeExit()


#######################################
# 函数调用
#######################################
main()
```
模块化设计思想使得程序的结构变得清晰了，当我们的程序变得越来越复杂的时候，我们越应该要重视模块化的思想。当然，结构清晰了之后，我们调试程序也会变得更容易。随着你对Python越来越熟练，你就会对模块化设计有越来越深刻的体会。

其实，我们还可以对上面的`blink()`函数做修改，使得程序更加简洁。

第六步:使用`for`循环优化`blink()`函数
注意到现在我们的`blink`函数是这样的:
```python
def blink(speed, times):
    counter = 0
    t = 1./speed/2.
    while counter < times:
        GPIO.output(17, True)
        time.sleep(t)
        GPIO.output(17, False)
        time.sleep(t)
        counter = counter + 1  
```
这里面有个`while`循环语句，因为要计数，所以我们还要定义一个计数器`counter`,在每次闪烁后`counter`的值加1。这样其实是不够优雅的。同样的功能我们可以通过`for`循环来实现:
```python
def blink(speed, times):
    t = 1./speed/2.
    for i in range(times):
        GPIO.output(17, True)
        time.sleep(t)
        GPIO.output(17, False)
        time.sleep(t)
```
这里的`i`充当了`counter`的计数功能，但是不用我们去写自加的操作，达到了简化的功能。

在这一节中，我们可以了解到:
- 如何将大问题分解成一个个的小问题
- 模块化的编程思想
- 如何一步步优化程序
- 如何编写函数
- `if...else...`语句的使用
- `pass`的用途
- `for`循环语句的编写

## ８. 播放音乐
现在我们来对我们最后的游戏添加背景音乐。这里我们用来加载音乐的函数库叫做`pygame`, 默认树莓派是已经安装好了这样一个Python函数库。接下来我们实现下面的两个主要功能:
1. 播放背景音乐
2. 通过两个按键来控制音量

编写程序`load_bgm.py`, 内容如下:
```python
# -*- coding: utf-8 -*-
import pygame
import time
import RPi.GPIO as GPIO

# Set the valume between 0 to 100
def setVolume(volume):
    if volume >= 0 and volume <=100:
        volumeValue = volume/100.
        pygame.mixer.music.set_volume(volumeValue)
        print('Volume: ' + str(volumeValue))
    else:
        print('Ooops, Please set the valid volume.')

def getVolume():
    volumeValue = 100.*pygame.mixer.music.get_volume()
    return volumeValue

def volumeUp(stepSize):
    if stepSize <=0 :
        print('Oooops, Please give the valid stepsize')
        return False

    currentVolume = getVolume()
    newVolume = -1
    if currentVolume + stepSize > 100:
        newVolume = 100
    else:
        newVolume = currentVolume + stepSize
    setVolume(newVolume)
    return True

def volumeDown(stepSize):
    if stepSize <=0 :
        print('Oooops, Please give the valid stepsize')
        return False

    currentVolume = getVolume()
    newVolume = -1
    if currentVolume - stepSize < 0:
        newVolume = 0
    else:
        newVolume = currentVolume - stepSize
    setVolume(newVolume)
    return True

def musicSetup(musicfile, looptimes, volume):
    pygame.mixer.init()
    pygame.mixer.music.load(musicfile)
    pygame.mixer.music.play(looptimes)
    setVolume(volume)

def pinSetup():
    GPIO.setmode(GPIO.BCM) # 设定采用的引脚模式
    GPIO.setup(17, GPIO.OUT) # 设置与LED相连的引脚: GPIO17为输出引脚
    # 设置与Button相连的两个引脚为输入引脚，上拉模式
    GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# 输入引脚状态读取函数
def readPinStatus(pinNum):
    status = GPIO.input(pinNum)
    return status

# 判断是否有键被按下
def buttonPressed(button1_state, button2_state):
    return (button1_state == False or button2_state == False)


def main():
    musicSetup(musicfile='./music/creativeminds.mp3', looptimes=2, volume=10)
    pinSetup()
    try:
        while True:
            button1_state = readPinStatus(27)
            button2_state = readPinStatus(22)
            if buttonPressed(button1_state,button2_state):
                if button1_state == False:
                    volumeUp(5)
                    time.sleep(0.2)
                else:
                    volumeDown(5)
                    time.sleep(0.2)
            else:
                time.sleep(0.2)
    except KeyboardInterrupt:
        print('Exiting safely ...')
        GPIO.cleanup()

main()

```
## 9. 记录挑战成功数据
在游戏Steady Hand的挑战中，当挑战者成功后我们记录下挑战所用的时间和挑战成功的时刻。这里主要涉及到了两个要点: 时间的记录和文件的写入。首先我们来尝试记录挑战时间。编写程序`learn_time.py`,内容如下:
```python
# -*- coding: utf-8 -*-
import time
start_time = time.time()

# 下面一段用来模拟玩游戏的过程，消耗一定的时间
#####################################
for i in range(5):
    time.sleep(1.2)
    print('Come on, you can do it.')
#####################################
end_time = time.ctime()
time_consume = time.time() - start_time
print('Time you spent: ' + str(time_consume) +'s.')
print('You complete the challenge at ' + end_time)
```
上面一段代码的运行结果如下:
```bash
Come on, you can do it.
Come on, you can do it.
Come on, you can do it.
Come on, you can do it.
Come on, you can do it.
Time you spent: 6.00714087486s.
You complete the challenge at Mon Mar 25 21:29:14 2019
```
在上面的代码中:
- `time_consume`记录下了游戏过程消耗的时间。`time.time()`记录的是从开始计时的时刻(Linux下是1970年1月1号)到运行`time.time()`过的秒数。我们在游戏开始的时候记录下这个秒数`start_time`, 在挑战成功后再次记录一个秒数`time.time()`, 两者作差，即可得到挑战所用的时间。
- `time.ctime()`记录的是一个包含年，月，日，时，分，秒，周的时间数据，可以用来记录挑战者挑战成功的时刻。

接下来我们将需要的两个数据`time_consume`和`end_time`写入到文件里面，作为挑战成功的记录。
在上面的基础上我们添加最后3行代码，保存为`save_record.py`, 内容如下:
```python
# -*- coding: utf-8 -*-
import time
start_time = time.time()

# 下面一段用来模拟玩游戏的过程，消耗一定的时间
#####################################
for i in range(5):
    time.sleep(1.2)
    print('Come on, you can do it.')
#####################################
end_time = time.ctime()
time_consume = time.time() - start_time
print('Time you spent: ' + str(time_consume) +'s.')
print('You complete the challenge at ' + end_time)

f = open('record.csv','a')
f.write(str(time_consume) + ' , ' + end_time + '\n')
f.close()
```
在上面的语句中:
- `f = open('record.csv','a')`以追加(append)的方式打开一个文件`record.csv`。如果没有这个文件则创建这个文件。使用`'a'`的原因是我们希望新的记录不会覆盖掉原来的记录。
- `f.write(str(time_consume) + ' , ' + end_time + '\n')` 将数据写入到文件。其中由于`time_consume`的类型不是字符串, 因此我们使用`str(time_consume)`来将数字转换为字符串以写入文件。`end_time`由于它的值本身就是字符串，因此不需要做转换的操作。在两组数据中间，我们添加`' , '`用来分割两部分数据。在最后添加一个换行符使得每条记录独占一行。

多运行几次`save_record.py`，观察`record.csv`内容的变化(使用`cat record.csv`命令)，是否符合你的预期。

在这一节中，我们可以了解到:
- 记录时间的方法
- 将数据写入(追加)到文件的方法

## 10. 面向对象的编程
什么是对象(object)? 我们这里的LED灯就是一个对象。那这里的LED灯有哪些性质呢? 颜色，大小，形状等都是。那LED可以做什么什么呢? 可以亮，可以灭，可以闪烁。这里的颜色，大小，形状，亮，灭，闪烁都是和LED有关的。因此我们在编程的时候可以将LED作为一个确定的对象(实例化的对象)来处理，这样的处理方式一方面可以使得我们编程结构清晰，另一方面这种面向对象的编程方式也是符合常规的思维方式，是很自然的。

这里我们用LED这个对象来熟悉面向对象的编程方式:
```python
# -*- coding: utf-8 -*-
import time
import RPi.GPIO as GPIO

class LED:
    def __init__(self):
        self.color = 'green'
        self.size = 'little'
        self.setup()

    def setup(self):
        GPIO.setup(17, GPIO.OUT)

    def show_info(self):
        print(self.color, self.size)

    def turn_on(self):
        GPIO.output(17, True) 

    def turn_off(self):
        GPIO.output(17, False)

    def blink(self, times, frenquency):
        if times <= 0 or frenquency <=0:
            print('Oooops, please give the \
                  right times or frequency')
            return
        else:
            period = 1./frenquency
            for i in range(times):
                self.turn_on()
                time.sleep(period/2.)
                self.turn_off()
                time.sleep(period/2.)
```
在上面的代码中，我们定义一个对象LED,这里使用`class`关键字来表示定义一个对象类型。当一个LED对象被创建(实例化)的时候都会立马执行这个对象里面的初始化函数`__init__()`, 这个初始化函数里面通常是定义一些这个类的属性，和运行一些初始化的代码。例如这里的LED的颜色，大小和引脚初始化函数。类里面定义的函数，叫做这个类的方法。因此这里的`setup(),show_info(),turn_on(),turn_off(),blink()`都是LED类的方法，他们表示LED类可以做的事。

类定义好了之后，我们就需要使用这个类。也就是实例化一个类，得到一个具体的对象。然后操作对象。如下:
```python
gLed = LED()
gLed.show_info()
gLed.turn_on()
time.sleep(1)
gLed.turn_off()
gLed.blink(times=20,frenquency=100)
```
上面的代码中:
- `gLed = LED()`: 得到一个具体的对象`gLed`,这个过程也叫做类的实例化；
- `gLed.show_info()`：对象`gLed`使用方法`show_info()`来获得LED类的颜色和大小的属性。这里的点`.`，表示的就是使用方法的意思。`.`在这里好像有魔法一样，慢慢你会感慨`.`操作真的是很方便；
- `gLed.turn_on()`：开灯；
- `gLed.blink(times=20,frenquency=100)`：以100hz的频率闪烁20次。

将上面的代码写到文件`OOP.py`中，内容如下:
```python
# -*- coding: utf-8 -*-
import time
import RPi.GPIO as GPIO

class LED:
    def __init__(self):
        self.color = 'green'
        self.size = 'little'
        self.setup()

    def setup(self):
        GPIO.setup(17, GPIO.OUT)

    def show_info(self):
        print(self.color, self.size)

    def turn_on(self):
        GPIO.output(17, True) 

    def turn_off(self):
        GPIO.output(17, False)

    def blink(self, times, frenquency):
        if times <= 0 or frenquency <=0:
            print('Oooops, please give the \
                  right times or frequency')
            return
        else:
            period = 1./frenquency
            for i in range(times):
                self.turn_on()
                time.sleep(period/2.)
                self.turn_off()
                time.sleep(period/2.)


def setup():
    GPIO.setmode(GPIO.BCM)

def safeExit():
    GPIO.cleanup()
    exit()

def main():
    try:
        print('The first try of OOP')
        setup()
        gLed = LED()
        gLed.show_info()
        gLed.turn_on()
        time.sleep(1)
        gLed.turn_off()
        gLed.blink(times=20,frenquency=20)
        safeExit()
    except KeyboardInterrupt:
        print('\nKeyboardInterrupt Detected.')
        safeExit()

main()
```
在开始游戏机程序的编写之前，我们必要将我们的LED, 按键，音乐播放等功能定义成不同的类。因为在Steady Hand游戏中我们需要用到各种模块，因此我们需要将这些模块用面向对象的编程方式组织好，这样可以方便程序的编写和调试。

在这节中, 我们可以了解到:
- 什么是面向对象的编程
- 如何编写面向对象的程序

## 11. Steady Hand游戏设计
开始这节学习之前，我们先来看看Steady Hand游戏是怎么回事。

<p align="center">
<iframe src="//player.bilibili.com/player.html?aid=48432827&cid=84825562&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width=480 height=380> </iframe>
</p>

整个游戏有一个开始点，一个挑战终点，在开始点和结束点之间有一根铜丝。游戏规则是这样: 
挑战者需要拿着一个铁环，不断调整角度，方向，将铁环从开始点移动到挑战终点。在整个挑战过程中，铁环不能接触铜丝，否则挑战失败。

现在我们一边玩，一边想如何编程实现这样一个游戏。

在开始的时候我们需要用铁环触碰开始点，那如何检测到我是否触碰到了开始点呢? 对，靠电平信号。我们将铁环(记铁环为`D`)和树莓派的`GND`相连，将和开始位置相连的GPIO口引脚(这里记为`A`)，设置为输入模式，并设置成电平上拉模式(这样在铁环没有接触开始位置的时候，开始位置对应于高电平)。因此在开始的部分我们可以这样做，不停地检测开始位置的电平，若是开始位置`A`的电平由高变低，那么游戏就开始了。就像是赛跑一样，信号枪声一响起，裁判便按下计时器，开始计时。这里我们也把开始的时刻给记录下来(我们记为`T1`)，到挑战成功后，便可以用来计算挑战所用的时间了。

在游戏开始后，我们的背景音乐响起。如何播放音乐? 你还记得吗。如果不记得了，到第8小节看看吧。播放音乐在这里可以想象成按下了一个播放按钮，也就是启动了一个开关。按下这个开关后，我们便不需要管音乐播放的事了。那这段空闲应该做什么呢? 

你看这时挑战者在不停地移动铁环，好像没有程序什么事。好像真的没有什么事做? 真的是这样吗? 当然不是，你看当铁环触碰到铜丝的时候，树莓派便发出语音警告`干什尼？`(做什么啊?)。也就是说在移动铁环的过程中树莓派一直在检测铁环有没有触碰到铜丝，一旦触碰到，马上做出反应。如何检测的呢? 方法和检测触碰开始位置的方法一样。铜丝和树莓派的一个引脚(记为`C`)相连，同样把铜丝的引脚`C`设置成上拉输入模式，因此在没有铁环接触到铜丝的时候呢，引脚`C`的是高电平。一旦铁环触碰到铜丝，那么引脚`C`的信号便变成了低电平。立刻做出反应--播放语音提示`干什尼？`表示挑战失败。失败后需要重新回到开始位置，重新计时。

若是在挑战过程中，铁环没有触碰到铁丝,一直成功地到了结束位置，这时挑战者需要用铁环触碰结束位置，以此告诉树莓派挑战成功了。一旦树莓派收到挑战成功的信号，那么它立刻会记录这时的时刻(记为`T2`)。 利用最开始记录的`T1`和挑战成功记录的`T2`，那么就可以很容易的得到挑战用的时间`T = T2 - T1`。然后播放挑战成功的语音提示--一串笑声`Hahahaha`, 播放用时多久。

程序的思路就是这样，接下来就是具体怎么去完成这样一个项目了。
在编写程序之前，我们准备游戏的硬件。就像下面一样[3]: 

<p align="center">
<img src='/images/python/use_pi_to_learn_python/steadyhand.svg' width=500>
</p>

对照第4节里面的引脚图，将A,B,C,D和树莓派对应引脚相连，如下: 
<p align="center">
<img src='/images/python/use_pi_to_learn_python/steady_hand_connect.svg' width='50%'>
</p>

接下来为游戏编写程序, 这里我把v2.0主程序的`main()`写在下面: 
```python
def main():
    print("***** Welcome To The Steady Hand Challenge *****")
    setUp()
    musicSetup(volume=30)

    bgmSound = './music/creativeminds_l.mp3'
    startSound = './music/start_ad_01.mp3'
    ooopsSound = './music/ooops_ya_01.mp3'
    endSound = './music/end_fql_01.mp3'
    badSound = '/music/ooops_ya_02.mp3'

    dum = 0
    start_rest = 4
    end_rest = 0
    wire = 1

    while True:
        print(">> To Start Move the loop to the start rest")
        stopPlay()
        # Wait for the iron loop to touch the
        # Start rest A
        while GPIO.input(start_rest) != 0:
            time.sleep(0.2)
        # print(">> Start when you are ready")
        play(startSound,5) 
        time.sleep(0.7)
        while GPIO.input(start_rest) == 0:
            time.sleep(0.01)
        play(bgmSound,-1)
        print(">> Game Start, keep moving......")
        start_time = datetime.datetime.now()
        errorCounter = 0
        happyFlag = True
        while GPIO.input(end_rest) != 0: 
            if GPIO.input(wire) != 0:
                time.sleep(0.01)
            else:
                play(ooopsSound,1)
                time.sleep(1)
                errorCounter = errorCounter + 1
                happyFlag = False
                print('>> Ooops, Game Over')
                break
        end_time = datetime.datetime.now()
        total_time =(end_time  - start_time).seconds
        print('>> Time: ' + str(total_time) + 's')
        stopPlay()
        if happyFlag == True:
            print('>> Congratulations, You win!')
            play(endSound,1)
            time.sleep(2)
            tellTimeUsed(total_time)
        else:
            pass
```
好了，通过这一节的游戏设计，我们把前面学到的知识又复习了一遍，希望你可以把这个游戏完成，然后给周围的伙伴玩你做的游戏，他们或许能够给你提出一些需要优化的地方，这时你就可以针对他们的反馈更新你的程序，让游戏变得越来越好玩。希望你能够喜欢这个游戏，享受编程带给你的乐趣。

这个教程的所有例子在[这里](https://github.com/HuangJiaLian/UseRaspberryPiToLearnPython)都可以下载。

## 结语
一直以来我都想要做一个像这样的Python初级教程，现在终于初步完成了，我很开心。这套教程虽然简单，但是包含了Python最基本的概念，如果你是一步步一边学一边写，那么恭喜你，你已经入门Python了。前方还有一片广阔的美丽新天地，就随着你自己的意愿不断探索吧。本科毕业这几年，其他老师的话没有记住多少，但教我《信号与系统》的老师奥本海姆的话却记忆深刻。他是这样说的: 

> Let me just comment that as a professor of mine once said which I never forgotten. The purpose of a set of lectures or of courses for that matter of anything you study is not really to cover a subject but to uncover the subject. 

> 一门课程不要试图去涵盖所有的内容，而是要去揭示这门学科的魅力。

希望我能够让你觉得编程其实挺好玩的，这也是对我最大的安慰了。

最后，不要忘记持续关注我哦。

1. 主页: [www.way2ml.com](www.way2ml.com)
2. 邮箱: jackhuang719668276@163.com
3. 微信: JackHuang_China 
4. Bilibili:[阿梁又叫Jack_Huang](https://space.bilibili.com/233674060)
5. Youtube: [Jack Huang](https://www.youtube.com/channel/UCSMCgLJ5gQwYrBCZ8pBY-cg?view_as=public)
6. Github: [HuangJiaLian](https://github.com/HuangJiaLian)

## 参考
[1] [https://automatetheboringstuff.com/chapter2/](https://automatetheboringstuff.com/chapter2/)<br>
[2] [http://razzpisampler.oreilly.com/ch07.html](http://razzpisampler.oreilly.com/ch07.html)<br>
[3] MagPi Issue 5: Steady Hand Fun With The RaspberryPi

**所需硬件**
- 树莓派3B
- 面包板
- 排线
- 电阻

<Livere/>

