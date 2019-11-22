---
pageClass: ml-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-10-25 09:38:49
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-10-26 17:20:04
 -->

# 一些关于GAN的思考
## GAN大体的结构是什么样子? 
生成对抗神经网络有两部分:
- **生成器**学习产生可信的(plausible)的数据。生成的数据立即变成负样本去训练判别器。
- **判别器**学习分辨生成器的假数据和真实的数据。判别器惩罚生成器产生的不真实的数据。

## 判别器
判别器就仅仅是一个二分类器。

训练数据:
- 真实数据，例如真人的照片，作为训练判别器的正样本
- 假数据(生成器生成的数据), 作为训练判别器的负样本。

训练过程:
- 1. 判别器去分辨真实数据和假数据
- 2. 判别器的loss会惩罚错误的判断(将真的判别成假的或者将假的判别成真的);也就是说错得越多loss越大。
- 3. 根据loss通过backpropagation更新判断器的参数



## GAN最终达到的效果是什么? 
**生成器**训练得足够好。 判别器变得足够差，它开始将假的数据判别成真的, 判断的准确率开始下降。

::: warning 上面的意思是说判别器到最后没有一点用吗? 
不是判别器一点用都没有，而是判别器的输出对于优化生成器没有用了。我个人认为判别器只是不能够判断出很好的
:::

## Discriminator不改变可以训练好Generator吗?
::: warning 可以拿训练好的Discriminator再从头训练得到一个Generator吗?

:::

## GAN中的两个模型谁比较难训练? 
生成模型要模型化一个非常复杂的分布

## GAN很难判断是否收敛是什么意思?
随着生成器性能在训练过程中的不断提升,判别器的性能变得越来越差, 因为它不能很容易地分辨出真假。
如果生成器在这个博弈的过程中完全取胜,那么判别器的准确率就变成了50%。
也就是说这个时候的判别器在扔硬币在做判断。


也就是说，随着时间的变化，判别器的反馈(输出)变得越来越没有意义。
如果判别器都在抛硬币做判断了,你还在继续训练，也就是说这个时候生成器得到的反馈是没有任何意义的。
那么你的生成器的性能就可能会下降。

::: tip 思考
这里我们说的性能越来越差的意思是判别器很难判别真的和很好的,并不是不能判断好的差的；
这里我们说的判别器的反馈(输出)变得越来越没有意义，并不是说判别器本身并没有意义，而是对于优化G的参数并没有意义。

我认为这一点非常重要:
我认为李宏毅老师说的最后的D会烂掉的意思绝对不是D本身没有意义，而是说D最后对于优化G没有任何意义。
:::

因此对于GAN来说,收敛转瞬即逝的, 而不是到达一个稳态。

[原文](https://developers.google.com/machine-learning/gan/training)

## 用一句话描述GAN
GAN是在重复一个概率分布。

## Loss Function
既然是重复一个概率分布我们就需要一个Loss Function来反应真实数据的概率分布和生成数据的概率分布之间的距离。


## 实际中GAN会遇到的问题
GAN有很多失败的情况。所有的这些都是Active Reserch这个领域的问题, 然而这些问题到现在一个都还没有解决。

1. Vanishing Gradients

[Research](https://arxiv.org/pdf/1701.04862.pdf) has suggested 
that if your discriminator is too good, then generator training can fail due to 
[vanishing gradients](https://en.wikipedia.org/wiki/Vanishing_gradient_problem). 
In effect, an optimal discriminator doesn't provide enough information 
for the generator to make progress.

2. Mode Collapse

3. Failure to Converge


## 原始的GAN的问题是什么? 
一句话概括：判别器越好，生成器梯度消失越严重。


参考:

[谷歌GAN教程](https://developers.google.com/machine-learning/gan)<br/>
[知乎:令人拍案叫绝的Wasserstein GAN](https://zhuanlan.zhihu.com/p/25071913)<br/>
[Why it is so hard to train Generative Adversarial Networks!](https://medium.com/@jonathan_hui/gan-why-it-is-so-hard-to-train-generative-advisory-networks-819a86b3750b)<br/>
[From GAN to WGAN](https://lilianweng.github.io/lil-log/2017/08/20/from-GAN-to-WGAN.html)<br/>