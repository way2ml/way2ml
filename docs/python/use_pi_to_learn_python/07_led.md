---
pageClass: python-class
---
# 使用Python控制LED灯
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

<Livere/>