---
pageClass: ml-class
---

# Proximal Policy Optimization(PPO)
OpenAI默认的强化学习算法, 是Policy Gradient的变形。
<p align='center'>
<img src='/images/ml/RL/ppo.png' width='60%'>
</p>

## On-Policy到Off-Policy 
在RL中我们要学习的就是一个Agent
- On-Policy: 和环境互动的Agent就是我们要学习的Agent； 一边做互动，一边学习。
- Off-Policy: 和环境互动的Agent不是我们要学习的Agent； 通过看别人学习。

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

这样就是从$q$这个分布里面采样得到$x$, 而不是从$p$里面做采样了，真是神奇的变化啊! 这里的$\frac{\p(x)}{q(x)}$就是起到一个修正的作用的权值。

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
<p align='center'>
<img src='/images/ml/RL/p_q_explain.png' width='60%'>
</p>


### 正式开始将On-Policy变成Off-Policy
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

$$
J^{\theta^{\prime}}(\theta)=E_{\left(s_{t}, a_{t}\right) \sim \pi_{\theta^{\prime}}}\left[\frac{p_{\theta}\left(a_{t} | s_{t}\right)}{p_{\theta^{\prime}}\left(a_{t} | s_{t}\right)} A^{\theta^{\prime}}\left(s_{t}, a_{t}\right)\right]
$$ 

## Add Constraint



<Livere/>