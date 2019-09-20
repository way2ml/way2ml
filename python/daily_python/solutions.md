---
pageClass: python-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-20 16:47:14
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-20 17:05:24
 -->

# 解决方案

## 图像处理

### cannot import name 'imresize'
```bash
from scipy.misc import imresize
ImportError: cannot import name 'imresize'
```

解决方法: 安装PIL和老版本的Scipy

```bash
conda install -c anaconda pillow
conda install scipy==1.1.0
```

参考: [链接](https://github.com/scipy/scipy/issues/6212)


## RL
### ModuleNotFoundError: No module named 'atari_py'

解决方法，更新对应的模块。
```bash
pip install --upgrade gym[atari]
```
参考: [链接](https://github.com/openai/baselines/issues/387)



<Livere/>