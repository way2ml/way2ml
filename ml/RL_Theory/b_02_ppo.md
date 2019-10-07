---
pageClass: ml-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-08-13 09:52:16
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-24 14:52:13
 -->



# Proximal Policy Optimization(PPO)
OpenAI默认的强化学习算法, 是Policy Gradient的变形。
<p align='center'>
<img src='/images/ml/RL/ppo.png' width='100%'>
</p>

## On-Policy到Off-Policy 
在RL中我们要学习的就是一个Agent
- ==On-Policy==: 和环境互动的Agent就是我们要学习的Agent； ==一边做互动，一边学习。==
- ==Off-Policy==: 和环境互动的Agent不是我们要学习的Agent； ==通过看别人学习。==

前面提到的Policy Gradient的方法就是一种On-Policy的方法。
$$
\nabla \overline{R}_{\theta}=E_{\tau \sim p_{\theta}(\tau)}\left[R(\tau) \nabla \log p_{\theta}(\tau)\right]
$$
前面提到了Policy Gradient的方法要玩很多次游戏才更新依次参数$\theta$,这样子就会变得超级不划算，有没有更合理的方法呢? 
- Goal: Using the sample from $\pi_{\theta'}$ to train $\theta$. $\theta'$ is fixed, so we can re-use the sample data. 

### 重要性抽样 Importance Sampling
我们已经知道:

$$
E_{x \sim p}[f(x)] \approx \frac{1}{N} \sum_{i=1}^{N} f\left(x^{i}\right)
$$

其中, $x^i$ 是从$p(x)$采样得到。但是假设现在的问题是，我们没有办法从$p(x)$里面采样数据, 我们只能从$q(x)$里面采样，那怎么算这个期望呢?

$$
E_{x \sim p}[f(x)] = \int f(x) p(x) d x=\int f(x) \frac{p(x)}{q(x)} q(x) d x=E_{x\sim q}\left[f(x) \frac{p(x)}{q(x)}\right]
$$

这样就是从$q$这个分布里面采样得到$x$, 而不是从$p$里面做采样了，真是神奇的变化啊! 这里的$\frac{
    p(x)}{q(x)}$就是起到一个修正的作用的权值。

理论上分布$q(x)$为什么都可以,但是实作上$q$和$p$不能差太多。虽然两个分布的期望是一样的，但是他们的方差呢?

::: tip 提示
$$
Var[ X ] = E[ X^2 ] - (E[ X ])^2
$$
:::

$$
Var_{x \sim p}[f(x)]=E_{x \sim p}\left[f(x)^{2}\right]-\left(E_{x \sim p}[f(x)]\right)^{2}
$$

$$
Var_{x \sim q}\left[f(x) \frac{p(x)}{q(x)}\right]=E_{x \sim q}\left[\left(f(x) \frac{p(x)}{q(x)}\right)^{2}\right]-\left(E_{x \sim q}\left[f(x) \frac{p(x)}{q(x)}\right]\right)^{2}  
$$

$$
=E_{x \sim p}[f(x)^{2} \frac{p(x)}{q(x)}]-\left(E_{x \sim p}[f(x)]\right)^{2}
$$

两式中只有第一项不一样。因此，若是两个分布太大，就会出现很大的偏差。若是采样不够多就有可能出现偏差, 举个例子来说:

::: tip 提示
$\mathbb{E}_{x\sim q}[f^2(x)\frac{p^2(x)}{q^2(x)}] = \int f^2(x)\frac{p^2(x)}{q^2(x)}q(x)dx = \int f^2(x)\frac{p^2(x)}{q(x)}dx = \int f^2(x)\frac{p(x)}{q(x)}p(x)dx = \mathbb{E}_{x\sim p}[f^2(x)\frac{p(x)}{q(x)}]$
:::

<p align='center'>
<img src='/images/ml/RL/p_q_explain.png' width='60%'>
</p>

本来两者的期望按理来说应该是一样的，但是由于两个概率分布$p(x)$, $q(x)$ 相差太大，若是采样不够就会出现得到的两个分布的的期望
不一样。

### 正式开始将On-Policy变成Off-Policy

::: warning 疑问
可以这样理解吗? 原本$\tau$服从的分布$p_{\theta}(\tau)$其实是不清楚的, 需要玩很多很多把的游戏才能够统计近似出来。而且每改变一次
$\theta$, 又要玩很多把游戏才能得到新的$p_{\theta}(\tau)$, 这样做是非常耗费时间的。于是我们就使用一个已知的概率分布去抽样，得到的
游戏记录可以保存起来，这样就可以不断地拿去更新。
:::

将原来的:
$$
\nabla \overline{R}_{\theta}=E_{\tau \sim p_{\theta}(\tau)}\left[R(\tau) \nabla \log p_{\theta}(\tau)\right]
$$
变成:
$$
\nabla \overline{R}_{\theta}=E_{\tau \sim p_{\theta^{\prime}}(\tau)}\left[\frac{p_{\theta}(\tau)}{p_{\theta^{\prime}}(\tau)} R(\tau) \nabla \log p_{\theta}(\tau)\right]
$$

这里的$\theta'$是来给$\theta$做示范的, 实际当中都是拿$\theta'$来和环境做互动。
- 使用$\theta'$采样得到数据
- 使用采样得到的数据去训练$\theta$很多次

从Policy Gradient的方法中，我们知道
$$
\nabla \overline{R}_{\theta} \approx E_{\left(s_{t}, a_{t}\right) \sim \pi_{\theta}}\left[A^{\theta}\left(s_{t}, a_{t}\right) \nabla \log p_{\theta}\left(a_{t}^{n} | s_{t}^{n}\right)\right] 
$$
利用重要性采样的技术，我们可以得到:
$$
=E_{\left(s_{t}, a_{t}\right) \sim \pi_{\theta^{\prime}}}\left[\frac{P_{\theta}\left(s_{t}, a_{t}\right)}{P_{\theta^{\prime}}\left(s_{t}, a_{t}\right)} A^{\theta'}\left(s_{t}, a_{t}\right) \nabla \log p_{\theta}\left(a_{t}^{n} | s_{t}^{n}\right)\right]
$$

$$
=E_{\left(s_{t}, a_{t}\right) \sim \pi_{\theta^{\prime}}}\left[\frac{p_{\theta}\left(a_{t} | s_{t}\right)}{p_{\theta^{\prime}}\left(a_{t} | s_{t}\right)} \frac{p_{\theta}\left(s_{t}\right)}{p_{\theta^{\prime}}\left(s_{t}\right)} A^{\theta^{\prime}}\left(s_{t}, a_{t}\right) \nabla \log p_{\theta}\left(a_{t}^{n} | s_{t}^{n}\right)\right]
$$

这里我们认为$\frac{p_{\theta}(s_t)}{p_{\theta'}(s_t)}=1$,这样就可以约掉，这里可以这样强行解释一下:
- 看到什么样的画面可能跟你采取什么样子的动作没有什么关系
- 这一项很难算，直接忽略掉
而这里的$p_{\theta}(a_t| s_t)$，$p_{\theta'}(a_t| s_t)$很好算，就直接是两个网络$\theta$,$\theta'$的输出。

由下面的
::: tip 关系
$$
\nabla f(x)=f(x) \nabla \log f(x)
$$
:::
可以得到我们的目标函数:

$$
J^{\theta^{\prime}}(\theta)=E_{\left(s_{t}, a_{t}\right) \sim \pi_{\theta^{\prime}}}\left[\frac{p_{\theta}\left(a_{t} | s_{t}\right)}{p_{\theta^{\prime}}\left(a_{t} | s_{t}\right)} A^{\theta^{\prime}}\left(s_{t}, a_{t}\right)\right]
$$ 

上面的式子中概率直接由神经网络的输出得到，Advantage可以通过采样估算，因此是可以算的。

目标函数有了，回到前面提到过的问题:$p(\theta)$和$p(\theta')$不能差太多，差太多结果就会不好，那如何处理这个问题呢? 

## Add Constrain
使用下面的技巧，在做训练的时候添加一个Constrain, 我们不直接训练$J^{\theta^{\prime}}(\theta)$,而是训练下面的目标函数:

$$
J_{P P O}^{\theta^{\prime}}(\theta)=J^{\theta^{\prime}}(\theta)-\beta KL\left(\theta, \theta^{\prime}\right)
$$

这里的$\beta KL\left(\theta, \theta^{\prime}\right)$是两个模型的输出的动作的的[KL Diversion](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence)，他是用来衡量$\theta$和$\theta^\prime$像不像的量, 这个值是一个非负数，当$\theta$和$\theta^\prime$相等时, $KL\left(\theta, \theta^{\prime}\right)=0$, 相差越大这个值越大。

::: warning 注意
这里的KL Diversion并不是参数上的距离，而是行为上的距离。因为有很多时候，参数变化了不一定行为就发生了改变。
:::

说这么多, PPO算法就是下面的样子:
::: tip PPO Algorithm
- 初始化Policy的参数$\theta^0$
- 循环
    - 使用$\theta^k$去和环境做互动,收集$\{s_t, a_t \}$, 计算advantage $A^{\theta^{k}}(s_t,a_t)$
    - 找使得$J_{PPO}(\theta)$更优的$\theta$: 这一步要多次更新$\theta$
        - $$
            J_{P P O}^{\theta^{k}}(\theta)=J^{\theta^{k}}(\theta)-\beta K L\left(\theta, \theta^{k}\right)
        　$$
        - $$
          J^{\theta^{k}}(\theta) \approx \sum_{\left(s_{t}, a_{t}\right)} \frac{p_{\theta}\left(a_{t} | s_{t}\right)}{p_{\theta^{k}}\left(a_{t} | s_{t}\right)} A^{\theta^{k}}\left(s_{t}, a_{t}\right)
          $$
        - $$
          KL(\theta,\theta^k)= ?
          $$
    - 动态调整Constrain的权值$\beta$, 也叫作Adaptive KL Penalty:
        - 更新$\theta$后, 如果发现$KL\left(\theta, \theta^{k}\right)>K L_{\max }$, 说明后面的约束没有起到作用, 因此增大$\beta$
        - 更新$\theta$后, 如果发现$KL\left(\theta, \theta^{k}\right)<K L_{\min }$, 说明后面的约束作用太强,因此减小$\beta$

:::

上面式子中的$KL(\theta,\theta^k)$还没有给出来，它需要通过采样数据得到,不是那么容易，因此为了逃避这个问题, 我们使用PPO2算法,它对应的目标函数是:

<p align='center'>
<img src='/images/ml/RL/ppo2.png', width='100%'>
</p>

这个式子里面没有了$KL$, 看起来变得复杂了，但事实操作的时候变得很简单, $\varepsilon$是一个可变的参数。这个式子可以达到和$KL$一样的功能，就是使得$p_\theta$和$p_{\theta^k}$不要差距太大。它是怎么做到的呢?

注意到横轴是$\frac{p_\theta}{p_{\theta^k}}$, 若是$A>0$, 也就是说$(s_t,a_t)$这组pair是好的，于是我们就想要增加$(s_t,a_t)$这组pair的几率，也就是想要$p_{\theta}$越大越好，但是有不能太大，即$\frac{p_\theta}{p_{\theta^k}}$的值不能大于$1+\varepsilon$。这样就避免了两者差别太大。注意到$p_{\theta^k}$始终是不变的。

::: tip clip function
$$
\text{clip}(a, b, c)=\left\{\begin{array}{ll}{b,} & {\text { if } a<b} \\ {c,} & {\text { if } a>c} \\ {a,} & {\text { else }}\end{array}\right.
$$
:::


<Livere/>