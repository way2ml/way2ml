---
pageClass: ml-class
---
# 强化学习理论
## 什么是强化学习?
什么是强化学习? 这恐怕是学习强化学习的人都会问到的问题。我曾经看到过一个视频，里面有一个四肢完整的机器人。最开始的时候只会在地上乱动，过了一段时间，它学会了爬；再过来一会，它学会了走；再过一会儿走得越来越好了。最开始看到这个感觉就是:"哇，好厉害。我也想学这个。"然后知道这个东西是机器学习。都是过了好久才知道原来是强化学习实现了这个过程。强化学习是一种通过探索，试错从而找到一套很不错的的处理问题方法的过程。强化学习有下面的特征:
- 面向智能体的学习———通过和环境交互来达到目标 
- 通过试错来学习, 通常仅有不及时的奖励

## 强化学习的基本模型
<p align="center">
<img src='/images/ml/RL/RL.png' width='60%'>
</p>
在只有少数动作会得到奖励的情况下,找到正确的动作是学习的难点。

## 强化学习和监督学习
- 监督学习: 将我们会的东西交给机器。Learn from teacher.
- 强化学习: 通常解决人都不知道答案的情况，需要用机器找到正确的答案。Learn from experience.

## 强化学习的应用
- Alpha Go
- 聊天机器人
- 美团猜你喜欢
- 飞直升飞机
- 自动驾驶
- 节约电
- 句子生成
- 打游戏: Gym;Universe

## 强化学习里涉及到的概念
   > 大写字母通常表示的是一个集合，小写字母表示集合里面一个具体的元素。例如:$A$表示所有action构成的集合，而$a$表示其中的一个action。
要理解强化学习，必须清楚下面的概念:
- **状态转移概率 State Transation Probability**: 对一个马尔科夫状态$s$,和它的后继状态$s'$。状态转移概率就被定义成下面这个样子:
$$
\mathcal{P}_{ss'} \doteq \mathbb{P}[S_{t+1}=s'| S_{t} = s]
$$
- **状态转移矩阵 State Transation Matrix $\mathcal{P}$**: 状态转移矩阵定义了所有的状态到他们的后继状态的转移概率，也就是把状态转移概率排成一个矩阵而已。
$$
\mathcal{P} = \left[ 
\begin{matrix}
   \mathcal{P}_{11} & \cdots & \mathcal{P}_{1n} \\
   \vdots &  & \vdots \\
   \mathcal{P}_{n1}  & \cdots & \mathcal{P}_{nn} 
\end{matrix}\right]
$$
&emsp;&nbsp;这里面每一行的和都等于$1$
- **马尔可夫性 Markov Property**: 仅当一个状态$S_t$满足下面的关系时，我们说这个状态是Markov的。
$$
\mathbb{P}[S_{t+1}|S_{t}] = \mathbb{P}[S_{t+1}|S_1,S_2,\cdots,S_{t}]
$$
&emsp;现在的状态知道，你如何到达这个状态的过程统统可以抛开不看。
- **智能体 Agent**:一个**agent**可以学东西，做决定。例如一个有强化学习算法的四旋翼飞行器。
- **动作集 Action($A$)**: $A$ 是这个agent可以做的所有的动作的集合。agent每次动作就是在这个集合里面选一个。例如在超级马里奥中，$A={向右跑，向左跑，跳上，跳下，蹲下，站着不动，...}$。在股市当中，$A={买入，卖出，保持}$

- **环境 Environment**: 和智能体交互的东西叫做环境。Agent的action作用于它之后，agent可以得到一个新的reward,和一个新的observation。

- **状态 State($S$)**: 一个state是agent观测到的一个具体的，瞬时的状态。因此有时State又被叫做**observation**。状态State是智能体接受到的对于环境Environment的一种表达。==状态是智能体接受到的环境的状态。== 很有可能agent看不到环境的整个状态，因此就有了Partial observation State. 在游戏中,游戏结束时的状态叫做**Terminal State**

- **奖励 Reward(R)**:**reward**是环境(Enviroment)对一个agent做出一系列动作的好坏的评估。在Dota游戏中你杀死一个怪物后得到的金币就可以看成是奖励。对任意给的一个状态s，agent通过做出一系列的动作作用于环境Environment，使其达到新的状态s', 同时给出这一系列动作的奖励。奖励有效地评估了智能体agnet的的动作。奖励可以是及时的也可以是延时的(immediate or delayed reward)。==奖励是智能体做了一系列动作后环境给它打的一个分。==

- **Episode**: 游戏从开始到结束是一个Episode.

- **折扣因子 Discount factor**: **Discount factor**是用来削弱未来奖励对agent做出action的影响的。设计Discount factor的目的是让未来奖励的分量比及时奖励的分量更少。Discount factor通常用小写希腊字母$\gamma$表示。$\gamma$的范围是$[0,1]$。 比如，当$\gamma=0.8$的时候，三步之后你可以得到$10$分的奖励，那么三步之后这$10$分让你现在就得到${0.8}^3*10$分的奖励。$\gamma$越接近$1$，关注得越长远。$\gamma==1$只关心及时奖励。

- **折扣回报 Discounted Return**: 折扣奖励的总和
$$G_t  \doteq R_{t+1} + \gamma R_{t+2} + {\gamma}^2R_{t+1} +\cdots = \sum_{k=0}^{\infty} {\gamma}^kR_{t+k+1} \quad (3.8)$$
$$
G_t  = R_{t+1} + \gamma (R_{t+2} + {\gamma}R_{t+1} +\cdots) = R_{t+1} + \gamma G_{t+1} \quad(3.9)$$
- **策略 Policy($\pi$)**: 当你(agent)基于当前状态，决定你要做的下一个动作。如何做这样的决定就是策略。策略$\pi$就是状态集$\mathcal{S}$到动作集$\mathcal{A}$的映射。而选择特定动作的原则是为了最大化奖励Reward。如果一个智能体在时刻t遵循策略$\pi$,那么$\pi(a|s)$代表的意思就是如果$S_t=s$,$A_t=a$的概率。$\pi(a|s)$中间的$|$仅仅是提示你策略定义了一个$a\in \mathcal{A}(s)$, $s\in \mathcal{S}$的概率分布。策略以一个状态和一个动作作为输入，然后输出智能体在那个状态下采取那个动作的的概率。因此给定一个状态$s$, 那么下面这个式子总是成立的。注:$\pi(a|s)$ 也被写作$\pi(a,s)$
$$\sum_a\pi(a|s) = 1$$
- **值函数 Value(V)**: 和短期的奖励不同，value代表的是长期带折扣的回报(Return)的期望。可以说我们应该更多的关注值函数V,更应该关注统计量。$v_{\pi}(s)$代表的是状态s在策略$\pi$下期望得到的长期回报是多少。长期究竟有多长，你(agent)究竟关注多远是由折扣因子$\gamma$决定的。==值函数是从此刻到未来回报的期望。== 它具有统计特性，它将所有的随机因素都考虑进去了。值函数，值函数指的是某一个状态的值函数。
$$v_{\pi}(s) = \mathbb{E_{\pi}}\left[ G_t | S_t = s \right] = \mathbb{E_{\pi}}\left[ \sum_{k=0}^{\infty} {\gamma}^kR_{t+k+1} | S_t = s \right], for\; all\; s \; in\; \mathcal{S} \quad(3.12)$$
&emsp;&nbsp;即使是环境一样，值函数也可能会不一样。这样说的原因是值函数还取决于采取的策略。状态的值函数还取决于智能体如何做动作。
- **动作值函数 Q-value or action-value(Q)**: 动作值函数和值函数类似，只是多了一个变量a。$Q_{\pi}(s,a)$指的是，在策略$\pi$下采取动作$a$后，当前状态s期望得到的长期回报。==动作函数是做某个动作后对未来回报的期望== 动作函数Q是 状态-动作对集 到 奖励Reward集的映射。
$$q_{\pi}(s,a) = \mathbb{E}_{\pi}\left[G_t|S_t=s,A_t=a \right] = \mathbb{E}_{\pi}\left[ \sum_{k=0}^{\infty} {\gamma}^kR_{t+k+1} | S_t=s,A_t=a \right]\quad(3.13)$$

- **轨迹 Trajectory**: 一系列的状态，动作，奖励。

- **贝尔曼等式 Bellman equation**:针对值函数$v_{\pi}(s)$的递推表达式，叫做值函数$v_{\pi}$的Bellman等式。为了说清楚，我们先定义下面两个式子:
$$
\mathcal{P}_{s s^{\prime}}^{a}=Pr\left(S_{t+1}=s^{\prime} | S_{t}=s, a_{t}=a\right)
$$

$$
\mathcal{R}_{s s^{\prime}}^{a}=\mathbb{E}\left[r_{t+1} | S_{t}=s, S_{t+1}=s^{\prime}, a_{t}=a\right]
$$
&emsp;&nbsp;根据值函数的定义:
$$
v_{\pi}(s) = \mathbb{E_{\pi}}\left[ G_t | S_t = s \right] = \mathbb{E_{\pi}}\left[ \sum_{k=0}^{\infty} {\gamma}^kR_{t+k+1} | S_t = s \right]
$$
&emsp;&nbsp;我们将即使奖励单独提出来，得到:
$$
v_{\pi}(s) = \mathbb{E}_{\pi}\left[r_{t+1}+\gamma \sum_{k=0}^{\infty} \gamma^{k} r_{t+k+2} | S_{t}=s\right]
$$
&emsp;&nbsp;分别算这两项得到下面两个式子:
$$
\mathbb{E}_{\pi}\left[r_{t+1} | S_{t}=s\right]=\sum_{a} \pi(s, a) \sum_{s^{\prime}} \mathcal{P}_{s s^{\prime}}^{a} \mathcal{R}_{s s^{\prime}}^{a}
$$

$$
\mathbb{E}_{\pi}\left[\gamma \sum_{k=0}^{\infty} \gamma^{k} r_{t+k+2} | S_{t}=s\right]=\sum_{a} \pi(s, a) \sum_{s^{\prime}} \mathcal{P}_{s s^{\prime}}^{a} \gamma \mathbb{E}_{\pi}\left[\sum_{k=0}^{\infty} \gamma^{k} r_{t+k+2} | S_{t+1}=s^{\prime}\right]
$$

&emsp;&nbsp;于是得到值函数的Bellman等式:
$$
v_{\pi}(s)=\sum_{a} \pi(s, a) \sum_{s^{\prime}} \mathcal{P}_{s s^{\prime}}^{a}\left[\mathcal{R}_{s s^{\prime}}^{a}+\gamma \mathbb{E}_{\pi}\left[\sum_{k=0}^{\infty} \gamma^{k} r_{t+k+2} | S_{t+1}=s^{\prime}\right]\right]
$$

$$
v_{\pi}(s)=\sum_{a} \pi(s, a) \sum_{s^{\prime}} \mathcal{P}_{s s^{\prime}}^{a}\left[\mathcal{R}_{s s^{\prime}}^{a}+\gamma v_{\pi}\left(s^{\prime}\right)\right]
$$
&emsp;&nbsp;同理,动作值函数的Bellman等式也可以得到:
$$
Q_{\pi}(s, a)=\sum_{s^{\prime}} \mathcal{P}_{s s^{\prime}}^{a}\left[\mathcal{R}_{s s^{\prime}}^{a}+\gamma \sum_{a^{\prime}} \pi\left(s^{\prime}, a^{\prime}\right) Q_{\pi}\left(s^{\prime}, a^{\prime}\right)\right]
$$
&emsp;&nbsp;Bellman等式说的是一个状态的值函数可以表达成其他很多状态的值函数。也就是说如果我们知道了$S_{t+1}$的值函数，那么我们就可以很容易地求得$S_t$的值函数。

## 强化学习的目标
强化学习究竟是学习什么? 这肯定也是你的问题。强化学习的目的是为了找到一套较好的策略。即让智能体学会做一系列的动作使得期望回报最大。例如在游戏中强化学习的目标就是**Learn to maximize the expected cumulative reward per episode**,即学习一套动作使得每一个episode中的累计奖励的期望最大。例如在Space Invaders游戏中就是学习在游戏结束之前尽可能多的杀死外星人，同时学会避让子弹，让自己活的更久。这里又涉及到一个问题什么样子的策略算是好的策略呢? 没有办法，我们不得不给出一个好策略的定义。给出下面一个定义:
- 说有一个策略$\pi$比另外一个策略$\pi'$好或者一样， 要求在$\pi$策略下每一个状态$s$期望的回报(return)都比$\pi'$策略下的回报大或者一样。因为状态期望的回报$\mathbb{E}_{\pi}[G_t|S_t=s]$就是值函数$v_{\pi}(s)$的定义。因此换句话说，仅当$v_{\pi}(s) \geq v_{\pi'}(s)$对所有的$s\in \mathcal{S}$都成立时，我们就说$\pi \geq \pi'$。

我们总是可以找到至少一个策略$\pi$比其他策略好或者与之相等。那么这里的这个策略$\pi$就叫做**最优策略(optimal policy)**。虽然可能有多个最优策略，把它们表示成$\pi_{*}$。最优策略可能有多个，但是最优策略们却都对应相同的值函数，我们把这个值函数叫做**最优状态值函数 optimal state-value function**, 把它表示成$v_{*}$。对所有的$s \in \mathcal{S}$都有:
$$
v_{*}(s) \doteq \max \limits_{\pi}\{v_{\pi}(s)\}
$$

最优策略们同时也对应了相同的**最优动作值函数 optimal action-value**, 把它表示成$q_{*}$。对应所有的$s,a \in \mathcal{S},\mathcal{A}$都有:
$$
q_{*}(s,a) \doteq \max \limits_{\pi} \{q_{\pi}(s,a)\}
$$

==强化学习的目标就是找到策略$\pi_{*}$，使得它可以使得我们的长期回报最大化。==

## 强化学习的困难之处
- Reward delay
   - 游戏中只有开火才会得到奖励; 但是左右移动对得到奖励也是有影响的。要求智能体要有远见。
- Agent的行为会影响环境，会影响它看到的东西
   - 要求Agent要学会合适的探索(Exploration): 要求它去尝试没有做过的行为。

## 强化学习的分类
<p align="center">
<img src='/images/ml/RL/RL_Classification.png' width='60%'>
</p>

- Policy-based(新)
- Value-based(旧)
- A3C: Asychronnous Advantage Actor-Critic


## 如何实现强化学习?
强化学习就是找最优策略们$\pi_{*}$, 这些最优策略对应了唯一的最优状态值函数和最优动作值函数。于是我们要求解状态值函数和动作值函数。而这两个值函数对应了两个可以迭代的贝尔曼等式，于是我们可以通过迭代的方式求解到所有的状态值函数和动作值函数。迭代的方法有下面这些:
- 动态规划 Dynamic programming 
- 蒙特卡罗评估 Monte-Carlo evaluation
- 时序差分学习 Temporal-Difference learning

所以我们要开始新的征程了。

## Policy-based Approach
Learning an Actor.
### 什么叫Actor? 
**Actor**就是一个函数,写作$Action = \pi(Observation)$。
<p align="center">
<img src='/images/ml/RL/RL_NN_structure.png' width='60%'>
</p>

- Input: Agent观测到的Observation。
- Output: Agent要采取的Action。通常假设Actor是Stochastic的,也就是说Policy的输出是一个几率。


::: tip 提示
1. Actor和Policy是一个东西。
2. 与Stochastic对应的是Deterministic。想想猜拳游戏, 若是使用Deterministic的策略,很容易被识破。
:::


### 如何学习一个Actor?
若是用神经网络去学习这个Actor,做的就是**Deep Reiforcement Learning**.
那么就只需要下面这三个步骤:
#### 1. 定义一系列的函数
<p align="center">
<img src='/images/ml/RL/DRL_Step1.png' width='60%'>
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
也就是说，$R_{\theta}$就是一个随机变量。因此我们的目标就应该变成:
**学习去最大化$R_{\theta}$的期望值 $\bar{R}_{\theta}$**

**这个期望值$\bar{R}_{\theta}$就表示函数的好坏。**　那应该如何去计算这个期望值呢? 
为了表示得方便，我们把一个episode考虑成一个trajectory $\tau$:
- $\tau = {s_1,a_1,r_1,s_2,a_2,r_2,...,s_T,a_T,r_T}$
- $R_{\tau} = \sum_{n=1}^Nr_n$
- 如果你使用一个actor去玩游戏，每一个$\tau$的出现都会有一个概率,它的值取决于actor的参数$\theta$，记为$P(\tau|\theta)$。

::: tip 提示
$\tau$代表了一个游戏过程,具体下来的$\tau$往往有千千万万种, 选择使用某一个Actor去玩这个游戏的时候，可能只会看到其中的某一些$\tau$。有些过程比较容易出现，有些玩很多次都不会遇到(就像是很多人都发现不了游戏中的彩蛋)。因此就出现了$P(\tau|\theta)$。
:::

于是:
$$
\bar{R}_{\theta} = \sum_{\tau}R(\tau)P(\tau|\theta)
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
选出最好的Actor,采用的方法就是**Gradient Ascent**
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
=\sum_{\tau} R(\tau) P(\tau | \theta) \nabla \log P(\tau | \theta)
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

接下来解释为什么要取对数:

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


这里还有一个问题，很有可能$R(\tau^n)$总是正的，你要知道所有的动作其实就是采样得到，那么没有得到采样得到的那个Action对应的概率便会减小。而这其实是不对的。解决这个问题的办法就是添加一个Base Line: b 写成:

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
:::


参考: 

[1] [A Beginner's Guide to Deep Reinforcement Learning](https://skymind.ai/wiki/deep-reinforcement-learning)<br>
[2] ["Reinforcement Learning: An Introduction" by Sutton and Barto](http://incompleteideas.net/sutton/book/the-book-2nd.html)<br>
[3] [Understanding RL: The Bellman Equations](https://joshgreaves.com/reinforcement-learning/understanding-rl-the-bellman-equations/)<br>
[4] [李宏毅:ML Lecture 23-1 Deep Reinforcement Learning](https://www.youtube.com/watch?v=W8XF3ME8G2I&t=363s)

<Livere/>