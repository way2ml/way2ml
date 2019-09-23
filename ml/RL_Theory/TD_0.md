---
pageClass: ml-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-23 15:52:08
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-23 17:06:21
 -->

# TD(0)

::: tip 用来得到 $V_{\pi}$ 的 TD(0) 算法
- 1. 输入一个已知策略 $\pi$
- 2. 初始化学习率 $\alpha \in (0,1]$
- 3. 循环每个episod，直到$S$到达终止态:
    - 3.1. 初始化环境，得到状态 $S$
    - 3.2. 循环这个episod的每一步:
        - 3.2.1. 根据已知策略$\pi$选取要采取的动作$A$
        - 3.2.2. Agent执行动作A和环境交互,观察及时奖励$R$, 和环境反馈的新的状态$S'$
        - 3.2.3. 更新$V(S) \leftarrow V(S) + \alpha [R + \gamma V(S') -V(S)]$
        - 3.2.4. $S \leftarrow S'$
:::

TD(0)算法的目的不是为了得到一个策略$\pi$, 而是给定一个已知的策略$\pi$，TD(0)可以得到一个策略$\pi$下的状态值函数$V_{\pi}(S)$;
而这个状态值函数的意义是告诉你在当前的策略$\pi$下，出现状态(某个游戏画面) $S$ 有多好。

具体操作的时候是这样来对应的:
这个$V_{\pi}(S)$可以用一个神经网络来拟合得到,既然是神经网络，那么就有`input data`, `label`, `NN out`, `loss function`,
那么对应到TD(0)中是如何一一对应的呢？
- **input data**: 状态$S$，例如游戏画面；
- **label**： $R + \gamma V(S')$;
- **NN out**: $V(S)$,状态S输入神经网络后计算得到的输出;
- **loss function**:  $loss = [V(s)-(R + \gamma V(S'))]^2$

其中**Loss Function**为什么是这样是基于下面的Bellman关系:

$v_{\pi}(s) \doteq \mathbb{E}[G_t|S_t = s]$
$= \mathbb{E}[R_{t+1} + \gamma G_{t+1}|S_t = s]$
$= \mathbb{E}[R_{t+1} + \gamma v_{\pi}(S_{t+1})|S_t = s]$
$= \mathbb{E}[R_{t+1}|S_t = s] + \mathbb{E}[\gamma v_{\pi}(S_{t+1})|S_t = s]$
$= \mathbb{E}[R_{t+1}|S_t = s] + \gamma v_{\pi}(S_{t+1})$ 
$\approx R_{t+1} + \gamma v_{\pi}(S_{t+1})$

::: tip 期望的运算规则
$\mathbb{E}[aX + bY + c] = a\mathbb{E}[X] + b \mathbb{E}[Y] +c$<br/>
$\mathbb{E}[\mathbb{E}[X]] = \mathbb{E}[X]$
:::


<Livere/>