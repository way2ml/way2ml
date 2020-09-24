---
pageClass: ml-class
author: 黄杰
---
# GAN入门，有这篇就够了🎉🎉🎉
<p align='center'>
<img src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/deepdream.png' width='100%'>
</p>

2016年某日，有人在[Quora](https://www.quora.com)上抛出问题: [在深度学习领域有哪些正在或将要爆发的大突破？](https://www.quora.com/What-are-some-recent-and-potentially-upcoming-breakthroughs-in-deep-learning) 
不曾料到Facebook AI首席科学家[杨立昆](http://yann.lecun.com/)对这个问题做出了详细的回答。他提到：
> 在深度学习领域最近有太多的发展让我没有办法在这里一一列举。
> 在我看来最重要的是对抗训练(也被叫做生成对抗神经网络, 简称GAN). 最开始是由[Goodfellow](http://www.iangoodfellow.com/)在学生时期提出来的。
> 我想这个(指GAN)和那些正在被提出的变形是过去10年来最有趣的想法。

可以看到他给了GAN非常高的评价🎉，一方法说最重要的是GAN，另外一方面更是说GAN是过去10年来最有趣的想法。
杨立昆最重要的贡献是在图像处理领域，他提出了卷积神经网络(CNN), 因此也被叫做卷积神经网络之父🧔🏻。我猜想他
对GAN给出这么高的评价很有可能是GAN在图像领域有着广泛的应用。


<Cimg src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/yann-lecun.jpg' width='100%' caption='卷积神经网络之父 杨立昆(Yann Lecun)正在向学习GAN的我们微笑'/>

例如，文章开头的图片就是GAN应用的一个很好的例子。这是一个叫做[Deep Dream Generator](https://deepdreamgenerator.com)
的网页应用，用户JosieArt上传一张大象🐘图片，然后选择了图片左下角的风格，通过训练好的生成器
就可以生成相应风格的图片。得到的效果是否还很不错呢？

当然这里提到的只是GAN应用的冰山一角，在[Gans Awesome Applications](https://github.com/nashory/gans-awesome-applications)
上可以查看大量GAN的应用。

此刻或许大家就会好奇🤔，到底什么是GAN？ 

## 什么是GAN🤔️
GAN有两个神经网络🕸🕸。

第一个叫**判别器**(**Discriminator**)，记做$D(Y)$。它得到输入$Y$(比如一张图)后输出一个
值，这个值表示了$Y$看起来是否"真实"。$D(Y)$可以看作某种能量函数，当$Y$是真实样本时，函数的值接近0, 
反之，当图片$Y$的噪声很大或者很奇怪时，函数值为正。 


<Cimg src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/gans.jpg' width='100%' caption='Generative adversarial network(GAN)'/>


另一个网络叫做**生成器**(Generator), 记为$G(Z)$。
这里的$Z$通常是从一个简单分布(例如高斯分布)随机抽样得到的向量，生成器$G(Z)$的作用是生成图片，这些
生成的图片会被用来训练判别器$D(Y)$(给真实图片较低的值，其他的图片较高的值)。

训练$D$的过程中,给它一张真实的图片，使其调整参数输出较低的值；再给它一张$G$生成的图片，让它调整参数
输出较大的值$D(G(Z))$。

另一方面，在训练$G$的时候, 它会调整内部的参数使得它生成的图片越来越真实。也就是它一直在优化使得它产生的
图片能够骗过$D$, 想要让$D$认为它生成的图片是真实的。

也就是说，对这些生成的图片，$G$想要最小化$D$的输出，而$D$想要最大化$D$的输出。所以这样的训练就叫做
**对抗训练**(adversarial training), 也叫做**GAN**。

## 训练目标🎯
就拿生成图片来说清楚GAN背后是在做什么。

日本晨间剧《[半分、青い。](https://ja.wikipedia.org/wiki/%E5%8D%8A%E5%88%86%E3%80%81%E9%9D%92%E3%81%84%E3%80%82)》，讲述了一个活泼小女孩，玲爱，在一次生病后造成左耳失聪，却没因此而气馁，
在父母与青梅竹马的鼓励下继续开朗的活着，成为东京漫画家的故事。

<Cimg src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/yongyeyayu.jpg' width='100%' caption='《半分、青い。》中的玲爱开心地加入GAN训练项目'/>

说这个故事是因为我们这里需要**漫画家**😉。

假设我们有很多玲爱画的卡通头像。每一张图可以看做是高维空间中的一个点$x$, 
由于所有的这些卡通头像都是玲爱画的,因此认为所有的这些点都服从玲爱风格的某个分布$P_{data}(x)$;
也就是说，只要从这个分布里面随便采样一个点$x$, 那么这个点$x$对应的
头像都应该和玲爱画的风格一样。

::: tip GAN的目标
让机器学会生成玲爱风格的卡通头像。
:::
因此, 我们的目的是要**找到一个生成器,它所产生的样本$x$对应的分布$P_{G}(x)$和玲爱对应的分布$P_{data}(x)$越接近越好**。

但该如何衡量分布的接近程度呢？这是一个问题，我们继续往下看。

## 训练思路📕
训练GAN可以分成下面的步骤😅:
<Cimg src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/daxiang.jpg' width='100%' caption='把大象放进冰箱的3个步骤'/>

**步骤1**<br/>
搭建一个生成器神经网络,所有参数用$\theta$表示，目的是用来生成图片$x$, 而这些样本$x$都服从分布$P_{G}(x; \theta)$。

**步骤2**<br/>
在现有头像数据库中抽出$n$张头像, 对应高维空间中$n$个点$\{x_1,x_2,...,x_n \}$。

"抽"的这个动作相当于在分布$P_{data}(x)$里采样， 能够抽到到$\{x_1,x_2,...,x_n\}$, 也就是
$P_{data}(x_1),P_{data}(x_2),...,P_{data}(x_n)$的概率很高。生成器训练的目标是让$P_{G}(x)$
和$P_{data}(x)$越接近越好。因此我们希望$P_{G}(x_1; \theta),P_{G}(x_2; \theta),...,P_{G}(x_n; \theta)$
中的每一个概率都很高, 换句话说就是想要$\prod_{k=1}^n P_{G}(x_k; \theta)$ 的值越大越好。

::: tip 提示
$x_1$被抽到了,那么一定是$P_{data}(x_1)$的概率高才会被抽到。
:::

**步骤3**<br/>
训练网络找到参数

$$
\theta^* = \arg \max_{\theta} \prod_{k=1}^n P_{G}(x_k; \theta)
$$

其中$\prod_{k=1}^n P_{G}(x_k; \theta)$叫做样本的**Likelihood**。 

可以证明:
$$
\arg \max_{\theta} \prod_{k=1}^n P_{G}(x_k; \theta) = \arg \min_{\theta} [KL(P_{data}||P_{G})]
$$

这里$KL$指的是**KL Divergence**, 它可以表示[两个分布的接近程度](/ml/Others/entropy_cross_entropy_and_kl_divergence.md)。
上面这个式子说的是最大化**Likelihood**和最小化**KL Divergence**是同一个意思。

因此这个步骤变为:训练网络找到参数

$$
\theta^* = \arg \min_{\theta} [KL(P_{data}||P_{G})]
$$


::: details 证明： 最大化Likelihood = 最小化KL Divergence
$\arg \max_{\theta} \prod_{k=1}^n P_{G}(x_k; \theta) = \arg \max_{\theta} \log \prod_{k=1}^n  P_{G}(x_k; \theta)$

$= \arg \max_{\theta} \sum_{k=1}^n \log P_{G}(x_k; \theta)$, 由于$\{x_1,x_2,...,x_n\}$都来自于$P_{data}(x)$
这个分布, 因此:

$\approx \arg \max_{\theta} \mathbb{E}_{x \sim P_{data}(x)}[\log P_{G}(x; \theta)]$ 

$= \arg \max_{\theta} [\int_x P_{data}(x)\log P_{G}(x;\theta)dx]$ 下一步减一个常数，对找$\theta ^*$没有影响。

$= \arg \max_{\theta} [\int_x P_{data}(x)\log P_{G}(x;\theta)dx -  \int_x P_{data}(x)\log P_{data}(x)dx]$

$= \arg \max_{\theta} [\int_x P_{data}(x)\log \frac{P_{G}(x;\theta)}{P_{data}(x)}dx]$

$= \arg \max_{\theta} [- KL(P_{data}||P_{G})]$

$= \arg \min_{\theta} [KL(P_{data}||P_{G})]$

证毕
:::

## 具体步骤
### 搭建生成器
从上一个小结的准备工作中我们搭建了一个神经网络, 这个神经网络就是我们最后想要学习的生成器, 待它学习好了，我们就可以利用它
来生成玲爱风格的卡通头像了。

这个神经网络具体应该是什么样子的呢? 我们看下面这张图: 

<Cimg src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/generator.png' width='50%' caption='GAN中生成器(Generator)的结构'/>


输入是128维的一个向量, 这些输入的值可以控制输出头像的一些特征，例如头发的颜色，头发的长短, 肤色，性别等等。
[make.girls.moe](https://make.girls.moe/#/)是一个在线的卡通头像生成项目，去玩一下就很容易理解这里神经网络G的输入是什么了。

输出构成一张图片，这里的64x64个像素点最后可以拼成一张灰度图。

::: tip Tip
这里的输入可以看做是128维空间中的一个点;输出是4096维空间中的一个点; 输入数据我们从一个固定的分布中去采样(例如:128维的高斯分布);
我们期望神经网络(G)的输出数据(图片)的分布$P_{G}(x)$能够和$P_{data}(x)$的分布越接近越好。
:::

### 确认目的
训练最终目的: 找到
$$
G^* = \arg \min_{G} Div(P_{G}, P_{data})
$$

就是说我们想要找到一个最好的生成器$G^*$, 它能够使得$P_{G}$和$P_{data}$的某种Divergence越小越好(前面提到的$KL$是一种具体的Divergence)。
有目标后，一步一步走下去。 自然地，你就会问$Div(P_{G}, P_{data})$我们该怎么算? 

### 计算$Div(P_{G}, P_{data})$ 
任何一种Divergence都是有公式的，我在文章["什么是熵"](/ml/Others/entropy_cross_entropy_and_kl_divergence.md)中有提到。原则上直接带入公式就可以算出来了。但是这里的问题是我们不知道$P_{G}, P_{data}$的表达式是什么。

一方面，尽管我们有玲爱画的漫画头像库，但是我们也不知道她画的头像服从什么分布, 即$P_{data}$未知; 
另一方面，即使可以利用生成器生成很多的头像,但是我们也不知道这些生成的头像服从什么分布, 即$P_{G}$未知。
那应该如何计算两个分布的Divergence呢? 我们的手上只有两个分布的样本? 可以直接比较样本吗? 

答案是肯定的。这件事玲爱的漫画老师[秋風羽織](https://ja.wikipedia.org/wiki/%E8%B1%8A%E5%B7%9D%E6%82%A6%E5%8F%B8)
先生可以帮我们大忙。

<Cimg src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/qiufeng.jpg' width='100%' caption='《半分、青い。》中的秋風羽織正在查看两类图片'/>

我们将玲爱和生成器$G$画的头像分别拿去给秋风先生过目，让他说说谁画得更真实。毕竟是玲爱是秋风先生
的得意弟子，因此他总是想也不想就直接说玲爱的画的更好，还总是说生成的差太多。
生成器器没有办法，为了得到秋风先生的的夸赞它就会像玲爱学习。
这样的结果是机器或许真的可以变得和玲爱一样优秀。


::: tip 我们的期待
机器真的可以变得和玲爱一样优秀；也就是$P_{data}(x)$和$P_{G}(x)$可以很接近；也就是$Div(P_{G},P_{data})$很小。
:::

可以看到，在训练生成器的过程中, 有一个举足轻重的角色: **秋風羽織**先生。
在训练过程中，判别器可能会产生上万张图片，难道你真的准备让秋風先生去做这么无聊的事？😳

当然不行，因此我们需要另外一个角色来代替秋風先生，那便是👉👉👉判别器。
判别器就做一件事情: 给生成器的生成的头像打低分，给玲爱画的打高分。
开始时判别器的技能当然比不过秋風先生，每当生成器升级之后, 判别器也需要更新技能才能够很好地判断。
好在有很好的资料(训练数据,来自两个分布的样本)可以供它升级(更新网络参数参数)。因此我们希望最终可
以得到一个像秋風先生那般厉害的判别器$D^*$。

不能够直接算$Div(P_{G}, P_{data})$, 我们只能间接地训练一个判别器来判断一张图片有多像玲爱画的,
很像判别器输出的值就接近1, 不像就接近0; 通过判别器的输出$D$,我们再构造一个函数$V$, 这个函数就
反映了$Div(P_{G}, P_{data})$。 

<!-- ::: tip 最终目标:找到最好的生成器
$$
G^* = \arg \min_{G} \max_{D} V(G,D)
$$
::: -->

### 训练判别器
要反映$Div(P_{G}, P_{data})$, 就需要有一个判别器网络。
判别器的结构是什么样的呢?

<Cimg src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/discriminator.png' width='50%' caption='GAN中判别器(Discriminator)的结构' />

可以看到，判别器的输入是图片，输出是一个数,这个数反映的是这张图有多像玲爱画的。

我么如何才能得到像秋風先生那样厉害的判别器$D^*$呢？ 我们还需要做一件事，使用判别器构造出一个
二分类器，即是否判断输入图是否为玲爱的。

分类器的输出:

$$
V = \mathbb{E}_{x \sim P_{data}}[\log D(x)] + \mathbb{E}_{x \sim P_{G}}[\log (1-D(x))]
$$

::: details 解释
$V$的表达式可以这样理解，在训练判别器计算分类器输出时：
1. 当图片$x$来自玲爱数据集时，$x$带入$\mathbb{E}_{x \sim P_{data}}[\log D(x)]$计算。
2. 当图片$x$来自生成器数据集时，$x$带入$\mathbb{E}_{x \sim P_{G}}[\log (1-D(x))]$计算。

可以看到在1中$V$和判别器$D$相关; 在2中，由于图片$x$来自生成器，因此$V$还与$G$有关，因此$V$写作
$V(D,G)$
:::

于是判别器最优解，
$$
D^* = \arg \max_{D}V(D,G)
$$

通过调整参数，尝试找到最好的判别器$D^*$，它使得$V$的值越大越好; 要使$V$更大，
判别器就要学会:
- 给玲爱的画高分，即让$D(x)$的值越接近1越好;
- 给生成的画低分,即让$D(x)$的值越接近0越好。

新的问题是:

$$V(D,G) = \mathbb{E}_{x \sim P_{data}}[\log D(x)] + \mathbb{E}_{x \sim P_{G}}[\log (1-D(x))]$$

该怎么算? 

使用均值的方式去近似期望，于是

$$
\tilde{V}=\frac{1}{m} \sum_{i=1}^{m} \log D\left(x^{i}\right)+\frac{1}{m} \sum_{i=1}^{m} \log \left(1-D\left(\tilde{x}^{i}\right)\right)
$$

其中
- $x^i$来自玲爱数据集, 标签为**1**,
- $\tilde{x}^i$来自生成器数据集, 标签为**0**。


## 算法总结
始终要记得GAN我们要的是$G$, 因此第一步搭建$G$网络，第二步是准备训练数据，第三步是训练。
但是训练的过程我们需要一个判别器$D$来帮助我们分清好坏。因此我们要顺便训练一个$D$。
总结算法如下: 
::: tip GAN算法
- 初始化$D,G$的参数分别为$\theta_d, \theta_g$
- 循环训练:
    - 训练$D$, $k$次:
        - 从分布$P_{data}(x)$中随机采样$m$个 $\{x^1,x^2,...,x^m\}$
        - 从已知分布$P_{prior}(z)$中随机采样$m$个 $\{z^1,z^2,...,z^m\}$
        - 使用$\tilde{x}^i=G(z^i)$获得生成数据 $\{\tilde{x}^1, \tilde{x}^2,...,\tilde{x}^m\}$
        - 更新$D$的参数$\theta_d$来最大化
            - $\tilde{V}=\frac{1}{m} \sum_{i=1}^{m} \log D\left(x^{i}\right)+\frac{1}{m} \sum_{i=1}^{m} \log \left(1-D\left(\tilde{x}^{i}\right)\right)$
            - $\theta_{d} \leftarrow \theta_{d}+\eta \nabla \tilde{V}\left(\theta_{d}\right)$
    - 训练$G$, $1$次:
        - 重新从已知分布$P_{prior}(z)$中随机采样$m$个 $\{z^1,z^2,...,z^m\}$
        - 更新$G$的参数来最小化
            - $\tilde{V}=\frac{1}{m} \sum_{i=1}^{m} \log D\left(x^{i}\right)+\frac{1}{m} \sum_{i=1}^{m} \log \left(1-D\left(\tilde{x}^{i}\right)\right)$
            - $\theta_{g} \leftarrow \theta_{g}-\eta \nabla \tilde{V}\left(\theta_{g}\right)$

:::

GAN在训练判别器时，生成器的参数固定不变；在训练生成器时，判别器的参数固定不变。
GAN的核心思想在这篇文章中算是介绍得差不多了。
当然最初的GAN也有很多不足之处，例如很难训练，不容易收敛等问题。因此又有很多人对原始的算法进行优化，
出现了各种各样衍生的GAN,我们以后有机会在聊一聊其他的GAN。

若是这篇文章对你有一点点帮助，我就做了一件有意义重大的事。我是黄杰，我在[way2ml](https://www.way2ml.com)
分享关于Linux, Python和机器学习的故事。下次见哦！


<!-- 
$V(D,G) = E_{x \sim P_{\text {data}}}[\log D(x)]+E_{x \sim P_{G}}[\log (1-D(x))]$

$=\int_{x} P_{\text {data}}(x) \log D(x) d x+\int_{x} P_{G}(x) \log (1-D(x)) d x$

$=\int_{x} \left[P_{d a t a}(x) \log D(x)+P_{G}(x) \log (1-D(x))\right] d x$

我们的目的:给定$x$,找到一个$D$使得$V(D,G)$最大, 放在这里我们换句话说我们的目的是找到一个$D$使得
$$
P_{d a t a}(x) \log D(x)+P_{G}(x) \log (1-D(x))
$$
最大。此时的变量是D;
为了方便记，$a = P_{d a t a}(x)$, $D=D(x)$, $b=P_{G}(x)$, 那么我们的目的就变成了找到函数:

$$
f(D)=a\log(D)+b\log(1-D)
$$

取最大值的时候对应的D的值，也就是就是$D^*$。求极大值点的方法就是取一阶导数，令其为0;

$$
\frac{d f(D)}{d D}=a \times \frac{1}{D}+b \times \frac{1}{1-D} \times(-1)=0
$$

得到:

$$
D^* = \frac{a}{a+b}
$$ 

于是:

$$
D^{*}(x)=\frac{P_{d a t a}(x)}{P_{d a t a}(x)+P_{G}(x)}
$$

一阶导数为0可能为极大，也可能为极小值，但这里对应的确实是极大值，并且还是最大值。我们可以看看$f(D)$的函数图像，它是长下面这个样子的。

<p align='center'>
<img src='/images/ml/GAN/f_d.png' width='50%'>
</p>

最大值点找到了, 我们看看此时的最大值是多少。 -->


**参考**:
1. 首页图片来自JosieArt [Deep Dream Generator](https://deepdreamgenerator.com/ddream/92vgqih729l)
2. 国立台湾大李宏毅老师GAN课程 [GAN Lecture 4 (2018): Basic Theory](https://youtu.be/DMA4MrNieWo)
3. 维基百科: [Generative adversarial network](https://en.wikipedia.org/wiki/Generative_adversarial_network)
4. Medium: [Understanding Generative Adversarial Networks (GANs)](https://towardsdatascience.com/understanding-generative-adversarial-networks-gans-cd6e4651a29)
5. GAN示意图: [Generative Adversarial Network (GAN)](https://www.geeksforgeeks.org/generative-adversarial-network-gan/)
6. 维基百科：[半分、青い](https://ja.wikipedia.org/wiki/%E5%8D%8A%E5%88%86%E3%80%81%E9%9D%92%E3%81%84%E3%80%82)
7. 步骤示意图: [一个大象放进冰箱的过程](https://aminoapps.com/c/art/page/blog/yi-ge-da-xiang-fang-jin-bing-xiang-de-guo-cheng/WXhX_u7epNpZLE8n3W6B5olrzlNmzz)
8. [火熱的生成對抗網路（GAN），你究竟好在哪裡](https://www.itread01.com/content/1548965366.html)
9. Stackoverflow [image with caption - vuepress](https://stackoverflow.com/questions/52335784/image-with-caption-vuepress)
10. [html使用简单标签改变字体（加粗、斜体...）](https://blog.csdn.net/lsbd1993/article/details/26484641)

<Livere/>
