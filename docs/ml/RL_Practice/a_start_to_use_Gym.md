---
pageClass: ml-class
---
# 开始使用Gym
[Gym](https://gym.openai.com)是一个强化学习工具包。使用它可以用来验证你的算法。可以理解它是一个模拟器，给你提供强化学习必要的环境，不需要你自己搭建真实的智能体。Gym包含机器人控制，电子游戏,棋盘游戏等等。

## 安装Gym
使用Python3.5＋, 使用`pip`即可轻松安装`gym`:
```bash
pip install gym
```
安装好后，我们开始第一个Gym的例子吧:
``` python
import gym
import time 
# 获取过山车的gym模拟环境
env = gym.make('MountainCar-v0')
# 看看智能体的观测空间和动作空间
print("Observation space:", env.observation_space)
print("Action space:", env.action_space)
env.reset()
env.render()
time.sleep(5)
env.close()
```
运行上述代码可以得到:
```python
Observation space: Box(2,) # 表示可以观测到两个量(x方向上的位移，小车的速度))
Action space: Discrete(3) # 表示小车可采取的三个动作(0向左加速, 1 没有操作, 2 向右加速)
```
<p align='center'>
<img src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/MountainCar.png'>
</p>

得到上述的结果，表示成功安装了gym.

## 控制过山车
接下来我们尝试控制agent, 在我们的这个例子里便是这辆过山车。我们的最终目的是要让过山车到达插小旗的位置。
因此我们首先想到的便是控制小车向右加速。所以我们添加下面的代码:

``` python
import gym
import time 

env = gym.make('MountainCar-v0')
# env = gym.wrappers.Monitor(env, 'records', force=True) 
env.reset()
done = False
start_time = time.time() 
while not done:
    action = 2 
    env.step(action)
    env.render()
    if time.time() - start_time > 8:
        break

env.close()
```

下面的视频记录了上面代码达到的效果:

<video style="display:block; margin: 0 auto;" width="50%" controls>
<source src="https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/1_first_try.mp4" type="video/mp4">
</video>

从上面的结果可以看出来，这辆小车不能通过蛮力直接冲上高地，我们需要采取一定的策略。

## 定制一个策略 
没错，很容易想到，和荡秋千一样，荡过去。通过这样的方式，利用惯性冲上高地，到达小黄旗的地方。
转化到程序上应该怎么做呢? 我们使用的这个过山车环境给了我们两个可以观测的量，一个是水平的位移，另外一个是水平的速度。
当小车向右移动的时候，速度为正，反之为负。 因此我们可以设计这样一个简单的策略：

**当小车速度为正时，向右加速；当小车速度为负时，向左加速。**

于是编写下面的程序:

```python
import gym
import time 
import numpy as np 

env = gym.make('MountainCar-v0')
env = gym.wrappers.Monitor(env, 'records', force=True)
env.reset()
done = False
action = np.random.randint(0,3)
while not done:
    new_state, reward, done, _ = env.step(action)
    env.render()
    if new_state[-1] < 0:
        action = 0 # 向左
    elif new_state[-1] > 0:
        action = 2 # 向右
    else:
        action = 1
    
env.close()
```

上面的代码让小车达到了目标高地，为它鼓掌吧。

<video style="display:block; margin: 0 auto;" width="50%" controls>
<source src="https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/2_second_try.mp4" type="video/mp4">
</video>

虽然过山车达到了高地，但却不是凭借自己的聪明才智，是我们告诉了它应该这样做。
那么接下来我们想要然小车自己学习应该怎么样到达高地, 这也是机器学习应该做的，不是吗?  那我们下一节Q-learning再见哦!

[MountainCar-v0 Wiki](https://github.com/openai/gym/wiki/MountainCar-v0)
<Livere/>