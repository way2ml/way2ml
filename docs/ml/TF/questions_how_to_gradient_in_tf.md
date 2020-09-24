---
pageClass: ml-class
---
# 在Tensorflow中如何求偏导

首先来看一个非常简单的例子:

对一个简单的函数 $y=wx^2$ 求偏导:

```python
import tensorflow as tf 

x = tf.Variable(initial_value=5., dtype='float32')
w = tf.Variable(initial_value=1., dtype='float32')
y = w*(x**2)

opt = tf.train.GradientDescentOptimizer(0.1)
grad = opt.compute_gradients(y, [w,x])
with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    print(sess.run(grad))
```
上面的程序，$y$分别对$w,x$求了偏导，得到的结果解释是这样的,

```bash
# 结果[(25.0, 1.0), (10.0, 5.0)]的解释如下:
# y'(x) = 2x*w => [10,5]: 当 x=５时，对应偏导值
# y'(w) = x**2 => [25,1]: 当 w=1时，对应的偏导值 
```


接下来我们对神经网络的$loss$求偏导。
首先我们构造下面的神经网络的结构: 

<p align='center'>
<img src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/nn_structure_0.png' width='50%'>
</p>

在这个网络结构中,可以被训练的参数有$w_{11},w_{12},w_{13},b_{11},b_{12},b_{13},w_{21},w_{22},w_{23},b_{21}$
这10个，接下来我们求 $loss$ 对这10个数的偏导。
```python
# build network
import tensorflow as tf
import numpy as np 
import matplotlib.pyplot as plt 

def add_layer(inputs, in_size, out_size, actication_function = None):
	Weights = tf.Variable(tf.random_normal([in_size,out_size]))
	biases = tf.Variable(tf.zeros([1,out_size]) + 0.1) # Because the recommend initial
												# value of biases != 0; so add 0.1
	Wx_plus_b = tf.matmul(inputs, Weights) + biases
	
	if actication_function is None:
		outputs = Wx_plus_b
	else:
		outputs = actication_function(Wx_plus_b)
	return outputs

# create data
# 300 elenments from -1 to 1 
x_data = np.linspace(-1,1,300)[:, np.newaxis] 
noise = np.random.normal(0, 0.05, x_data.shape)
y_data = np.square(x_data) - 0.5 + noise

xs = tf.placeholder(tf.float32, [None, 1]) # * rows, 1 col
ys = tf.placeholder(tf.float32, [None, 1]) # * rows, 1 col


# define hidden layer and output layer
l1 = add_layer(xs, 1, 3, actication_function = tf.nn.sigmoid)
prediction = add_layer(l1, 3, 1, actication_function = None)




loss = tf.reduce_mean(tf.reduce_sum(tf.square(ys - prediction), reduction_indices=[1]))
opt = tf.train.GradientDescentOptimizer(0.1)
grad = opt.compute_gradients(loss,tf.get_collection(tf.GraphKeys.TRAINABLE_VARIABLES))
train_step = opt.minimize(loss)


init = tf.global_variables_initializer()

sess = tf.Session()
sess.run(init)


fig = plt.figure()
ax = fig.add_subplot(1,1,1)
ax.scatter(x_data,y_data)
plt.ion()
plt.show()

for i in range (2000):
	sess.run(train_step, feed_dict={xs:x_data, ys:y_data})
	if i % 20 == 0:
		print('Loss:', sess.run(loss,feed_dict={xs:x_data, ys:y_data}))
		try:
			ax.lines.remove(lines[0])
		except Exception :
			pass
		prediction_value = sess.run(prediction, feed_dict={xs:x_data, ys:y_data})
		lines = ax.plot(x_data, prediction_value, 'r-', lw = 4)
		plt.pause(0.1)
    
    # 用来测试求偏导
	if i  == 1999:
		print('Trainable Variables:', tf.get_collection(tf.GraphKeys.TRAINABLE_VARIABLES))
		print('Grad:', sess.run(grad,feed_dict={xs:x_data, ys:y_data}))

```


```bash
##################
# 可以被训练的参数:  
##################
# # 对应 w11,w12, w13
# [<tf.Variable 'Variable:0' shape=(1, 3) dtype=float32_ref>,  
# # 对应 b11, b12, b13
#  <tf.Variable 'Variable_1:0' shape=(1, 3) dtype=float32_ref>, 
# # 对应　w21, w22, w23
#  <tf.Variable 'Variable_2:0' shape=(3, 1) dtype=float32_ref>, 
# # 对应　b21
#  <tf.Variable 'Variable_3:0' shape=(1, 1) dtype=float32_ref>]

###################
# 结果解释：
###################
# [w11,w12,w13] = [1.4377401, 3.1283407, -1.8470509]时的偏导值为[-0.00658626, -0.00904603,  0.00350215]

# # 对应　w11, w12, w13
# [　　　 (array([[-0.00658626, -0.00904603,  0.00350215]], dtype=float32), array([[ 1.4377401,  3.1283407, -1.8470509]], dtype=float32)), 
# # 对应  b11, b12, b13　　　
# 　　　　(array([[ 0.00469836, -0.00399115, -0.00315102]], dtype=float32), array([[-0.58592653,  1.7151704 ,  0.7725139 ]], dtype=float32)), 
# # 对应 w21, w22, w23 
# 	   (array([[-0.00720509],
#        [ 0.00878299],
#        [ 0.00243923]], dtype=float32), 
#        array([[ 1.6078004],
#        [-1.8724854],
#        [-0.7588247]], dtype=float32)), 
# # 对应 b21
#        (array([[-0.00723374]], dtype=float32), array([[1.1012503]], dtype=float32))]
```

好啦，这就学会了如何在Tensorflow中求偏导了。