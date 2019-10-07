---
pageClass: ml-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-10-05 17:11:06
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-10-06 15:44:19
 -->

## 什么是凸函数?
$f(x)$满足下面的关系就是凸的:

$$
f\left(\frac{x_{1}+x_{2}}{2}\right) \leq \frac{f\left(x_{1}\right)+f\left(x_{2}\right)}{2}
$$

<p align='center'>
<img src='/images/ml/others/convex_function.png' width='50%'>
</p>

[参考](https://zh.wikipedia.org/zh-cn/%E5%87%B8%E5%87%BD%E6%95%B0)

## 什么是上确界? 
sup是supremum单词的缩写，意思是最小上界。inf是单词infimum的简写，意思是最大下界。
数学中，经常出现的表示方式是 lim sup 或者 lim inf，即找上界或者下界的极限。

sup{S}就是S的上确界，即S的所有上界组成的集合的最小元。

举例:

集合S=[0,1], sup{S} = 1, max{S} = 1;<br/>
集合S=[0,1), sup{S} = 1, max{S} 不存在。

[参考1](https://www.zhihu.com/question/39819417)
[参考2](https://zhuanlan.zhihu.com/p/45002244)

## 什么是对偶空间? 
揭示点线对偶的实际就是直线方程：

$$
ax + by = C
$$

可以写成($f$是一个线性函数):

$$
f(x,y) = C
$$

为了更广泛地表示不同维度的情况，把$x,y$写作 $\vec v$:

$$
f(\vec v) = C
$$

之前提到的“点动成线”实际上就是 $\vec v$ 在变化:

线动成点”则是$f$在变化:

我们可以认为:

$$
V=\vec{v_{1}}, \vec{v_{2}},\vec{v_{3}}, \cdots
$$

代表点， 而

$$
V^{*}=f_{1}, f_{2}, f_{3}, \cdots
$$

代表线。
认为$V^{*}$是$V$的对偶空间。

[参考](https://www.zhihu.com/question/38464481)

## 什么是Dom f?

$$
f: \mathbb{N} \rightarrow \mathbb{N}
$$

表示: 函数$f$的定义域是$\mathbb{N}$,(自然数), 而陪域也是$\mathbb{N}$

$$
f: x \mapsto x^{2}
$$

或者

$$
f(x) = x^2
$$

表示: 函数$f$的输入是$x$,而返回值是$x^2$

$Dom(f)$ 或者 $Dom f$的意思是: 函数$f$的定义域;<br/>
$Ran(f)$ 或者 $Ran f$的意思是: 函数$f$的值域。

[参考](https://www.shuxuele.com/sets/domain-range-codomain.html)

## 什么是凸共轭? 
凸共轭也叫作Fenchel Conjugate, 不过名字什么的都不是那么重要啦。我们说每个凸函数$f$都有一个伙伴$f^*$。它是这样定义的:

$$
f^*(t) = \max _{x \in dom(f)}\{x t-f(x)\}
$$

先不要放弃，再坚持一会儿。
举个例子，我们想要算$f^*(t_1)$的值是多少, 我们是这样做的:
::: tip 算个t时的凸共轭
1. 带入$t_1$到$x t-f(x)$得到$x t_1-f(x)$
2. 穷举所有的$x$,得到下面一组数:
    - $x_1 t_1-f(x_1)$
    - $x_2 t_1-f(x_2)$
    - ...
    - $x_n t_1-f(x_n)$
3. 比较哪一组数最大(假设第一组数最大)
4. 得到$f^*(t_1) = x_1 t_1-f(x_1)$
:::
对于$t$取其他的值，重复上面的过程， 取完所有的$t$就得到了函数$f^*(t)$;

用上的方式找到$f^*(t)$貌似有些复杂，我们可以有更简单的方式找到$f^*(t)$

::: tip 一种求凸共轭函数更好的方法
1. 穷举所有的$x$, 做$x t-f(x)$的函数图, 如图中黑线
2. 给定一个$t$,作$t=t_1$,交点最大值即为$f^*(t_1)$
3. $t$从左到右移动，重复2步骤，交点就形成了红色的线。
4. 红色的线就是$f^*(t)$
:::

<p align='center'>
<img src='/images/ml/others/convex_conjugate.png' width='50%'>
</p>

[参考0: 李宏毅老师在GAN课程里面对凸共轭的解释](https://www.youtube.com/watch?v=av1bqilLsyQ&pbjreload=10)<br/>
[参考1](https://blog.csdn.net/xiaocj423/article/details/50831001)<br/>
[参考2](https://blog.csdn.net/xueyingxue001/article/details/51858074)

::: warning 疑问
- 凸函数才有凸共轭吗? 
- 应该是这样
:::