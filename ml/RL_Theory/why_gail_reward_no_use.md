---
pageClass: ml-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-11-02 20:25:24
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-11-09 03:11:45
 -->

#  为何GAIL得到的Reward没有一点用处?

GAIL算法最后会训练出两个网络:

1. $\pi_\theta^{*}$:  策略网络

2. $D^{*}$:  评价网络

GAIL算法的目标函数是:

$$
L(D,\pi_{\theta}) = \mathbb{E}_{\pi_{E}} \left[ log(D(x)) \right] + \mathbb{E}_{\pi_{\theta}}\left[log(1-D(x)\right]
$$

我们在训练D时, 固定$\pi_{\theta}$, 要最大化$L(D,\pi_{\theta})$。

单个 $x=(s,a)$ 对对$L(D,\pi_{\theta})$的贡献是:
$$
\pi_{E}}(x) logD(x) + \pi_{\theta}(x)log(1-D(x))
$$
令上式对$D$的一阶导为0, 可得:
$$
D^*(x) = \frac{\pi_{E}(x)}{\pi_{E}(x) +\pi_{\theta}(x)}
$$
带入到 $L(D,\pi_{\theta})$, 得到:

$$
L(D^*, \pi_{\theta}) = 2JSD(\pi_{E} \| \pi_{\theta}) - 2log2
$$

训练$\pi_{\theta}$时,  固定$D$, 要最小化$L(D,\pi_{\theta})$。

当$D=D^*$时，$L(D^*, \pi_{\theta})$是一个常数，$\theta$ 的改变不会引起$L$的变化, 要知道更新$\theta$是需要求$L$的导数的, 常数的导数为0。所以给不了$\pi$任何反馈, $\theta$的值不会有任何变化，所以G是永远都训练不起来的。

::: tip 为什么是一个常数? 
Theorem 2.3 in paper "Towards Principled Methods For Training Generative Adversarial Network":

Let $\mathbb{P}_r$ and $\mathbb{P}_g$ be two distributions whose support lies in two *manifolds* $\mathcal{M}$ and $\mathcal{P}$ that don’t have full dimension and don’t perfectly align. We further assume that $\mathbb{P}_r$ and $\mathbb{P}_g$ are continuous in their respective manifolds. Then,
1. $JSD(\mathbb{P}_r \| \mathbb{P}_g) = log2$
2. $KL(\mathbb{P}_r \| \mathbb{P}_g) = +\infty$
3. $KL(\mathbb{P}_g \| \mathbb{P}_r) = +\infty$
:::

总结:

1. 当 $D=D^*$ 时，$D$的给不了 $\pi$ 任何有效的反馈。 