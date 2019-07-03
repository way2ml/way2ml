---
pageClass: python-class
---
# 一步一步编写更优雅的程序
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

<Livere/>