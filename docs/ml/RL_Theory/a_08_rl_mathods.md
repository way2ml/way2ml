---
pageClass: ml-class
---

# 如何实现强化学习?
强化学习就是找最优策略们$\pi_{*}$, 这些最优策略对应了唯一的最优状态值函数和最优动作值函数。于是我们要求解状态值函数和动作值函数。而这两个值函数对应了两个可以迭代的贝尔曼等式，于是我们可以通过迭代的方式求解到所有的状态值函数和动作值函数。迭代的方法有下面这些:
- 动态规划 Dynamic programming 
- 蒙特卡罗评估 Monte-Carlo evaluation
- 时序差分学习 Temporal-Difference learning

所以我们要开始新的征程了。


<Livere/>