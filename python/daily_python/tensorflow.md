---
pageClass: python-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-12 15:44:42
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-10-24 20:28:01
 -->

# Tensorflow

## Tensorboard里面显示图片
```python
import tensorflow as tf

# 获取图片数据
file = open('1.png', 'rb')
data = file.read()
file.close()

# 图片处理
image = tf.image.decode_png(data, channels=4)
image = tf.expand_dims(image, 0)

# 添加到日志中
sess = tf.Session()
writer = tf.summary.FileWriter('logs')
summary_op = tf.summary.image("image1", image)

# 运行并写入日志
summary = sess.run(summary_op)
writer.add_summary(summary)

# 关闭
writer.close()
sess.close()

```

## 断点续训功能
```python
        
        self.saver = tf.train.Saver() # To Save Trainning Process
        self.MODEL_SAVE_PATH = './model/'
        self.MODEL_NAME='fitNN_model'
        
        # Restore Last Training Model 
        ckpt = tf.train.get_checkpoint_state(self.MODEL_SAVE_PATH)
        if ckpt and ckpt.model_checkpoint_path:
            self.saver.restore(self.sess, ckpt.model_checkpoint_path)
            print("Model Restored.")

        for it in range(nIter):
            # Train
        
            if it % 1000 == 0:
                self.saver.save(self.sess, os.path.join(self.MODEL_SAVE_PATH, self.MODEL_NAME))
```
运行成功之后，在命令行中执行:

`tensorboard --logdir=LOGPATH` 即可打开 Tensorboard

## 如何在保存/恢复多个网络模型的快照?
保存
```python
# Saver to save all the variables
model_save_path = './model/'
model_name = 'gail'

# max_to_keep表示你想要保存的快照数目
saver = tf.train.Saver(max_to_keep=120)

with tf.Session() as sess:
    ...
    for episode in range(max_episode):
        ...
        if episode > 0 and episode % 100 == 0:
            # global_step可以帮你自动命名
            saver.save(sess, os.path.join(model_save_path, model_name), global_step=episode)
```

恢复
```python
# Saver to save all the variables
model_save_path = './model/'
model_name = 'gail'
# saver = tf.train.import_meta_graph(os.path.join(model_save_path,model_name+'-9600.meta'))
saver = tf.train.Saver() 
ckpt = tf.train.get_checkpoint_state(model_save_path)
if ckpt and ckpt.model_checkpoint_path:
        print('Found Saved Model.')
        # 指定使用哪一个时刻训练好的模型
        # [-1]:代表最新的
        # [0]: 代表最老的
        ckpt_to_restore = ckpt.all_model_checkpoint_paths[-2]
else:
    print('No Saved Model. Exiting')
    exit()

...

with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    # Restore Model
    if ckpt and ckpt.model_checkpoint_path:
        saver.restore(sess,ckpt_to_restore)
        print('Model Restored.')
```

## 如何查看checkpoint里面保存了哪些变量?
```python
from tensorflow.python.tools.inspect_checkpoint import print_tensors_in_checkpoint_file
print_tensors_in_checkpoint_file(ckpt_to_restore, all_tensors=True, tensor_name='')
```

[How do I find the variable names and values that are saved in a checkpoint?
](https://stackoverflow.com/questions/38218174/how-do-i-find-the-variable-names-and-values-that-are-saved-in-a-checkpoint)


## 如何使用scope name 恢复部分保存的变量?
```python
# Restore only discriminator
saver = tf.train.Saver(var_list=tf.get_collection(tf.GraphKeys.GLOBAL_VARIABLES, scope='discriminator'))
```

**参考:**
[How to restore variables of a particular scope from a saved checkpoint in tensorflow?](https://stackoverflow.com/questions/42546365/how-to-restore-variables-of-a-particular-scope-from-a-saved-checkpoint-in-tensor/42977504)

## 切片
Tensorflow支持numpy形式的切片
举例说明:
``` python 
# 例子1
 x = tf.Variable(tf.truncated_normal(shape=(100, 100)))
 y = x[10:20,]

 sess = tf.InteractiveSession()
 tf.global_variables_initializer().run()
 y.eval().shape
 #output
 #(10, 100)
 
# 例子2
 import tensorflow as tf
 x = tf.constant([[1,2,3],[4,5,6],[7,8,9]])
 y1 = x[:,0:1] # 提取第一列元素(返回值的维数是2维)
 # y1 = x[:,0] # 若是这样维数是1维
 sess = tf.Session()
 sess.run(x)
 #array([[1, 2, 3],
 #      [4, 5, 6],
 #      [7, 8, 9]], dtype=int32)
 sess.run(y)
 #array([[1],
 #      [4],
 #      [7]], dtype=int32)
 
```
## 查看Tensorfow是否使用的是GPU版本
``` python
import tensorflow as tf
if tf.test.gpu_device_name():
    print('Default GPU Device: {}'.format(tf.test.gpu_device_name()))
else:
    print("Please install GPU version of TF")
```
若是，那么通常会输出如下的结果:

`Default GPU Device: /device:GPU:0`


## 在Tensorflow中添加观察项，便于观察训练结果
``` python
# 第零步: 在要观察的值附近修改成下面的格式
with tf.name_scope('loss'):
    self.loss = tf.losses.mean_squared_error(labels=self.tfy, predictions=self.out)
    tf.summary.scalar('loss',self.loss)

# 第一步: 在全局初始化前加上两句
self.merged = tf.summary.merge_all()
self.writer = tf.summary.FileWriter("logs/", self.sess.graph)
self.sess.run(tf.global_variables_initializer())


# 第三步:在训练的过程中不断添加记录
if (i+1) % 50 == 0: 
    print(i, 'train loss: ', train_loss)
    vgg.save('./model/transfer_learn')
    print("Model Updated")
    result = vgg.sess.run(vgg.merged,feed_dict={vgg.tfx: xs[b_idx], vgg.tfy: ys[b_idx]})
    vgg.writer.add_summary(result,i)
```

## loss降不下去可能的原因
- 每次的Minibatch都随便给
- 参数不够
- 
loss一会很高一会很低 

## Tensorfow GPU 版本的依赖
```
https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html
CUDA Toolkit	Linux x86_64 Driver Version	Windows x86_64 Driver Version
CUDA 10.1.105	>= 418.39	>= 418.96
CUDA 10.0.130	>= 410.48	>= 411.31
CUDA 9.2 (9.2.148 Update 1)	>= 396.37	>= 398.26
CUDA 9.2 (9.2.88)	>= 396.26	>= 397.44
CUDA 9.1 (9.1.85)	>= 390.46	>= 391.29
CUDA 9.0 (9.0.76)	>= 384.81	>= 385.54
CUDA 8.0 (8.0.61 GA2)	>= 375.26	>= 376.51
CUDA 8.0 (8.0.44)	>= 367.48	>= 369.30
CUDA 7.5 (7.5.16)	>= 352.31	>= 353.66
CUDA 7.0 (7.0.28)	>= 346.46	>= 347.62
```


## 如何在tf.keras中保存和加载训练模型?
```python
from tensorflow.keras import models, layers, optimizers

def create_model(self):
		model = models.Sequential([
			layers.Dense(100, input_dim=self.obervation_space, activation='relu'),
			layers.Dense(self.action_space, activation='linear')
			])
		model.compile(loss='mean_squared_error', optimizer = optimizers.Adam(self.lr))
		return model 

def save_model(self, file_path='MountainCar-v0-dqn.h5'):
		print('model saved')
		self.model.save(file_path)


def load_model(self):
		return models.load_model('./MountainCar-v0-dqn.h5',compile=False)
```



## 如何使用tf.one_hot()?
在处理的训练数据的标签时，往往需要把标签变成one_hot的形式，在Tensorflow里面可以这样处理。
```python
import tensorflow as tf
labels = [0,1,2,3,4,5,6,7,8,9]
n_labels = 10
labels_one_hot = tf.one_hot(labels,n_labels)
sess = tf.Session()
result = sess.run(labels_one_hot)
print(result)
```
得到的结果:
```bash
[[1. 0. 0. 0. 0. 0. 0. 0. 0. 0.]
 [0. 1. 0. 0. 0. 0. 0. 0. 0. 0.]
 [0. 0. 1. 0. 0. 0. 0. 0. 0. 0.]
 [0. 0. 0. 1. 0. 0. 0. 0. 0. 0.]
 [0. 0. 0. 0. 1. 0. 0. 0. 0. 0.]
 [0. 0. 0. 0. 0. 1. 0. 0. 0. 0.]
 [0. 0. 0. 0. 0. 0. 1. 0. 0. 0.]
 [0. 0. 0. 0. 0. 0. 0. 1. 0. 0.]
 [0. 0. 0. 0. 0. 0. 0. 0. 1. 0.]
 [0. 0. 0. 0. 0. 0. 0. 0. 0. 1.]]
```

## 如何安装Tensorflow2.0?

创建一个新的Conda环境， 命名为tf2.0
```bash
conda create -n tf2.0
```

进入到tf2.0环境
```bash
conda activate tf2.0
```
安装pip
```bash
conda install pip
```
检查Python和pip的版本
需要满足`Python > 3.4 and pip >= 19.0`
```bash
python3 --version
pip --version
```
开始安装tf2.0
``` 
pip install tensorflow-gpu==2.0
```


## 一些常用的函数
1. `tf.nn.softplus(features, name=None)`
$$
f(x) = \ln (1+e^x)
$$

<p align='center'>
<img src='/images/python/daily_python/tensorflow/softplus.svg' width='50%'>
</p>

2. `tf.contrib.distributions.Normal`
$$
f\left(x | \mu, \sigma^{2}\right)=\frac{1}{\sqrt{2 \pi \sigma^{2}}} e^{-\frac{(x-\mu)^{2}}{2 \sigma^{2}}}
$$

<p align='center'>
<img src='/images/python/daily_python/tensorflow/Normal_Distribution_PDF.svg' width='50%'>
</p>

The probability density function (pdf) is,

```none
pdf(x; mu, sigma) = exp(-0.5 (x - mu)**2 / sigma**2) / Z
Z = (2 pi sigma**2)**0.5
```

where `loc = mu` is the mean, `scale = sigma` is the std. deviation, and, `Z`
is the normalization constant.

标准差 $\sigma$ 是方差的算术平方根,不能是负数。

3. `tf.squeeze()`
下面有个例子:
```python
import tensorflow as tf
tf.enable_eager_execution() ##if using TF1.4 for TF2.0 eager mode is the default mode.
####example 1
a = tf.constant(value=[1,3,4,5],shape=(1,4))
print(a)
Output : tf.Tensor([[1 3 4 5]], shape=(1, 4), dtype=int32)

#after applying tf.squeeze shape has been changed from  (4,1) to (4, )
b = tf.squeeze(input=a)
print(b)
output: tf.Tensor([1 3 4 5], shape=(4,), dtype=int32)
####example2
a = tf.constant(value=[1,3,4,5,4,6], shape=(3,1,2))
print(a)
Output:tf.Tensor(
[[[1 3]]
 [[4 5]]
 [[4 6]]], shape=(3, 1, 2), dtype=int32)

#after applying tf.squeeze shape has been chnaged from (3, 1, 2) to (3, 2)
b = tf.squeeze(input=a)
print(b)
Output:tf.Tensor(
[[1 3]
 [4 5]
 [4 6]], shape=(3, 2), dtype=int32)
```

[stackoverflow](https://stackoverflow.com/questions/41482823/what-do-the-functions-tf-squeeze-and-tf-nn-rnn-do)
