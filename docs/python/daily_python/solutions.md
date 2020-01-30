---
pageClass: python-class
---

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


## Tensorflow
### ensorFlow: “Attempting to use uninitialized value” in variable initialization
没有初始化tf全局变量
```python
init = tf.global_variables_initializer()
sess.run(init)
```
或者
```python
init = tf.initialize_all_variables()
sess.run(init)
```

<Livere/>