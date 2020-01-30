---
pageClass: ml-class
---
# n-step TD 
给定一个策略$\pi$, 使用它去和环境交互，通过$n$步时序差分的算法来估计策略$\pi$对应的值函数$v_{\pi}$。
::: tip n-step 时序差分， 用于估计$v_{\p}$
- 1. 给定一个策略 $\pi$
- 2. 初始化学习率 $\alpha \in (0,1]$, 一个正数 $n$ (就是n-step中的$n$)
- 循环每个episode:
    - 初始化环境，得到初始化状态$S_0$, 其中$S_0 \neq terminal$, 保存$S_0$
    - $T \leftarrow \infty$
    - 对 $t = 0,1,2,...$ 循环, 直到$\tau = T - 1$:
        - if $t < T$:
            - 根据策略$\pi(\cdot|S_t)$执行动作$A_t$和环境互动; 观察，保存奖励$R_{t+1}$, 下一状态$S_{t+1}$
            - if $S_{t+1} = terminal$: $T \leftarrow t+1$
        - $\tau \leftarrow t -n + 1$ : $\tau$是当前正在更新的状态对应的时刻
        - if $\tau \geq 0:$
            - $G \leftarrow \sum_{i = \tau + 1}^{min(\tau + n, T)}\gamma^{i-\tau - 1}R_{i}$
            - if $\tau + n < T$, then: $G \leftarrow G + \gamma^{n}V(S_{\tau+n})$
            - $V(S_{\tau}) \leftarrow V(S_{\tau}) + \alpha[G - V(S_{\tau})]$
:::

- n-step TD 肯定是要比 一步的TD更好的, 因为n-step的回报$G_{t:t+n}$肯定是要比one-step的回报$G_{t:t+1}$来得更好的。
来得更好的意思是 使用$G_{t:t+n}$比使用$G_{t:t+1}$更多地结合了和环境的交互(事实)。
- loss是$|G - V(S)|^2$的原因是基于值函数的定义: $V_{\pi}(S_t) = \mathbb{E}_{\pi}[G_{t}]$, 我们想要我们的预测和实际的情况表现是
一致的。



