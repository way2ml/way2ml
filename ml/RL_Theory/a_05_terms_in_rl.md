---
pageClass: ml-class
---

# 强化学习里涉及到的概念
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

- **Episode**: 游戏从开始到结束是一个Episode,可以理解成一个回合。

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



<Livere/>