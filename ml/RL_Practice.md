---
pageClass: ml-class
---
# 强化学习实践
这部分使用Python实现强化学习的各种算法。

## 开始使用Gym
[Gym](https://gym.openai.com)是一个强化学习工具包。使用它可以用来验证你的算法。可以理解它是一个模拟器，给你提供强化学习必要的环境，不需要你自己搭建真实的智能体。Gym包含机器人控制，电子游戏,棋盘游戏等等。

### 安装
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
Observation space: Box(2,)
Action space: Discrete(3)
```
<p align='center'>
<img src='/images/ml/RL_Prt/MountainCar.png'>
</p>
<Livere/>