---
pageClass: ml-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-19 10:13:01
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-20 22:23:14
 -->

# Actor-Critics

上次在PPO那一节中的Advantage Function怎么设计还没有说完，这一节来继续探讨这个问题。

Actor-Critics就是通过V得到Advantage Function, 然后做Policy Gridient, 得到好的策略。而得到V function的方式是使用MC或者TD。
<Livere/>