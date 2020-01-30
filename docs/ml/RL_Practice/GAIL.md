---
pageClass: ml-class
---
# GAIL 生成对抗模仿学习
环境: 倒立摆 [CartPole-v0](https://github.com/openai/gym/wiki/CartPole-v0)
<p align='center'>
<img src='https://user-images.githubusercontent.com/8510097/31701291-3b9f3d94-b384-11e7-8ee1-70fb1e7deb63.PNG' width='50%'>
<p>

## 获得专家轨迹
利用上一节训练好的PPO算法可以生成多个专家轨迹。这个部分分成两部分:

1. 加载PPO训练好的策略的参数
2. 利用训练好的模型和环境交互
3. 记录，保存状态动作对作为专家轨迹

```python
def open_file_and_save(file_path, data):
    try:
        with open(file_path, 'ab') as f_handle:
            np.savetxt(f_handle, data, fmt='%s')
    except FileNotFoundError:
        with open(file_path, 'wb') as f_handle:
            np.savetxt(f_handle, data, fmt='%s')
```

在每一个Episode结束的时候，记录数据:

```python
observations = np.reshape(observations, newshape=[-1] + list(ob_space.shape))
actions = np.array(actions).astype(dtype=np.int32)
open_file_and_save('expert_trajectory/observations.csv', observations)
open_file_and_save('expert_trajectory/actions.csv', actions)
```


## GAIL算法

GAIL算法要优化两个大的部分:
1. Policy网络
2. Discriminator网络
在GAIL算法训练结束的时候我们可以同时得到两个最优的网络。

<p align='center'>
<img src='/images/ml/RL/GAIL/GAIL_Algorithm.png' width='100%'>
</p>
