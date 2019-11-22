---
pageClass: ml-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-10-06 15:49:02
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-10-08 11:39:41
 -->

# 凸共轭和GAN有什么关系?
已知$f$共轭的共轭是$f$:
$$
f^{*}(t)=\max _{x \in dom(f)}\{x t-f(x)\} 
$$

$$
f(x) = \max _{t \in dom(f^*)}\{x t-f^*(x)\} 
$$

又知道F-Divergence的定义是:

$$
D_{f}(P \| Q)=\int_{x} q(x) f\left(\frac{p(x)}{q(x)}\right) d x
$$

将$\frac{p(x)}{q(x)}$作为一个整体，带入到第二个式子，可以得到:

$$
D_{f}(P \| Q)=\int_{x} q(x) f\left(\frac{p(x)}{q(x)}\right) d x 
$$

$$
= \int_{x} q(x) \left(\max_{t \in dom(f^*)}\{ \frac{p(x)}{q(x)} t-f^*(t) \} \right) d x 
$$



::: tip 思考
要解这个$\max$的问题, 我们就要穷举所有的$x$, 然后找到$\frac{p(x)}{q(x)} t-f^*(t)$对应的上确界(?),
但是我们现在不去解这个$\max$的问题。我们学习一个$D(x)$, 这个神经网络D的输入是$x$, 输出是$t$。 由于神经网络D
的拟合能力是有限的，因此:

$$
D_{f}(P \| Q) \geq \int_{x} q(x) \left( \frac{p(x)}{q(x)}D(x) - f^*(D(x)) \right) dx
$$

$$
= \int_{x} p(x)D(x) - q(x)f^*(D(x)) dx
$$

为什么
$$
\frac{p(x)}{q(x)}D(x) - f^*(D(x))
$$
是
$$
\max_{t \in dom(f^*)}\{ \frac{p(x)}{q(x)} t-f^*(t) \}
$$
的一个Lower Bound?
:::

::: tip 巧妙的转换
当神经网络通过学习变得足够好后, $D(x) \approx t$, 此时 $\int_{x} p(x)D(x) - q(x)f^*(D(x)) \approx D_{f}(P \| Q)$
:::
于是:
$$
D_{f}(P \| Q) \approx  \max _{D} \left\{\int_{x} p(x) D(x) d x-\int_{x} q(x) f^{*}(D(x)) dx \right\}
$$

$$
=\max _{D}\left\{\mathbb{E}_{x \sim P}[D(x)]-\mathbb{E}_{x \sim Q}\left[f^{*}(D(x))\right]\right\}
$$

有没有很熟悉的感觉， 我们把$P$换成$P_{data}$, 将$Q$换成$P_{G}$, 就得到了:

$$
D_{f}(P_{data} \| P_{G}) \approx \max _{D}\left\{\mathbb{E}_{x \sim P_{data}}[D(x)]-\mathbb{E}_{x \sim P_{G}}\left[f^{*}(D(x))\right]\right\}
$$

## 和GAN的关系
GAN的最终目的:
$$
G^{*}=\arg \min _{G} D_{f}\left(P_{\text {data}} \| P_{G}\right)
$$

$$
=\arg \min _{G} \max _{D}\left\{\mathbb{E}_{x \sim P_{\text {data}}}[D(x)]-\mathbb{E}_{x \sim P_{G}}\left[f^{*}(D(x))\right]\right\}
$$

$$
=\arg \min _{G} \max _{D} V(G, D)
$$

回想一下在我们在最初学习GAN的时候是直接定义:

$$
V(G, D) =  \mathbb{E}_{x \sim P_{\text {data}}}[\log D(x)]+\mathbb{E}_{x \sim P_{G}}[\log (1-D(x))]
$$

可以[证明](https://youtu.be/DMA4MrNieWo?t=2246)使用这个上面这个$V$，我们minimize的其实是JS Divergence.

也就是说GAN里面的$V$是有一个通用形式的:

$$
V(G, D) = \mathbb{E}_{x \sim P_{\text {data}}}[D(x)]-\mathbb{E}_{x \sim P_{G}}\left[f^{*}(D(x))\right]
$$

也就是说GAN里面要Minimize的Divergence是有一个通用的形式的:
$$
D_{f}\left(P_{\text {data }} \| P_{G}\right)
$$

$f$取不同的值可以量不同的Deivergence.

上式里面用到的有不是凸函数$f$本身,而是$f$的凸共轭$f^*$, 所以就想明白了为什么GAN和凸共轭有关系。

**参考**:

[台大李宏毅老师GAN课程:GAN Lecture 5 (2018): General Framework](https://youtu.be/av1bqilLsyQ)

<Livere/>