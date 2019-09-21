---
pageClass: ml-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-21 11:12:49
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-21 11:53:05
 -->

# Sarsa
::: tip Sarsa 算法
- 初始化学习率 $\alpha \in (0,1]$, 较小的探索比例 $\epsilon > 0$ 
- 对于所有的s,a, 随机初始化 $Q(s,a)$. (给$Q(terminal, .) = 0$)

- 循环每个episode:
    - 得到初始的观测S
    - 使用$\epsilon$-greedy,结合$Q$, $S$ 选取一个动作$A$
    - 循环这个episode中的每一步:
        - 执行动作$A$，和环境交互，得到及时奖励$R$和新的观测$S'$

:::

::: warning 提问
实现算法的时候有对$Q(terminal,.)$单独处理吗?
:::


<Livere/>