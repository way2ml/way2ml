---
pageClass: ml-class
---
# 反向强化学习
## Algorithms for Inverse Reinforcement Learning
`1999 Andrew Y. Ng, Stuart Russel`

首先构造一个Reward Function:
$$
R(s)=\alpha_{1} \phi_{1}(s)+\alpha_{2} \phi_{2}(s)+\cdots+\alpha_{d} \phi_{d}(s)
$$

其中$\phi_{1}...\phi_{d}$是固定的有界基组。

::: tip Bounded basis functions 有界基组
类似正弦函数,余弦函数，常数函数的叫有界函数；
基组，就像傅里叶展开的基函数，勒让德多项式的基组，直角坐标系各轴上的单位矢量，泰勒展开的基，等等都可以看成是"基矢量";

在基矢量$\phi_i$张成的矢量空间里展开$R(s)$，跟矢量分解一样;

最常见的就是三角函数构成的基，也就是傅里叶级数的基函数，其他的还有贝塞尔函数（主要用在柱坐标系），球谐函数（主要用在球坐标系），勒让德多项式，以及其他各种多项式；

对于一个函数，你要把它想象成一个矢量，这里把函数展开，和把一个三维矢量在直角坐标系下展开是一样的。不同在于，函数展开时有很多个基(甚至无穷多个)，矢量展开只有三个基;

:::

接下来用下面的式子，表示使用策略$\pi$时，在$R=\phi_i$时的值函数:
$$
V_i^{\pi}
$$

:::tip 理解
这里相当于把Reward分解到了不同的方向,$\phi_i$代表在第$i$个方向上的基础分量。
另外已知一个策略$\pi$, 我们便有各种方法求得与其对应的值函数,例如MC和TD。

使用$V_i^{\pi}$相当于把$V$分解了。
:::

类似于物理里面的求合力, 当使用策略$\pi$时，当$R$为合$R$时，对应的合$V$可以表示成:
$$
V^{\pi}=\alpha_{1} V_{1}^{\pi}+\cdots+\alpha_{d} V_{d}^{\pi}
$$


接下来，我们想让策略$\pi(s) \equiv a_1$ 最优, 也就是使得下面的式子对于所有的状态$s$都成立, 其中$a \in A \backslash a_{1}$:
$$
\mathrm{E}_{s^{\prime} \sim P_{s a_{1}}}\left[V^{\pi}\left(s^{\prime}\right)\right] \geq \mathrm{E}_{s^{\prime} \sim P_{s a}}\left[V^{\pi}\left(s^{\prime}\right)\right]
$$

::: tip 恒等
恒等于号 $\equiv$, ([Identical to](https://en.wikipedia.org/wiki/Triple_bar))一般用于一些参变量恒为一个常数或恒定表达式时，表示这种等于关系与变量无关。
:::

::: tip 为何是s', 而非s?
$s'$是由Agent在$s$状态采取动作后到达新的状态。这样在相同状态$s$下,比较上式中的$s'$的值函数就可以体现出两种策略($a_1,a$)的优劣。
:::

上面的式子有两个问题:

1. 对于无穷的状态空间(infinite state spaces),状态太多不可能全部都去对比，也就是算不过来。

解决这个问题的方法就是在无穷的空间中抽了有限的状态空间$S_0$, 我们只是对$s \in S_0$的这些状态去对比上式。
通俗一点就是表格法，即将连续状态分成有限个离散的表格。

2. 既然我们先就假设了Reward Function是基矢量的线性展开,那么我们很有可能永远也找不到真正的Reward Function.
即使是这样，我们还是继续使用先前提到的Reward Function的表达式。作为一种妥协，我们不要那么强的约束,类似于在loss里面添加正则项。

$$
\text { maximize } \sum_{s \in S_{0}} \min _{a \in\left\{a_{2}, \ldots, a_{k}\right\}} \{p\left(\mathrm{E}_{s^{\prime} \sim P_{s a_{1}}}\left[V^{\pi}\left(s^{\prime}\right)\right]-\mathrm{E}_{s^{\prime} \sim P_{s a}}\left[V^{\pi}\left(s^{\prime}\right)\right]\right)\} 
$$

$s.t. \ \ |\alpha_{i}| \leq 1,  i=1,..., d$, 这里的$p(x) = x$若$x \geq 0$, 否则$p(x) = 2x$

::: tip 理解
为了简便令$M = \mathrm{E}_{s^{\prime} \sim P_{s a_{1}}}\left[V^{\pi}\left(s^{\prime}\right)\right]-\mathrm{E}_{s^{\prime} \sim P_{s a}}\left[V^{\pi}\left(s^{\prime}\right)\right]$, $a$可以在$\{a_2,...,a_k\}$当中随便取, 然后找到最小的那个$M$, 我们现在就想让这个最小的$M$都要大于0, 于是我们尝试调整R来满足这个条件。

这里的$p$可以这样去解释，当$M<0$时，即出现了我们不希望看到的，因此我们要惩罚这样的R的参数, 于是我们强行负的更多(2倍), 
这样又需要做更多的调整来满足最小的M都要大于０这个约束。
:::

::: warning 疑问
为什么这里有　s.t. $|\alpha_i| \leq 1$, 难道这样就约束到了吗?
:::


看到这里我的疑惑是，你说的都对,但是我该如何操作呢? 接下来就讲如何操作。

我们现在是有最优策略$\pi$的, 我们使用最优策略得到$m$条轨迹,记录下agent经历过的状态$(s_0,s_1,...)$
根据$V$函数的意义:==值函数是从此刻到未来回报的期望==, 那么可以得到在$i$方向(别忘了了我们有$d$个方向)的分$V$的单位长度为:

$$
\hat{V}_{i}^{\pi}\left(s_{0}\right)=\phi_{i}\left(s_{0}\right)+\gamma \phi_{i}\left(s_{1}\right)+\gamma^{2} \phi_{i}\left(s_{2}\right)+\cdots
$$

自然的$d$个方向的叠加得到合$V$的表达式便成了:
$$
\hat{V}^{\pi}\left(s_{0}\right)=\alpha_{1} \hat{V}_{1}^{\pi}\left(s_{0}\right)+\cdots+\alpha_{d} \hat{V}_{d}^{\pi}\left(s_{0}\right)
$$

我们希望找到合适的$\alpha$的组合使得下面的式子都成立:

$$
V^{\pi^{*}}\left(s_{0}\right) \geq V^{\pi_{i}}\left(s_{0}\right),  i=1, ... , k
$$

::: tip 注意
在某个状态下的策略就是动作,所以这里$k$的值就该是动作的数目。

这里的$s_0$要注意了, 虽然是表示开始状态，可是这里的开始指的是时间的开始，也就是说$s_0$可以是有限状态空间里面的任意值。
:::

将我们的优化过程具体化，于是我们要做的事便变成了:
$$
\text { maximize } \quad \sum_{i=1}^{k} p\left(\hat{V}^{\pi^{*}}\left(s_{0}\right)-\hat{V}^{\pi_{i}}\left(s_{0}\right)\right)
$$

$s.t. \ \ |\alpha_{i}| \leq 1,  i=1,..., d$

总结:
上面就是在做这样的事:
1. 我们先定义一个参数可变的Reward Function, 其值由$\alpha_1,\alpha_2,...,\alpha_d$决定。
2. 由这组参数我们可以定义出$V^{\pi}$
3. 根据$\$

::: warning 最后学到的Reward怎么样才算是好的Reward呢?
现在还不能够具体地说什么样的Reward是好的Reward, 但是训出来的Reward必须要满足下面的条件，才能说这个Reward至少是有用的:

使用这个IRL学习到的Reward作为RL的Reward要能够解决RL问题，也就是要得到一个比较好的策略。
:::

::: warning 思考
这里的Reward Function只和状态有关，但事实是这样的吗? 你的Reward想要和动作相关吗? 

这里的Reward Function作者只是关心了多个状态中的其中一个分量, 那你想要的Reward Function是什么呢? 

你是想要和全部的状态相关呢，还是只想和状态的其中一个分量相关? 也就是是说Reward Function究竟是什么是可以由你自己选择的。
你可以选择哪些你认为重要的东西，就像作者这里做的。他认为Reward Function只和位置相关就可以了,可以不和速度相关。这也是可以的；
当然我完全可以设计一个和位置不相干的Reward Function, 比如我就认为只要是和速度相关就可以了，这样应该也是可以得到对应的Reward Function的。==你证明给我看==
:::

## Generative Adversarial Imitation Learning
GAIL的全称是Generative Adversarial Imitation Learning，它是反向强化学习(Inverse Reinforcement Learning)的其中一种。


::: warning 疑问?
GAIL中最后得到的Reward可以用来正常做强化学习吗?

不能,因为GAIL最后得到的Reward一点用处也没有。严格来说, GAIL只是模仿学习, GAIL最后只是学到了类似专家的策略。
:::

::: danger 纠错
尽管有很多人将GAIL叫做反向强化学习，但是GAIL绝对不算是反向强化学习。因为它根本没有恢复出合理的Reward。
所以GAIL只能叫做模仿学习。
:::


