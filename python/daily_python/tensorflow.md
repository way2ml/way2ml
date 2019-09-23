---
pageClass: python-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-12 15:44:42
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-23 14:18:03
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

## 