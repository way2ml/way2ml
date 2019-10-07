---
pageClass: ml-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-10-04 21:55:07
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-10-06 16:42:57
 -->
# 什么是熵，交叉熵, KL Divergence, JS Divergence, f Divergence?
## 熵
熵是信息的度量:
$$
H(p) = -\sum_i p(x_i) log_b p(x_i)
$$

## 交叉熵 
交叉熵:
$$
H(p,q) = -\sum_i p(x_i) log_b q(x_i)
$$

其中$p$是真实的概率分布,$q$是预测的概率分布。
通常情况$H(p,q) > H(p)$

## KL Divergence 
KL Divergence就是:

$$
D_{KL}(P||Q) = H(p,q) - H(p) = -\sum_i p(x_i) log_b \frac{q(x_i)}{p(x_i)}
$$

[参考: Hands-On Machine Learning with Scikit-Learn & Tensorflow的作者讲解熵,交叉熵,KL散度](https://www.youtube.com/watch?v=ErfnhcEV1O8)

## JS Divergence
JS Divergence是KL Divergence的一种变形:

$$
D_{JS}(p \| q)=\frac{1}{2} D_{KL}\left(p \| \frac{p+q}{2}\right)+\frac{1}{2} D_{KL}\left(q \| \frac{p+q}{2}\right)
$$
- 值域范围
JS散度的值域范围是[0,1]，相同为0，相反则为1。相比较于KL，对相似度的判别更准确了。
- 对称性
即 $D_{JS}(p \| q)=D_{JS}(q \| p)$, 而对称能让散度度量更准确。

[参考: KL散度与JS散度](https://blog.csdn.net/qq_29053993/article/details/83313866)

## f Divergence

$f$ Divergence 长下面这个样子:(这是==f Divergence的定义==)
$$
D_{f}(P \| Q)=\int_{x} q(x) f\left(\frac{p(x)}{q(x)}\right) d x
$$
这里面要满足两个条件: 
::: tip 条件
1. $f$是凸函数, 
2. $f(1)=0$
:::
==$f$取不同的函数，可以得到不同的Divergence:==

例如, $f(x) = xlogx$, 得到：

$$
D_f(P||Q) = \int_{x} q(x) \frac{p(x)}{q(x)} \log \left(\frac{p(x)}{q(x)}\right) d x=\int_{x} p(x) \log \left(\frac{p(x)}{q(x)}\right) d x
$$

这其实就是KL Divergence;

又如, $f(x) = -logx$, 得到: 
$$
D_{f}(P \| Q)=\int_{x} q(x)\left(-\log \left(\frac{p(x)}{q(x)}\right)\right) d x=\int_{x} q(x) \log \left(\frac{q(x)}{p(x)}\right) d x
$$
这其实就是Reverse KL Divergence;

再如, $f(x) = (x-1)^2$, 得到:
$$
D_{f}(P \| Q)=\int_{x}q(x)\left(\frac{p(x)}{q(x)}-1\right)^{2} d x=\int_{x} \frac{(p(x)-q(x))^{2}}{q(x)} d x
$$
这其实就是Chi Square Divergence.

也就是是说，==f Divergence是各种Divergence的总称。==

下面截取一张维基百科上不同Divergence对应的f函数的表:

<p align='center'>
<img src='/images/ml/others/f_divergence.png' width='50%'>
</p>

要使用什么Divergence,就在这个表里面选择对应的f函数就可以了。就是这么回事。So easy。

[参考:李宏毅老师的课程 GAN Lecture 5 (2018): General Framework](https://www.youtube.com/watch?v=av1bqilLsyQ&pbjreload=10)

[参考:维基百科F-divergence](https://en.wikipedia.org/wiki/F-divergence)

