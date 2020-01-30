---
pageClass: ml-class
---


# Q Learing

::: tip Q Learning 
- 1. 初始化学习率 $\alpha \in (0,1]$, 较小的探索比例 $\epsilon > 0$ 
- 2. 对于所有的s,a, 随机初始化 $Q(s,a)$. (给$Q(terminal, .) = 0$)

- 3. 循环每个episode:
    - 3.1. 得到初始的观测S
    - 3.2. 循环这个episode中的每一步，直到一个最大步数或$S$到达终止态:
        - 3.2.1. 使用$\epsilon$-greedy,结合$Q$, $S$ 选取一个动作$A$
        - 3.2.2. 执行动作$A$，和环境交互，得到及时奖励$R$和新的观测$S'$
        - 3.2.3. 更新$Q(S,A) \leftarrow Q(S,A) + \alpha [R + \gamma max_aQ(S',a) - Q(S,A)]$
        - 3.2.4. $S \leftarrow S'$
:::

<Livere/>

