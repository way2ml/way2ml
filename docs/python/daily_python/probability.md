---
pageClass: python-class
---



# 概率统计
## 如何按照概率对一个列表采样?
```python
np.random.seed(0)
p = np.array([0.1, 0.0, 0.7, 0.2])
index = np.random.choice([0, 1, 2, 3], p = p.ravel())
```
