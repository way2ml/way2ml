---
pageClass: python-class
---
# 使用Python检测按键状态
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

<Livere/>