---
pageClass: python-class
---
# 面向对象的编程
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

<Livere/>