---
pageClass: ml-class
---
# GAN 生成对抗神经网络 
Generative Adversarial Network (GAN)

## GAN的目的是什么? 
我们拿生成图片来说清楚GAN背后是在做什么。

想象我们有很多玲爱画的卡通头像。我们将每一张图看做是高维空间中的一个点$x$, 由于所有的这些卡通头像都是玲爱画的,因此所有的这些点一定
是服从玲爱风格的某个分布的，我们把这个分布叫做$P_{data}(x)$; 也就是说，只要从这个分布里面随便采样一个点$x$, 那么这个点$x$对应的
卡通头像都应该和我们现有的玲爱卡通头像数据库里面的卡通头像是几乎一样的。

::: tip 我们的最终目的
我们想要机器学会自己==生成玲爱风格==的卡通头像。我们要的是一个生成器。
:::
因此我们想要==找到一个Generator,它所产生的样本$x$产生的分布$P_{G}(x)$和玲爱风格的分布$P_{data}(x)$越接近越好==; 意思都明白，但应该如何转化，变得可操作呢?


## GAN大概的思路
我们就这样去做:

准备,搭建一个神经网络,所有参数用$\theta$表示，目的是用来生成图片$x$, 而这些样本$x$都服从$P_{G}(x; \theta)$这个分布。

Step1, 我们在现有的头像数据库中抽出$n$张头像, 也就是对应高维空间中$n$个点$\{x_1,x_2,...,x_n \}$; 
现在我们在$P_{data}(x)$这个分布里面采样得到了$\{x_1,x_2,...,x_n\}$, 也就是可以解释为$P_{data}(x_1),P_{data}(x_2),...,P_{data}(x_n)$的概率很高。 ==我们从结果倒过去看，既然$x_1$被抽到了,那么一定是$P_{data}(x_1)$的概率高才会被抽到。== 因为我们的目标是$P_{G}(x)$和$P_{data}(x)$越接近越好。
因此我们想要$P_{G}(x_1; \theta),P_{G}(x_2; \theta),...,P_{G}(x_n; \theta)$中的每一个概率都很高, 换句话说就是想要
$\prod_{k=1}^n P_{G}(x_k; \theta)$ 的值越大越好。

Step2,找到$\theta^* = \arg \max_{\theta} \prod_{k=1}^n P_{G}(x_k; \theta)$ 

::: tip Maximize Likelihood vs Minimize KL Divergence
$\prod_{k=1}^n P_{G}(x_k; \theta)$ 看做是生成的样本的Likelihood, 接下来要说的一件事是Maximize这个Likelihood和Minimize某个Divergence是一样的。

$\theta^* = \arg \max_{\theta} \prod_{k=1}^n P_{G}(x_k; \theta) = \arg \max_{\theta} \log \prod_{k=1}^n  P_{G}(x_k; \theta)$

$= \arg \max_{\theta} \sum_{k=1}^n \log P_{G}(x_k; \theta)$, 由于$\{x_1,x_2,...,x_n\}$都来自于$P_{data}(x)$
这个分布, 因此:

$\approx \arg \max_{\theta} \mathbb{E}_{x \sim P_{data}(x)}[\log P_{G}(x; \theta)]$ 

$= \arg \max_{\theta} [\int_x P_{data}(x)\log P_{G}(x;\theta)dx]$ 下一步减一个常数，对找$\theta ^*$没有影响。

$= \arg \max_{\theta} [\int_x P_{data}(x)\log P_{G}(x;\theta)dx -  \int_x P_{data}(x)\log P_{data}(x)dx]$

$= \arg \max_{\theta} [\int_x P_{data}(x)\log \frac{P_{G}(x;\theta)}{P_{data}(x)}dx]$

$= \arg \max_{\theta} [- KL(P_{data}||P_{G})]$

$= \arg \min_{\theta} [KL(P_{data}||P_{G})]$


总结一下就是:

==Maximize Likelihood和Minimize KL Divergence基本上是一个意思。==

:::

## GAN具体是怎么做的? 
### 为Generator搭建一个神经网络
从上一个小结的准备工作中我们搭建了一个神经网络, 这个神经网络就是我们最后想要学习的Generator, 待它学习好了，我们就可以利用它
来生成漫画家玲爱风格的卡通头像了。

这个神经网络具体应该是什么样子的呢? 输入是什么? 输出是什么呢? 我们看下面这张图: 

<p align='center'>
<img src='/images/ml/GAN/generator.png' width='50%'>
</p>

上面这张图中Generator的输入是128维的一个向量, 这些输入的值可以控制输出头像的一些特征，例如头发的颜色，头发的长短, 肤色，性别等等。
[这里](https://make.girls.moe/#/)有一个在线的卡通头像生成项目，去玩一下就很容易理解这里神经网络G的输入是什么了。输出当然最后
得构成一张图片，例如这里的64*64个像素点最后就可以拼成一张Greyscale的图片。

::: tip Tip
这里的输入可以看做是128维空间中的一个点;输出是4096维空间中的一个点; 输入数据我们从一个固定的分布中去采样(例如:128维的高斯分布);
我们期望神经网络(G)的输出数据(图片)的分布$P_{G}(x)$能够和$P_{data}(x)$的分布越接近越好。
:::

### 确认我们的最终目的
这样我们的最终目的换个说法就是:

::: tip 最终目的
$$
G^* = \arg \min_{G} Div(P_{G}, P_{data})
$$
就是说我们想要找到一个最好的Generator $G^*$, 它能够使得$P_{G}$和$P_{data}$的某种Divergence越小越好。
:::

接下来。我们从我么的目的出发，一步一步走下去。 自然地，你就会问$Div(P_{G}, P_{data})$我们怎么算哇? 

### 如何计算$Div(P_{G}, P_{data})$? 
任何一种Divergence都是有公式的，原则上直接带入公式就可以算出来了。但是这里的问题是我们不知道$P_{G}, P_{data}$的表达式是什么。

尽管我们有玲爱画的漫画头像库，但是我们也不知道她画的头像服从什么分布啊? ($P_{data}$不知道)<br/>
尽管我们有Generator可以生成很多的头像,但是我们也不知道这些生成的头像服从什么分布啊? ($P_{G}$不知道)

那应该如何计算两个分布的Divergence呢? 我们的手上只有两个分布的样本? 可以直接比较样本吗? 

可以直接比较样本吗? 可以直接比较样本吗? 可以直接比较样本吗? 脑海中不断回荡着这句话。

想象我们人去看玲爱画的头像和机器画的头像，在训练机器的时候我们总是那个最残酷的人，怎么残酷了呢? 
只要是机器画的，我们就说画得差;只要是玲爱画的，我们就说画得真好。我们永远说机器的差，玲爱的好，机器没有办法，为了
得到我们的奖励它就会像玲爱学习。这样的结果是机器真的可以变得和玲爱一样优秀。

::: tip 最终的目的, 我们期待的机器(Generator)
机器真的可以变得和玲爱一样优秀的这个时候，也就是$P_{data}(x)$和$P_{G}(x)$很接近的时候, 也就是$Div(P_{G},P_{data})$很小的时候， 这不就是我们想要达到的那个时候吗。
:::

在训练机器(Generator)的过程中, 有一个关键的角色:我们-优秀的人类; 我们是不可能跑到算法里面去的，因此我们需要另外一个角色来代替
我们。 让我们使用神经网络吧! 这个神经网络(Discriminator)只做一件事情: 给机器画的画低分，给玲爱画的画高分。这个另一个自己不是天生聪明的，每当机器(Generator)升级之后, 另一个自己(Discriminator)也需要再学习新的知识才能够很好地判断是谁画的。好在有很好的资料(训练数据,来自两个分布的样本)可以让它学习(更新网络参数参数)。


不能够直接算$Div(P_{G}, P_{data})$, 我们只能间接地训练一个Discriminator来判断说一张图片有多像玲爱画的,很像网络输出的值就
接近1, 不像就接近零。这里的像和不像就反映了$Div(P_{G}, P_{data})$。 

==因此, 要算$Div(P_{G}, P_{data})$我们就需要训练一个Discriminator来判断Generator生成的Sample到底有多像玲爱的画。
Discriminator的输出就反映了$Div(P_{G}, P_{data})$。==

我们的最终目标就变成

::: tip 最终目标
$$
G^* = \arg \min_{G} \max_{D} V(G,D)
$$
:::

### 如何训练Discriminator? 
要反映$Div(P_{G}, P_{data})$, 我们就要有一个训练好的Discriminator的输出。要得到这个输出必须要把这个Discriminator训练好。
Discriminator是一个网络，那它又长什么样呢? 它的输入和输出是什么呢? 

<p align='center'>
<img src='/images/ml/GAN/discriminator.png' width='50%'>
</p>

训练好的Discriminator的输入是Generator生成的图，输出是一个Scalar,反映的是这张图有多像玲爱画的图。

但是我们如何得到这个很好的Discriminator呢? 训练它。 数据从哪里来呢? 采样得到。训练这个Discriminator其实就是训练一个
二分类器，判断说是还是不是玲爱画的画。

玲爱的图的样本，从$P_{data}(x)$中采样得到，直白点就是从玲爱数据库中拿出$n$张照片, 每张照片都对应了一个标签'1';<br/>
机器的图的样本, 从$P_{G}(x)$中采样得到, 直白点说就是让Generator生成$n$张照片, 每张照片对应一个标签'0';

用这些样本(训练数据),就可以去训练我们的Discriminator了, 这就是最基本监督学习。

你当然会问，既然是监督学习，那你优化的目标是什么? 有目标才有动力，因此很重要。

$$
D^* = \arg \max_{D}V(D,G) = \arg \max_{D} (\mathbb{E}_{x \sim P_{data}}[\log D(x)] + \mathbb{E}_{x \sim P_{G}}[\log (1-D(x))])
$$

也就是说我们通过调整参数，找到一个最好的Discriminator $D^*$ 它可以使得$V(D,G)$的值最大; 要使得$V(D,G)$更大，也就是说想要
Discriminator学会给玲爱数据库的的所有图片高分$D(x)$的值趋近于1，给Generator生成的所有图片低分$D(x)$的值趋近于0。

即利用从两个分布的采样数据，使用监督学习的方法就可以训练Discriminator了。话是这样说，很简单，但是新的问题又出现了。

$$V(D,G) = \mathbb{E}_{x \sim P_{data}}[\log D(x)] + \mathbb{E}_{x \sim P_{G}}[\log (1-D(x))]$$

该怎么算啊? 

### 如何计算V(D,G)？
$V(D,G) = \mathbb{E}_{x \sim P_{\text {data}}}[\log D(x)]+\mathbb{E}_{x \sim P_{G}}[\log (1-D(x))]$中的期望我们用采样的均值代替。

- 从$P_{data}(x)$中采样得到样本 $\left\{x^{1}, x^{2}, \ldots, x^{m}\right\}$, 正样本, 标签是$1$
- 从$P_G(x)$中采样得到样本 $\left\{\tilde{x}^{1}, \tilde{x}^{2}, \ldots, \tilde{x}^{m}\right\}$, 负样本, 标签是$0$

$V(D,G)$就变成了:

$$
\tilde{V}=\frac{1}{m} \sum_{i=1}^{m} \log D\left(x^{i}\right)+\frac{1}{m} \sum_{i=1}^{m} \log \left(1-D\left(\tilde{x}^{i}\right)\right)
$$

到这里我们这条路走到底了，我们要回去做该做的事了。

### GAN总的算法

<p align='center'>
<img src='/images/ml/GAN/gan_alg.png' width='50%'>
</p>


<!-- 无他,这一部分就是公式的推导了。

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

[台大李宏毅老师GAN课程:GAN Lecture 4 (2018): Basic Theory](https://youtu.be/DMA4MrNieWo)


<Livere/>