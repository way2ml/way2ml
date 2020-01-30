---
pageClass: ml-class
---

# 安装PyTorch
PyTorch的[官网](https://pytorch.org) 首页就会有安装提示,我使用的是Linux(Manjaro), 有GPU, 选择使用
Anaconda安装。其实这个时候我不知道我的CUDA是什么版本，先试试10.1看看吧。

为了保险，先为PyTorch创建一个新的Anaconda环境, 命名为torch, 使用的Python版本是3.7

```bash
conda create -n torch python==3.7 ipython
```

安装完成后用下面的命令进入到新的环境:
```bash
conda activate torch
```
成功后可以在命令变成了以`(torch)`开头, 我的张这样:
```bash
(torch) [jack@jack-pc ~]$ 
```
表示进入到了`torch`环境了。

然后在新的环境中执行PyTorch官网提供的命令:

```bash
conda install pytorch torchvision cudatoolkit=9.2 -c pytorch
```

命令执行完成后，我们运行一小段程序看看我们的PyTorch安装正确了没有。

```python
from __future__ import print_function
import torch
x = torch.rand(5, 3)
print(x)
```
我的输出是:

```python
tensor([[0.7954, 0.4127, 0.0070],
        [0.0224, 0.5361, 0.0467],
        [0.4526, 0.8981, 0.6600],
        [0.2634, 0.1807, 0.1023],
        [0.8311, 0.0931, 0.5410]])
```

这说明基本正常, 接下来我们看看PyTorch能否正常使用GPU:
```python
import torch
torch.cuda.is_available()
```

很遗憾，我的结果是这样:
```python
False
```

后面经过探索我尝试安装8.0版本的cudatoolkit后就可以了。
```bash
conda install -c anaconda cudatoolkit==8.0
conda install pytorch torchvision cudatoolkit==8.0 -c pytorch
```

你安装好了吗? 欢迎在留言区留下您的反馈。

<Livere/>