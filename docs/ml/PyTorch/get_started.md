---
pageClass: ml-class
---
# 开始学习

我们直接跟着官方的[教程](https://pytorch.org/tutorials/)开始学习。

## 什么是PyTorch?
- A replacement for NumPy to use the power of GPUs
- A deep learning research platform that provides maximum flexibility and speed

- 一个Numpy的替代品，并且可以使用GPU
- 一个深度学习的平台, 它灵活高效

开始啦,

### Tensors 张量

```python
from __future__ import print_function
import torch
```

构造一个5x3的矩阵, 没有被初始化:
```python
x = torch.empty(5, 3)
print(x)
```

构造一个随机的初始化的矩阵:
```python
x = torch.rand(5, 3)
print(x)
```

初始化为0, 数据类型是`torch.long`
```python
x = torch.zeros(5, 3, dtype=torch.long)
print(x)
```

或者直接从数据生成一个张量:
```python
x = torch.tensor([5.5, 3])
print(x)
```

::: tip 提示
这一点和Numpy确实是很像呢!
:::

根据已有的tensor生成新的Tensor：

```python
x = x.new_ones(5, 3, dtype=torch.double)      # new_* methods take in sizes
print(x)

x = torch.randn_like(x, dtype=torch.float)    # override dtype!
print(x)   
```

::: tip 提示
`torch.Size` 实际上是个tuple, 因此支持tuple所有的操作.
:::

### Operations 运算符
