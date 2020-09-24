---
pageClass: ml-class
---
# Policy-based Approach
Learning an Actor。这种方法的核心就是Policy Gradient。
### 什么叫Actor? 
**Actor**就是一个函数,写作$Action = \pi(Observation)$。
<p align="center">
<img src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/RL_NN_structure.png' width='60%'>
</p>

- Input: Agent观测到的Observation。
- Output: Agent要采取的Action。通常假设Actor是Stochastic的,也就是说Policy的输出是一个几率。
用Gang的话来说，==Policy的输出是一个概率分布==。


::: tip 提示
1. Actor和Policy是一个东西。
2. 与Stochastic对应的是Deterministic。想想猜拳游戏, 若是使用Deterministic的策略,很容易被识破。
:::


### 如何学习一个Actor?
若是用神经网络去学习这个Actor,做的就是**Deep Reiforcement Learning**.
那么就只需要下面这三个步骤:
#### 1. 定义一系列的函数
<p align="center">
<img src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/DRL_Step1.png' width='60%'>
</p>

使用神经网络来学习我们的Actor有什么好处呢? 
- 相比传统的Lookup Table, 玩电玩就不行了，因为状态无限多, 所以就要使用神经网络。
- 神经网络可以举一反三，因为给一个输入(一个画面), 总是可以得到一个输出。神经网络有泛化的作用。即使没有看过一些画面，也有可能会有很好的结果。


#### 2. 决定函数的好坏
要决定Actor的好坏。
- 给定一个策略$\pi_\theta{(s)}$,这里的$\theta$表示的是神经网络的参数。
- 使用这个策略$\pi_\theta{(s)}$去玩游戏:
   - 开始是的观测$s_1$
   - 机器决定做出动作$a_1$
   - 机器得到奖励$r_1$
   - 机器看到$s_2$
   - 机器决定做出动作$a_2$
   - 机器得到奖励$r_2$
   - 机器看到$s_3$
   - ...
   - 机器决定做出动作$a_T$
   - 机器得到奖励$r_T$
   - 算出在这一个Episode中得到的:Total reward: $R_{\theta}=\sum_{t=1}^{T}r_t$

我们不是要学习最大化每一步中的奖励，而是要学习去最大化整个游戏玩完后得到的Total Reward。
就算是每次我们使用同样一个Actor,每一次游戏得到的$R_{\theta}$也是不一样的。因为:
- Actor若是Stochastic,即动作本来就是一种可能性。
- 游戏本身也有随机性的,采取同样的Action,每次看到的Observation也是不同的。
也就是说，$R_{\theta}$就是一个随机变量。因此==我们的目标就应该变成==:
**学习去最大化$R_{\theta}$的期望值 $\bar{R}_{\theta}$**

**这个期望值$\bar{R}_{\theta}$就表示函数的好坏。**　那应该如何去计算这个期望值呢? 
<p align='center'>
<img src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/trajectory.png' width='60%'>
</p>
为了表示得方便，我们把一个episode考虑成一个trajectory $\tau$:
- $\tau = {s_1,a_1,r_1,s_2,a_2,r_2,...,s_T,a_T,r_T}$
- $R_{\tau} = \sum_{n=1}^Nr_n$
- 如果你使用一个actor去玩游戏，每一个$\tau$的出现都会有一个概率,它的值取决于actor的参数$\theta$，记为$P(\tau|\theta)$。

::: tip 提示
$\tau$代表了一个游戏过程,具体下来的$\tau$往往有千千万万种, 选择使用某一个Actor去玩这个游戏的时候，可能只会看到其中的某一些$\tau$。有些过程比较容易出现，有些玩很多次都不会遇到(就像是很多人都发现不了游戏中的彩蛋)。因此就出现了$P(\tau|\theta)$。
:::

于是:
$$
\bar{R}_{\theta} = E_{\tau \sim p_{\theta}(\tau)}\left[R(\tau) \right] =\sum_{\tau}R(\tau)P(\tau|\theta)
$$
这里的$\tau$难以穷尽。使用$\pi_\theta$去玩$N$次游戏，于是可以得到$N$个episode,$\{\tau^{1},\tau^{2},...,\tau^{N}\}$。就好像是有$N$笔训练数据。换句话说，**玩N场游戏就好像是从$P(\tau|\theta)$中采样了N个$\tau$**。如果某一个$\tau$的几率比较大，它就特别容易在$N$次采样中被采样出来。采样出的$\tau$和几率是成正比的。因此:
$$
\bar{R}_{\theta} = \sum_{\tau}R(\tau)P(\tau|\theta) \approx \frac{1}{N}\sum_{n=1}^{N}R(\tau^{n})
$$

::: tip 有这样的近似
$$
\sum_{\tau}P(\tau|\theta) \approx \frac{1}{N}\sum_{n=1}^{N}
$$
:::

#### 3. 挑选最好的函数
选出最好的Actor,采用的方法就是**Gradient Ascent**.

这里的问题变成了: 当 $\theta$ 取什么的时候，可以让 $\bar{R}_{\theta}$取得最大值。目的是最后得到这个$\theta$。
在原来的时候就是去偏导为0的地方即可求得对应的$\theta$, 但是实际当中我们使用Gradient Ascent的方法来最终得到这个$\theta$.

::: warning 问题
为什么不直接对$\bar{R}_{\theta}$求$\theta$的偏导，然后取偏导值为0,从而得到$\theta$, 而要这么费劲地去训练，迭代去得到$\theta$?
:::

- 数学语言来描述:
   - $\theta^{*} = arg  \max \limits_{\theta}\bar{R}_\theta$
   - $\bar{R}_{\theta} = \sum_{\tau}R(\tau)P(\tau|\theta)$
- Gradient Ascent算法:
   - $\theta^{0}$开始
   - $\theta^{1} \leftarrow \theta^{0} + \eta \nabla  \bar{R}_{\theta^0}$
   - $\theta^{2} \leftarrow \theta^{1} + \eta \nabla  \bar{R}_{\theta^1}$
   - ...

由于:
$$
\bar{R}_{\theta} = \sum_{\tau}R(\tau)P(\tau|\theta)
$$
这里面$R_{\tau}$和$\theta$是没有关系的，因此:
$$
\nabla \overline{R}_{\theta}=\sum_{\tau} R(\tau) \nabla P(\tau | \theta) = \sum_{\tau} R(\tau) P(\tau | \theta) \frac{\nabla P(\tau | \theta)}{P(\tau | \theta)}
$$

$R_{\tau}$不做微分，可以是一个黑盒。其实大多数情况也确实是一个黑盒子，我们基本不可能完全去理解环境。$R_{\tau}$是环境给我们的。

$$
=\sum_{\tau} R(\tau) P(\tau | \theta) \nabla \log P(\tau | \theta) = E_{\tau \sim p(\tau|\theta)}\left[R(\tau) \nabla \log p(\tau|\theta)\right]
$$

::: warning 疑问
为什么要化成log的形式呢?
:::

接下来再次使用近似：
$$
\approx \frac{1}{N} \sum_{n=1}^{N} R\left(\tau^{n}\right) \nabla \log P\left(\tau^{n} | \theta\right)
$$

使用$\pi_\theta$去玩$N$次游戏，于是可以得到$N$个episode,$\{\tau^{1},\tau^{2},...,\tau^{N}\}$

接下来讨论后面那一项: $\nabla \log P\left(\tau^{n} | \theta\right)$应该怎么求:
$$
\tau=\left\{s_{1}, a_{1}, r_{1}, s_{2}, a_{2}, r_{2}, \cdots, s_{T}, a_{T}, r_{T}\right\}
$$

$$
P(\tau | \theta)= p\left(s_{1}\right) p\left(a_{1} | s_{1}, \theta\right) p\left(r_{1}, s_{2} | s_{1}, a_{1}\right) p\left(a_{2} | s_{2}, \theta\right) p\left(r_{2}, s_{3} | s_{2}, a_{2}\right) \cdots
$$

$$
=p\left(s_{1}\right) \prod_{t=1}^{T} p\left(a_{t} | s_{t}, \theta\right) p\left(r_{t}, s_{t+1} | s_{t}, a_{t}\right)
$$
:::tip 注意
上面的式子也可以写成下面的样子
$$
P_{\theta}(\tau)=p\left(s_{1}\right) \prod_{t=1}^{T} p_{\theta}\left(a_{t} | s_{t}\right) p\left(s_{t+1} | s_{t}, a_{t}\right)
$$
:::

::: tip 提示
这里面只有$p\left(a_{t} | s_{t}, \theta\right)$是受你的actor $\pi_{\theta}$控制的。
:::
接下来，对$P(\tau | \theta)$取对数:
$$
\log P(\tau | \theta) = \log p\left(s_{1}\right)+\sum_{t=1}^{T} \log p\left(a_{t} | s_{t}, \theta\right)+\log p\left(r_{t}, s_{t+1} | s_{t}, a_{t}\right)
$$

接下来,对上式做梯度,忽略掉和$\theta$无关的项,得到:
$$
\nabla \log P(\tau | \theta)=\sum_{t=1}^{T} \nabla \log p\left(a_{t} | s_{t}, \theta\right)
$$

总结一下就是下面这样:
$$
\theta^{n e w} \leftarrow \theta^{o l d}+\eta \nabla \overline{R}_{\theta^{o l d}}
$$

$$
\nabla \overline{R}_{\theta} \approx \frac{1}{N} \sum_{n=1}^{N} R\left(\tau^{n}\right) \nabla \log P\left(\tau^{n} | \theta\right)=\frac{1}{N} \sum_{n=1}^{N} R\left(\tau^{n}\right) \sum_{t=1}^{T_{n}} \nabla \log p\left(a_{t}^{n} | s_{t}^{n}, \theta\right)
$$

$$
= \frac{1}{N} \sum_{n=1}^{N} \sum_{t=1}^{T_{n}} R\left(\tau^{n}\right) \nabla \log p\left(a_{t}^{n} | s_{t}^{n}, \theta\right)
$$

这个式子很直观:
如果在$\tau^{n}$中，当机器看到$s_t^n$采取了动作$a_t^n$后得到的
- $R(\tau^n)$为正, 那么我们就调整$\theta$来增大$p(a_t^n|s_t^n)$
- $R(\tau^n)$为负, 那么我们就调整$\theta$来减小$p(a_t^n|s_t^n)$

::: warning 注意
这里的reward是整个trajectory $\tau^n$ 的累计的reward $R(\tau^n)$, 而不是及时奖励$r_t^n$
:::

**多久更新一下网络的参数呢?**

**Step 1**: 收集数据
给定一个策略$\pi_{\theta}$, 让Agent去玩N次游戏，收集下面一组数据:
<p align='center'>
<img src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/when_to_update.png' width='60%'>
</p>

**Step 2**: 更新网络参数
这里的N组数据就相当于是一组Mini-Batch, 因此是N次游戏之后，利用:
$$
\nabla \overline{R}_{\theta}= \frac{1}{N} \sum_{n=1}^{N} \sum_{t=1}^{T_{n}} R\left(\tau^{n}\right) \nabla \log p_{\theta}\left(a_{t}^{n} | s_{t}^{n}\right) 
$$
更新一次网络参数。

然后就不断的重复{Step1,Step2}。

再一次需要注意的是，这里的是$R(\tau)$(红色部分), 即每一个回合对应的Total Reward。


**接下来解释为什么要取对数**:

$$
 \nabla \log p(a_t^n|s_t^n,\theta) = \frac{\nabla p\left(a_{t}^{n} | s_{t}^{n}, \theta\right)}{p\left(a_{t}^{n} | s_{t}^{n}, \theta\right)}
$$

那这个问题就变成了"为什么要除一个$p\left(a_{t}^{n} | s_{t}^{n}, \theta\right)$?"

例如: 现在让Agent去玩N次游戏，在采样数据中，状态$s$在$\tau^{13},\tau^{15},\tau^{17},\tau^{33}$这几个episode中都有被观测到，采取动作和得到奖励的状况如下表:

| 在$\tau^{13}$, 采取action $a$ | $R(\tau^{13}) =2$ |
| ----------------------------- | ----------------- |
| 在$\tau^{15}$, 采取action $b$ | $R(\tau^{15}) =1$ |
| 在$\tau^{17}$, 采取action $b$ | $R(\tau^{17}) =1$ |
| 在$\tau^{33}$, 采取action $b$ | $R(\tau^{33}) =1$ |

由于Agent采取的是Stochastic的方法，因此对于同样的Observation可能采取不同的动作。如果只有分子，那么做更新的时候会偏好出现次数比较多的Action，即使这些Action其实并没有真的比较好，因为是对所有的Sample求和得到的。即它去把出现动作$b$的几率调高，也可以使得$\nabla \overline{R}_{\theta}$ 变大。反过来看，由于$a$很罕见，即使它的效果很好，就算我去调高$a$的几率，对$\nabla \overline{R}_{\theta}$的影响也不大。

因此除以$p\left(a_{t}^{n} | s_{t}^{n}, \theta\right)$的目的就是做一个归一化,让出现次数少的Action也认为同样重要。
依次取对数的作用就是归一化，对每个动作同等看待。


这里还有一个问题，很有可能$R(\tau^n)$总是正的，你要知道所有的动作其实就是采样得到，那么没有得到采样得到的那个Action对应的概率便会减小。而这其实是不对的。解决这个问题的办法就是添加一个Base Line: b , 通常$b$需要自己设计，其中一种最简单的设计方法是$b \approx E[R(\tau)]$,写成:

$$
\nabla \overline{R}_{\theta} \approx \frac{1}{N} \sum_{n=1}^{N} \sum_{t=1}^{T_{n}} \left[R\left(\tau^{n}\right)-b\right] \nabla \log p\left(a_{t}^{n} | s_{t}^{n}, \theta\right)
$$

::: tip 提示
$$
\theta=\left\{w_{1}, w_{2}, \cdots, b_{1}, \cdots\right\}$$

$$
\nabla \overline{R}_{\theta}=\left[\begin{array}{c}{\partial \overline{R}_{\theta} / \partial w_{1}} \\ {\partial \overline{R}_{\theta} / \partial w_{2}} \\ {\vdots} \\ {\partial \overline{R}_{\theta} / \partial b_{1}} \\ {\vdots}\end{array}\right]
$$
:::

::: tip 提示
$$
\frac{d\ log(f(x))}{d x}=\frac{1}{f(x)} \frac{d f(x)}{d x}
$$

$$
\nabla f(x)= f(x) \nabla \log f(x)
$$
:::

更进一步，考虑下面的情况:

<p align='center'>
<img src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/assign_suitable_credit0.png' width='60%'>
</p>

在第一个回合里面，其实做得比较好的是$(s_a,a_1)$,而后面的$(s_b,a_2)$和$(s_c,a_3)$做得不够好。如果按照前面提到的算梯度的方法，都会乘以同样的权值$R(\tau)$,在玩的次数不够多的情况下,这其实是不够好的。我们注意到，其实一个动作的好坏应该是和前面发生的事情是没有关系的，而和后面发生的事情相关，于是将计算梯度时的权值变成下面的样子:

<p align='center'>
<img src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/assign_suitable_credit1.png' width='60%'>
</p>

又考虑到，一个动作影响后面的结果不会太久，于是我们对权值再次进行改良:
$$
R(\tau^n) \rightarrow \sum_{t^{\prime}=t}^{T_{n}} r_{t^{\prime}}^{n} \rightarrow \sum_{t^{\prime}=t}^{T_{n}} \gamma^{t^{\prime}-t} r_{t^{\prime}}^{n}
$$

这里的$\gamma < 1$，　叫做**Discounted Factor**.

再进一步, 将$R(\tau^n) - b$叫做**Advatage Function**,记为$A^{\theta}(s_t,a_t)$
Advatage Function的意义就是,在$s_t$下采取$a_t$这个动作，==相比与其他的动作，有多好。==

::: warning 注意
其实这里的Advatage Function其实就是用来做梯度时的权值，是需要认为设计的，怎么设计呢? 其实是一个问题。可以利用一个神经网络去设计。也就是可以利用*Critic*去设计，后面会提到。
:::



<Livere/>