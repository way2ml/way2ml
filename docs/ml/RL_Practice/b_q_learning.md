---
pageClass: ml-class
---

# Q-learning

这里我们要找到Q-tabel, 它就像是小车的行动指南，当小车处于某种状态下是，Q-tabel
会告诉它接下来应该要怎么做。我们要让机器学习的也就是这个Q-tabel。

## 观测状态
这里的状态指的是环境的状态，因此也被叫做观测(Observations)。
```python
import gym
env = gym.make("MountainCar-v0")
# 输出总共可以有几个动作
print(env.action_space.n)
# 3 代表有三个动作
# 0:表示向左 1:表示不动 2: 表示向右

print(env.observation_space.low)
print(env.observation_space.high)

```
得到。
``` bash
3
[-1.2  -0.07]
[0.6  0.07]
```
这里的输出表示: 观测值1(x)的范围是[-1.2, 0.6], 观测值2(v)的范围是[-0.07, 0.07]。接下来我们可以将观测值给输出来。
利用上一节的程序，在循环中添加`print`语句，如下:
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
    # 添加下面这一行
    print(new_state)
    env.render()
    if new_state[-1] < 0:
        action = 0 # 向左
    elif new_state[-1] > 0:
        action = 2 # 向右
    else:
        action = 1     
env.close()
```

得到:

```bash
[-4.27521207e-01  2.91450276e-04]
[-0.4269404  0.0005808]
[-0.42607442  0.00086598]
[-0.42492948  0.00114494]
[-0.4235138   0.00141568]
[-0.42183752  0.00167627]
[-0.41991266  0.00192486]
[-0.41775297  0.0021597 ]
[-0.41537384  0.00237913]
[-0.41279221  0.00258162]
[-0.41002642  0.0027658 ]
[-0.40709603  0.00293039]
[-0.40402173  0.0030743 ]
[-0.40082515  0.00319658]
[-0.39752869  0.00329646]
...
[0.02137293 0.04518345]
[0.06506151 0.04368858]
[0.10729757 0.04223605]
[0.14816202 0.04086446]
[0.1877694  0.03960738]
[0.22626305 0.03849365]
[0.26381086 0.03754781]
[0.3006016  0.03679074]
[0.33684186 0.03624026]
[0.37275358 0.03591172]
[0.40857217 0.0358186 ]
[0.44454509 0.03597292]
[0.48093065 0.03638556]
[0.51799707 0.03706642]
```

可见状态是连续的值, 如果直接使用连续的值来创建Q-table，那么这个Q-tabel会无穷大，因此
接下来我们需要让观测值(Observations)离散话，这样就可以减小我们的Q-table的大小了。

```python
DISCRETE_OS_SIZE = [20] * len(env.observation_space.high)
print(DISCRETE_OS_SIZE)
```

这样就将观测空间分成了`20x20`这样离散的空间了。

```python 
# 这些都是同时处理两部分的内容
discrete_os_win_size = (env.observation_space.high - env.observation_space.low)/DISCRETE_OS_SIZE
print(discrete_os_win_size)
# [0.09  0.007] 表示位移的步长是0.09, 速度的步长是0.007

# 将得到的连续状态变成离散的
def get_discrete_state(state):
    discrete_state = (state - env.observation_space.low)/discrete_os_win_size
    return tuple(discrete_state.astype(np.int))
```
上面的代码得到了观测空间的步长, `get_discrete_state`将连续状态变成离散的值。


## 创建Q-tabel
由于每一个状态对应了三个可能采取的动作，因此Q-tabel的形状是`[20,20,3]`

```python
import numpy as np
q_table = np.random.uniform(low=-2, high=0, \
          size=(DISCRETE_OS_SIZE + [env.action_space.n]))

# 注意到这里q_tabel的值都是负的
print(q_table)
```

上面的代码创建了初始状态的Q-table。 接下来要做的就是如何让小车自己尝试去优化Q-table,让Q-tabel越来越准，让Q-tabel真正成为
小车的行动指南。

## 更新Q-tabel
更新Q-table是有一些基本的原则的，我们先让小车不断的去尝试，当它到达小黄旗的地方我们会给它一个比较高的奖励，以此来肯定它的行为。
在最开始Q-table还不是很好的时候，我们会采取比较多的随机动作(探索)， 随着Q-table越来越稳定，我们探索的比例便会越来越低，因为我们
越来越相信我们的经验。

```python
# Q-Learning 设置
LEARNING_RATE = 0.1
DISCOUNT = 0.95
EPISODES = 25000
SHOW_EVERY = 500
# 探索，尝试随机的动作
epsilon = 0.5 
START_EPSILON_DECAYING = 1
END_EPSILON_DECAYING = EPISODES//2 # 表示在前期做一些探索，后期就不做探索了，这是一个比较好的策略
# 每一步epsilon要减小的值，也就是是说随着训练的不断进行，探索的比例会不断减小。
epsilon_decay_value = epsilon/(END_EPSILON_DECAYING - START_EPSILON_DECAYING)

discrete_state = get_discrete_state(env.reset())
for episode in range(EPISODES):
    if episode % SHOW_EVERY == 0:
        print(episode)
        render = True 
    else:
        render = False
    discrete_state = get_discrete_state(env.reset())
    done = False
    while not done:
        # 利用和探索
        if np.random.random() > epsilon:
            # Get action from Q table
            action = np.argmax(q_table[discrete_state])
        else:
            # Get random action
            action = np.random.randint(0, env.action_space.n)
        # action = np.argmax(q_table[discrete_state])
        new_state, reward, done, _ = env.step(action)
        new_discrete_state = get_discrete_state(new_state)
        # print(reward, new_state)
        if render:
            env.render() 
        #　更新Q值，也就是学习经验，这里体现了机器学习。
        if not done:
            max_future_q = np.max(q_table[new_discrete_state])
            current_q = q_table[discrete_state + (action,)]
            new_q = (1 - LEARNING_RATE) * current_q + LEARNING_RATE*(reward + DISCOUNT * max_future_q)
            q_table[discrete_state + (action,)] = new_q
        elif new_state[0] >=  env.goal_position:
            # 奖励就是没有惩罚
            print(f"We made it on episode {episode}")
            q_table[discrete_state + (action,)] = 0  
        discrete_state = new_discrete_state
    
    # 在某个区间内都有探索，不过探索的比例不断地下降
    if END_EPSILON_DECAYING >= episode >= START_EPSILON_DECAYING:
        epsilon -= epsilon_decay_value
env.close()

```

接下来的这个视频展示了整个学习的过程: 

<video style="display:block; margin: 0 auto;" width="50%" controls>
<source src="/images/ml/RL_Prt/learn_process.mp4" type="video/mp4">
</video>

Q-table是一种特别简单的方法，可以处理过山车这样简单的问题。但遇到复杂的问题，若是还有这种方法，那么就会出现问题了。
因此有了新的一种方法，叫做Deep Q-learning, 也就是使用神经网络去代替这个Q-tabel。在接下来的章节中我会讲到。那我们到时再见哦。

<Livere/>