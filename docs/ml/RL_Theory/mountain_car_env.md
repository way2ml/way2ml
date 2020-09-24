---
pageClass: ml-class
---

 
# Mountain Car的环境分析

环境是强化学习中非常重要的一部分．在平时的学习中我们可能很少去关注环境，
但是你要知道，在面对一个实际的强化学习问题的时候我们是需要自己编写环境的。
今天我们就来看看我们常常会用到的过山车的环境背后都有些什么。
如果你想要了解更多请看[https://www.way2ml.com/ml/RL_Practice/a_start_to_use_Gym.html](https://www.way2ml.com/ml/RL_Practice/a_start_to_use_Gym.html)。


首先我们画出[MountainCar](https://gym.openai.com/envs/MountainCar-v0/)的轨道,这个轨道可不是随便画的一条线，它是有解析解的
$$
h = 0.45\sin(3x)+0.55
$$

```python
import numpy as np
import matplotlib.pyplot as plt
import os 

save_path = './img/'
if not os.path.exists(save_path): 
    os.mkdir(save_path)

SIZE = 1.5
plt.figure(figsize=(SIZE*6,SIZE*4))
plt.xlabel('x') 
plt.title('Mountain Car Track')
plt.xlim(-1.2,0.6)
x = np.linspace(-1.2,0.6,100)
plt.plot(x, np.sin(3*x)*0.45 + 0.55, 'k-',lw=2,label='h=sin(3x)*0.45 + 0.55')
plt.legend(loc='upper left')
plt.grid() 
plt.savefig(os.path.join(save_path,'MountainCarTrack'))
plt.show()
```

<p align='center'>
<img src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/MCarTrack.png'>
</p>

::: tip 环境的信息

- 轨道的表达式$h = 0.45\sin(3x)+0.55$;
- 车的质量$m=1$;
- 车受到的重力$\text{gravity} = 0.0025$;
- 位置$x$的范围$[-1.2, 0.5]$;
- 速度$v$的范围$[-0.07,0.07]$;
- 智能体在任意时刻$t$可采取的动作$A_t \in \{0,1,2\}$;
- 智能体的驱动力为$f = (A_t - 1)*0.001$;
- 智能体的状态$(x,v)$
- 终点位置$x=0.5$
:::

新状态通过下面的关系得到,其中$\text{bound}$的意思是将值限定在$x$,$v$上面提到的规定范围内:

$$
v_{t+1} \doteq \text{bound}[v_t + 0.001(A_t-1) - 0.0025\cos(3x_t)]
$$

$$
x_{t+1} \doteq \text{bound}[x_{t} + v_{t+1}]
$$



::: warning 思考
从$v$的递推关系来看, 我们可以认为速度$v$的方向是沿着轨道的; 接下来我们认为小车的驱动力$f$的方向也是沿着轨道的。

然后我们分析将重力分解，可以得到$0.0025\cos(3x_t)$,方向和正方向相反，因此我们前面加个$-$号。

你可能会问为什么轨道方向和重力方向的夹角是$3x_t$, 你看看下面这张图可能就不会纠结了:

<p align='center'>
<img src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/MountainCarTrack_A.png'>
</p>

除了轨道外，我还画了$\cos(3x)$的图像(对应绿色线)，这条曲线的纵坐标反应了重力在轨道方向上的分力的大小

例如在$x=-0.5$附近，也就是谷底时，重力在轨道方向的分力为$0$, 其他位置类似。

到这里好像都没有任何的问题，但是我们再看位置的递推公式:

$$
x_{t+1} \doteq \text{bound}[x_{t} + v_{t+1}]
$$

这里很明显是考虑的水平位置, 那速度也应该使用水平速度才对,
但这里却直接使用了沿着轨道的速度$v_{t+1}$, 因此我认为这里是有问题的。

但可能这点问题影响不大吧。你怎么看呢? 欢迎下方留言告诉我。
:::

::: tip 总结
这个环境模型的智能体(agent)是通过自身的动作(action)，间接改变了它的观测(state)。

==即使智能体不做任何动作, 在山坡上它的观测(state)也会发生变化==。
:::

完整的环境代码在[这里](https://github.com/openai/gym/blob/master/gym/envs/classic_control/mountain_car.py)

[Mountain Car OpenAI wiki](https://github.com/openai/gym/wiki/MountainCar-v0)
[OpenAI Mountain Car](https://gym.openai.com/envs/MountainCar-v0/)
[Wikipedia: Mountain car problem ](https://en.wikipedia.org/wiki/Mountain_car_problem)


<Livere/>