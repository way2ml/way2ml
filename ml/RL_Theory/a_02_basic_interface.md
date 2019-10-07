---
pageClass: ml-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-07-04 00:52:27
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-26 22:12:07
 -->


# 强化学习的基本模型
<p align="center">
<img src='/images/ml/RL/RL.png' width='60%'>
</p>
在只有少数动作会得到奖励的情况下,找到正确的动作是学习的难点。

::: tip 提示
在和环境交互的时候，我们能够控制的只有智能体。而环境,和奖励是没有办法控制的。奖励是在交互之前就定好的规则。
:::

::: warning 思考
如果你的奖励也在合理的变化, 是不是就又会有新的发现呢? 
:::

<mermaid/>

```mermaid
graph TD  
  subgraph  
    event1["USERsadfasdf_SPENDED"] 
    event1 --> keycloak1("Blocage du compte")  
  end
  subgraph 
    event2["USER_SUSPENDED"] 
    event2 --> workplace1("Blocage du compte")  
  end

  style keycloak1 fill:#ffb6c1  
  style workplace1 fill:#e6e6fa  
  style event1 fill:#c1cdc1,stroke:#333,stroke-width:2px,stroke-dasharray: 10
  style event2 fill:#c1cdc1,stroke:#333,stroke-width:2px,stroke-dasharray: 10
```

<Livere/>