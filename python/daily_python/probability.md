---
pageClass: python-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-12 15:14:27
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-12 15:15:33
 -->

# 概率统计
## 如何按照概率对一个列表采样?
```python
np.random.seed(0)
p = np.array([0.1, 0.0, 0.7, 0.2])
index = np.random.choice([0, 1, 2, 3], p = p.ravel())
```
