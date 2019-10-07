---
pageClass: ml-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-10-04 22:20:50
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-10-04 22:27:39
 -->

# 为什么PPO不能够解决Moutain_Car的问题? 
Sparse rewards. In OpenAI Gym MountainCar you only get a positive reward when you reach the top.

PPO is an on-policy algorithm. It performs a policy gradient update after each episode and throws the 
data away. Reaching the goal in MountainCar by random actions is a pretty rare event. When it finally happens, it's very unlikely that a single policy gradient update will be enough to start reaching the goal consistently, so PPO gets stuck again with no learning signal until it reaches the goal again by chance.

On the other hand, DDPG stores this event in the replay buffer so it does not forget. 
The TD bootstrapping of the Q function will eventually propagate the reward from the goal backwards into the Q estimate for other states near the goal.

This is a big advantage of off-policy RL algorithms.

Also DDPG uses an Ornstein-Uhlenbeck process for time-correlated exploration, 
whereas PPO samples Gaussian noise. The Ornstein-Uhlenbeck process is more likely to generate useful exploratory actions. 
(The exploration methods are not immutable properties of the algorithms, just the Baselines implementations.)

[参考](https://www.reddit.com/r/reinforcementlearning/comments/9o8ez0/ppo_struggling_at_mountaincar_whereas_ddpg_is/)