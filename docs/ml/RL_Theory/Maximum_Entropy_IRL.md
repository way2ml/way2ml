---
pageClass: ml-class
---
# Maximum entropy(MaxEnt) Inverse Reinforcement Learning
## 意义
MaxEnt IRL算法是解决下面问题的:
- There are many optimal policies that can explain a set of demonstrations.

::: warning 疑问?
也就是说想要找到一个唯一的Policy来解释专家轨迹吗?
:::

## 处理方法
MaxEnt IRL算法的处理办法是:
- Maximize the Log likelihood over the demonstrations.

里面用到很重要的一点是:
- The reward of a trajectory is expressed as a linear combinations with feature counts.　

注意: 这里提到的reward of a trajectory的含义和return的含义是一样的。

::: tip Feature counts
feature counts 指的的是下面这个表达式:

$$
\mathbf{f}_{\tau}=\sum_{s_{j} \in \tau} \mathbf{f}_{s_{j}}
$$

它的意思是，沿着这个path的state feature的和。

因此上面提到的很重要一点用数学语言来描述就是:

$$
\text{reward} \left(\tau\right)=\theta^{\top} \mathbf{f}_{\tau}=\sum_{s_{j} \in \tau} \theta^{\top} \mathbf{f}_{s_{j}}
$$

相当于这里作者是直接去拟合的Return。
:::

## 约束
1. Feature matching

$$
\sum_{\tau} p_{\tau} \mathbf{f}_{\tau}=\mathbf{\bar{f}}
$$

其中$p_{\tau}$代表trajectory $\tau$ 出现的概率, $\mathbf{\bar{f}} = \frac{1}{m} \sum_{i} \mathbf{f}_{\tilde{\tau}_{i}}$是$m$条专家轨迹的feature count的均值。
那$\mathbf{f_{\tau}}$的意义是什么?

reward的基

2. maximize the log likelihood

$$
\text {maximize} -\sum_{\tau} p(\tau) \log p(\tau)
$$

## 解这个最优问题
::: tip 问题描述
找到一个最优$p_{\tau}$, 使得$-\sum_{\tau} p(\tau) \log p(\tau)$取得最大值。其中$p_{\tau}$满足下面的约束条件:
- $\sum_{\tau} p_{\tau} \mathbf{f}_{\tau}-\mathbf{\bar{f}} = \sum_{i=1}^m(p_{\tau_i}\mathbf{f}_{\tau_i} - \mathbf{f}_{\tilde{\tau}_i}) =0$
- $\sum_{\tau} p_{\tau} - 1 = 0$
这就是一个条件极值的问题。
:::

::: tip 解这个条件极值的问题
令:
$$
F(p(\tau)) = \sum_{\tau} p(\tau) \log p(\tau) - \sum_{i=1}^m \lambda_i \sum_{i=1}^m(p_{\tau_i}\mathbf{f}_{\tau_i} - \mathbf{f}_{\tilde{\tau}_i}) - \lambda_2(\sum_{\tau} p_{\tau} - 1)
$$

再令$F$对$p(\tau)$的一阶导为零(其中$１＋\lambda_2 \doteq \lambda_0$):
$$
\frac{dF}{dp(\tau)} =  \sum_{\tau}\log p(\tau) + \sum_{\tau}1 - \sum_{i=1}^m \lambda_i \sum_{i=1}^m\mathbf{f}(\tau_i) - \lambda_2 \sum_{\tau} 1 =   
$$

$$
\sum_{\tau}\log p(\tau) - \sum_{i=1}^m\lambda_i \sum_{i=1}^m\mathbf{f}_{\tau_i} + \sum_{\tau}(1-\lambda_2) = \sum_{\tau}(\log p(\tau) + \lambda_0)  - \sum_{i=1}^m\lambda_i \sum_{\tau} \mathbf{f}_{\tau} = 0
$$

$$
\log p(\tau) + \lambda_0 = \left(\sum_{i=1}^m \lambda_i\right)\mathbf{f}_{\tau}
$$

得到:
$$
p(\tau) = e^{- \lambda_0 +\sum_{i=1}^{m}\lambda_i \mathbf{f}(\tau)} 
$$

由　$\sum_{\tau}p(\tau) = 1$　可以得到：

$$
\sum_{\tau}p(\tau) = e^{- \lambda_0 } \sum_{\tau}e^{\sum_{i=1}^{m}\lambda_i \mathbf{f}(\tau)} = 1
$$

于是可以得到:
$$
e^{- \lambda_0 } = \frac{1}{\sum_{\tau}e^{\sum_{i=1}^{m}\lambda_i f(\tau)}}
$$

带入到$p_{\tau}$的表达式可以得到:
$$
p(\tau) = \frac{1}{\sum_{\tau}e^{\sum_{i=1}^{m}\lambda_i \mathbf{f}(\tau)}}e^{\sum_{i=1}^{m}\lambda_i \mathbf{f}(\tau)} = \frac{1}{\sum_{\tau}e^{\theta^{\top} \mathbf{f}(\tau)}}e^{\theta^{\top} \mathbf{f}(\tau)}
$$
其中$z = \sum_{\tau}e^{\theta^{\top} \mathbf{f}(\tau)}$, 也被叫做Partition Function.

:::

$p_{\tau}$这个分布被叫做最大熵分布:

Principle of Maximum entropy(Jaynes 1957):
Probability of a demonstrated trajectory is proportional to its exponential of reward of the trajectory.

$$
p(\tau) \propto \exp (r(\tau))
$$

概率模型确定后想要得到模型的参数，可以使用极大似然估计的方法:

And the objective is find $\theta$ to maximize the log likelihood of the demonstrated trajectories. 

$$
\theta^{*}=\text{argmax}_{\theta} L(\theta)=\text{argmax}_{\theta} \frac{1}{m} \sum_{\tau_{d} \in D} \log p\left(r\left(\tau_{d}\right)\right)
$$

然后我们需要利用机器学习的算法去得到参数$\theta^{*}$, 这样我们就找到最优的reward权重,　同时我们也得到了概率模型。

接下来就是如何解这个最优的问题了。



最大熵原理是指，在学习概率模型时，在所有满足约束的概率模型（分布）中，熵最大的模型是最好的模型。这是因为，通过熵最大所选取的模型，没有对未知（即除了约束已知外）做任何主观假设。也就是说，除了约束条件外，我们不知道任何其他信息。

[知乎:强化学习进阶 第十讲 逆向强化学习（第三节 基于最大熵的方法)](https://zhuanlan.zhihu.com/p/26855870)<br>