---
pageClass: ml-class
---
# On Policy vs Off Policy
讲On Policy 和 Off Policy之前要先讲Behavior Policy 和 Update Policy的概念:
## Behavior Policy vs Update Policy
Behavior Policy是Agent如何去和环境交互;
Update Policy是Agent如何去学习最优策略。

例如,在Q Learning中: 
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

Agent去和环境做交互时的策略，第`3.2.2`步，使用的Behavior Policy是 $\epsilon$-greedy的策略; <br/>
Agent学习最优策略时使用的策略,第`3.2.3`步，使用的Update Policy是 absolute greedy的策略;


又如,在Sarsa中: 
::: tip Sarsa
- 1. 初始化学习率 $\alpha \in (0,1]$, 较小的探索比例 $\epsilon > 0$ 
- 2. 对于所有的s,a, 随机初始化 $Q(s,a)$. (给$Q(terminal, .) = 0$)

- 3. 循环每个episode:
    - 3.1. 得到初始的观测S
    - 3.2. 使用$\epsilon$-greedy,结合$Q$, $S$ 选取一个动作$A$
    - 3.3. 循环这个episode中的每一步，直到一个最大步数或$S$到达终止态:
        - 3.3.1. 执行动作$A$，和环境交互，得到及时奖励$R$和新的观测$S'$
        - 3.3.2. 使用$\epsilon$-greedy,结合$Q$, $S'$ 选取一个动作$A'$
        - 3.3.3. 更新$Q(S,A) \leftarrow Q(S,A) + \alpha [R + \gamma Q(S',A') - Q(S,A)]$
        - 3.3.4. $S \leftarrow S'$; $A \leftarrow A'$;
:::

Agent去和环境做交互是的策略, 第`3.3.1`步, 使用的Behavior Policy是 $\epsilon$-greedy的策略；<br/>
Agent学习最优策略时使用的策略,第`3.3.3`步，使用的Update Policy也是$\epsilon$-greedy的策略;

# On Policy vs Off Policy
若一个强化学习算法的:<br/>
==Behavior Policy和Update Policy不是同一种策略，那么这个算法是Off-Policy的;(如Q-Learning)== <br/>
==Behavior Policy和Update Policy是同一种策略，那么这个算法是On-Policy的。(如Sarsa)==



参考 [链接](https://leimao.github.io/blog/RL-On-Policy-VS-Off-Policy/)
<Livere/>