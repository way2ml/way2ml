---
pageClass: python-class
---
# Blink LED
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

<Livere/>