# 常用概率分布
这一部分列出常常会用到的概率分布。

## 伯努利分布
只有两种可能的结果(成功或者失败)的单词随机试验就被叫做伯努利试验(Bernoulli trial)。这样命名是
为了纪念瑞士数学家雅各布·伯努利([Jacob Bernoulli](https://en.wikipedia.org/wiki/Jacob_Bernoulli))。
在伯努利试验中每次试验成功的概率都是固定的。我们用 $p$ 表示每次伯努利试验成功的概率，$q$ 表示每次伯努利试验
失败的概率。由于只有两种可能的结果，因此 $p+q = 1$。用一个随机变量 $X$ 表示伯努利试验的结果，若试验成功记为 
$X=1$, 失败记为 $X=0$。于是$X$对应的分布就可以表示为,

|  $X$   |  $0$   |  $1$   |
| :--: | :--: | :--: |
|  $P$   |  $q$   |  $p$   |

也就是
$$
P(X=x)=p^{x}(1-p)^{1-x}=\left\{\begin{array}{ll}p & \text { if } \; x=1 \\ q & \text { if } \; x=0\end{array}\right.
$$ 

于是可以计算出伯努利分布的期望。

$$
\mathbb{E}(X) = \sum_{i=0}^1 x_i P(X=x) = 0 + p = p
$$

方差

$$
\text{Var}[X]=\sum_{i=0}^{1}\left(x_{i}-E[X]\right)^{2} P(X=x)=(0-p)^{2}(1-p)+(1-p)^{2} p=p(1-p)=p q
$$

::: tip Tips
伯努利分布也被称为**两点分布**或者**0-1分布**。
:::

## 二项分布
如果一个随机变量 $X$ 服从一个参数为 $n$ , $p$ 的伯努利分布，我们将其表示成 $X\sim B(n,p)$。在 $n$ 次
**独立**的伯努利试验中，$k$ 次成功的概率可以表达成:

$$
f(k, n, p)=\text{Pr}(k ; n, p)=\text{Pr}(X=k)=\left(\begin{array}{l}n \\ k\end{array}\right) p^{k}(1-p)^{n-k}
$$


这里的$k$可以是$0,1,2,...,n$。 其中，

$$
\left(\begin{array}{l}n \\ k\end{array}\right)=\frac{n !}{k !(n-k) !}
$$

是二项式系数，因此$X$对应的分布叫做二项分布(Binomial distribution)。

两个随机变量 $X_1, X_2$ 如果是相互独立的，那么有下面的关系


$$
\mathbb{E}(X_1 + X_2) = \mathbb{E}(X_1) + \mathbb{E}(X_2)
$$

$$
\text{Var}(X_1 + X_2) = \text{Var}(X_1) + \text{Var}(X_2)
$$

我们用 $X$ 表示 $n$ 次伯努利试验中结果成功的次数。用 $X_i$ 表示第 $i$ 次伯努利试验的结果， 那么

$$
X = \sum_{i=0}^n X_i
$$

进而我们可以算出期望, 方差

$$
\mathbb{E}(X) = \sum_{i=1}^n \mathbb{E}(X_i) = np
$$

$$
\text{Var}(X) = \sum_{i=1}^n \text{Var}(X_i) = np(1-p)
$$

## 一维高斯分布

$$
p_{X}(x)=\frac{1}{\sqrt{2 \pi} \sigma} \exp \left(-\frac{(x-\mu)^{2}}{2 \sigma^{2}}\right)
$$

$$
h(X)=\frac{1}{2}\left[1+\log \left(2 \pi \sigma^{2}\right)\right]
$$

![](https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/gussian_dis.png)

1. [Wikipedia: Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution)