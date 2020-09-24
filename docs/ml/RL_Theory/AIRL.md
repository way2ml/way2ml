---
pageClass: ml-class
---
# Adversarial Inverse Reinforcement Learning
`Learning Robust Rewards With Adversarial Inverse Reinforcement Learning` 

`Justin Fu, Katie Luo, Sergey Levine`

::: tip 关注点
这篇文章的关键就是解决GAIL训练出的Reward Function没有用的致命缺点。仔细看作者是如何解决这个问题的。
:::

## Abstract
一开始作者提到:

> Inverse reinforcement learning holds the promise of automatic reward acquisition, but has proven exceptionally difficult to apply to large, high-dimensional problems with unknown dynamics.

也就是说，虽然都说反向强化学习可以自动学习到Reward Function, 但对于高维状态空间，Unknown Dynamics的情况是会有问题的。这也就导致了IRL用在实际当中有很多的问题。

::: tip Dynamics是什么? 
简单来说, Dynamics就是指的$p(s_{t+x}|s_t,a_t)$, 其中 $t$为可取的任意值。这个Dynamics又叫model;

Known Dynamics指的就是知道这个状态转移概率,那么对应model-based;
Unknown Dynamics指的是不知道这个转移概率, 那么对应model-free。

这里有个技巧来判断某个算法是model-based还是model-free:

在agent执行它的动作之前，它是否能对下一步的状态和回报做出预测，如果可以，那么就是model-based方法，如果不能，即为model-free方法。

:::

::: tip 思考
现在都不能够望文生义了, 强化学习里面有一节叫做'Dynamic Programming', 中文翻译过来叫做"动态规划"。如果不了解Dynamic指的是$p(s_{t+x}|s_t,a_t)$,你根本想不到是什么意思。"动态", 在这里真的就是指的"态(state)"的变化规律。"动态规划"的意思就是知道了态的变化规律后，再通过一系列的算法找到最优的策略。
:::

## Introduction
这一部分作者提到:

> Part of the challenge is that IRL is an ill-defined problem, since there are many optimal policies that can explain a set of demonstrations, and many rewards that can explain an optimal policy.

也就是说IRL问题的提出本事就是有毛病(ill-defined)的, 主要体现在这两点:

1. **许多最优策略可以用来解释专家的轨迹**;
2. **许多的Reward Function可以用来解释最优策略**;

::: tip 最优策略
这里提到了最优策略，我们就提一下什么是最优策略。

说最优之前我们要说什么样的策略才是好的策略。
要是一个策略$\pi$比另一个策略$\pi'$好,那就要$\pi$在每一个状态下对应的回报的均值都要比$\pi'$的大。

那么就可以找到一个(或多个)策略$\pi^*$比其他所有的策略都好(或者一样好)，那么==这些==策略$\pi^*$就被叫做最优的策略。
:::

作者指出, 2008年Ziebart提出的The maximum entropy(MaxEnt) IRL这种方法是用来处理第一种歧义的的。那MaxEnt IRL是怎么做到的呢?

最大熵原理是指，在学习概率模型时，在所有满足约束的概率模型（分布）中，熵最大的模型是最好的模型。这是因为，通过熵最大所选取的模型，没有对未知（即除了约束已知外）做任何主观假设。也就是说，除了约束条件外，我们不知道任何其他信息。

最大熵IRL最后会学到一个概率分布$p(\tau)$。

## Background
在Background部分，作者一开始就提到他们的IRL算法是建立在Maximum causal entropy这套方法上的。

那什么是Maximum causal entropy 呢? 我找到了2010年Ziebart的博士论文。

::: warning 什么是Maximum causal entropy?

:::

::: warning 什么是soft Q-function?

:::

::: warning 什么是energy-based model?

:::

::: warning 什么是Boltzmann distribution?
$$
p_{\theta}(\mathbf{x})=\frac{1}{Z} \exp \left(-E_{\theta}(\mathbf{x})\right)
$$
这个分布是通过最大熵原理优化得到的。
:::

::: warning 什么是最大信息熵?
最大熵模型想要在符合已知知识的前提下, 对未知事物不做任何假设。
:::


由GAN的目标函数可以得到,最优的Discriminator有下面的形式:
$$
D^{*}(\tau)=\frac{p(\tau)}{p(\tau)+q(\tau)}
$$
其中$p$是真实的分布, $q$是Generator对应的分布。我们用一组参数去拟合真实分布于是可以得到:

$$
D_{\theta}(\tau)=\frac{\tilde{p}_{\theta}(\tau)}{\tilde{p}_{\theta}(\tau)+q(\tau)}
$$

为了和MaxEnt IRL联系起来，我们用Boltzmann distribution代替$p$,这样做的一个原因是我们认为Boltzmann distribution
可以让我们满足最大熵原理，认为这样是合理的。于是我们得到:

$$
D_{\theta}(\tau)=\frac{\frac{1}{Z} \exp \left(-c_{\theta}(\tau)\right)}{\frac{1}{Z} \exp \left(-c_{\theta}(\tau)\right)+q(\tau)}
$$

接下来进一步简化就可以得到:

$$
D_{\theta}(\tau)=\frac{\exp \left\{f_{\theta}(\tau)\right\}}{\exp \left\{f_{\theta}(\tau)\right\}+\pi(\tau)}
$$

## AIRL
文章里面提到，使用整个轨迹喂给网络训练可能并不很好。于是简化得到:

$$
D_{\theta}(s, a)=\frac{\exp \left\{f_{\theta}(s, a)\right\}}{\exp \left\{f_{\theta}(s, a)\right\}+\pi(a | s)}
$$

文章里面提到，这样的修改可以在模仿学习上得到很好的效果。但是对于得到Reward Function就差强人意了。可以说这个Reward是没有一点用的。
他们也做了实验，发现这个学到的Reward完全不行。

接下来讨论，为什么Reward会出现这么糟糕的情况。

::: warning 疑问
1. 文章里面说的是他们学到的Reward Function之和State有关，那为什么表达式里面却是$r_{\theta,\phi} (s,a,s')$？　

2. 从后面的实验结果来看, 貌似这套算法的到的Reward Function是否只是和Statte相关还是可以任意切换的, 是怎么做到的? 
:::

在`Policy invariance under reward transformations: Theory and application to reward shaping. In International Conference on Machine Learning (ICML), 1999`文章中提到在下面的Reward的变化中:

$$
\hat{r}\left(s, a, s^{\prime}\right)=r\left(s, a, s^{\prime}\right)+\gamma \Phi\left(s^{\prime}\right)-\Phi(s)
$$

对于任何的函数$\Phi: \mathcal{S} \rightarrow \mathbb{R}$, 最优策略都不会发生改变。

## 使用AIRL学习一个Disentangled Reward
考虑到Reward shaping 的情况我们将$D$写成下面的形式:

$$
D_{\theta, \phi}\left(s, a, s^{\prime}\right)=\frac{\exp \left\{f_{\theta, \phi}\left(s, a, s^{\prime}\right)\right\}}{\exp \left\{f_{\theta, \phi}\left(s, a, s^{\prime}\right)\right\}+\pi(a | s)}
$$

其中$f_{\theta, \phi}$被限制成了下面的表达式:

$$
f_{\theta, \phi}\left(s, a, s^{\prime}\right)=g_{\theta}(s, a)+\gamma h_{\phi}\left(s^{\prime}\right)-h_{\phi}(s) 
$$

这样就可以减缓对于$g_{\theta}$不想要的reshape.

这样做还有一个好处是,我们可以把 $g_{\theta}(s,a)$, 变成$g_{\theta}(s)$, 这样就可以使得我们的得到的reward从Environment的Dynamics中脱离出来，这样就
可以得到更稳定的reward.

也就是说我们可以把$f_{\theta, \phi}$写成下面的形式:

$$
f_{\theta, \phi}\left(s, a,s^{\prime}\right)=g_{\theta}(s)+\gamma h_{\phi}\left(s^{\prime}\right)-h_{\phi}(s) 
$$

可以证明在这样的约束下有:
$$
g^{*}(s)=r^{*}(s)+\mathrm{const}
$$

$$
h^{*}(s)=V^{*}(s)+\mathrm{const}
$$

于是可以得到:

$$
f^{*}\left(s, a, s^{\prime}\right)=r^{*}(s)+\gamma V^{*}\left(s^{\prime}\right)-V^{*}(s)=A^{*}(s, a)
$$

<p align='center'>
<img src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/AIRL.png' width='100%'>
</p>


从算法里面可以看到,最后RL算法中用到的reward是这样构成的:
$$
r_{\theta, \phi}\left(s, a, s^{\prime}\right) \leftarrow \log D_{\theta, \phi}\left(s, a, s^{\prime}\right)-\log \left(1-D_{\theta, \phi}\left(s, a, s^{\prime}\right)\right)
$$
::: tip 为什么AIRL能够奏效?
对D做了很好的约束。同样的事情可以从很多角度去解释, 但使用最大熵的概率模型就显得，那么自然。
:::

[CSDN: 最大熵模型(Maximum Entropy Models)详细分析](https://blog.csdn.net/u010189459/article/details/38436993)<br/>
["我是bayesian我怕谁"系列 - Boltzmann Distribution](https://www.cnblogs.com/jesse123/p/7788064.html)<br/>
[Stack Exchange: model-free vs model-based](https://ai.stackexchange.com/questions/4456/whats-the-difference-between-model-free-and-model-based-reinforcement-learning)<br/>
[Medium: RL—Model-based Reinforcement Learning](https://medium.com/@jonathan_hui/rl-model-based-reinforcement-learning-3c2b6f0aa323)<br/>

<Livere/>