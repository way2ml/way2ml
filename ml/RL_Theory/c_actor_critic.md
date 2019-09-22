---
pageClass: ml-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-19 10:13:01
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-23 00:02:55
 -->

# Asynchronous Advantage Actor-Critic

Asynchronous Advantage Actor-Critic 怎么发音？
[eɪˈsɪŋkrənəs]

<p align="center">
<audio ref='A3C' src="/images/ml/RL/A3C/A3C.mp3" controls loop preload></audio>
</p>


上次在PPO那一节中的Advantage Function怎么设计还没有说完，这一节来继续探讨这个问题。

Actor-Critics就是通过V得到Advantage Function, 然后做Policy Gridient, 得到好的策略。而得到V function的方式是使用MC或者TD。

接着Policy Based 的方法，我把笔记先放在这里。

<p align='center'>
<img src='/images/ml/RL/policy_base_approch/Policy_Based_Approch_1.png'>
<img src='/images/ml/RL/policy_base_approch/Policy_Based_Approch_2.png'>
<img src='/images/ml/RL/policy_base_approch/Policy_Based_Approch_3.png'>
<img src='/images/ml/RL/policy_base_approch/Policy_Based_Approch_4.png'>
<img src='/images/ml/RL/policy_base_approch/Policy_Based_Approch_5.png'>
<img src='/images/ml/RL/policy_base_approch/Policy_Based_Approch_6.png'>
</p>

<Livere/>