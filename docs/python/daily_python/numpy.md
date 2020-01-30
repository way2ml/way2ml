---
pageClass: python-class
---


# Numpy 
## 如何二维数据变一维/一维变二维？
```
A1=np.ones([1,NX])*(1+r)
A1 = A1.ravel()
```

## 如何存/取数据？
``` python
# 文本形式
np.savetxt('a.txt',a)
np.loadtxt('a.txt')
# 以float64的精度读取数据
np.loadtxt('a.txt', 'float64')

# 二进制的形式
np.save('test3.npy', a)    
d = np.load('test3.npy')
```

## 如何将大矩阵分成小矩阵?

``` python
In [57]: x = np.arange(16.0).reshape(4, 4)

In [58]: x
Out[58]: 
array([[ 0.,  1.,  2.,  3.],
       [ 4.,  5.,  6.,  7.],
       [ 8.,  9., 10., 11.],
       [12., 13., 14., 15.]])

In [59]: np.hsplit(x, 2)
Out[59]: 
[array([[ 0.,  1.],
        [ 4.,  5.],
        [ 8.,  9.],
        [12., 13.]]), array([[ 2.,  3.],
        [ 6.,  7.],
        [10., 11.],
        [14., 15.]])]

In [60]: np.hsplit(x, 2)[0]
Out[60]: 
array([[ 0.,  1.],
       [ 4.,  5.],
       [ 8.,  9.],
       [12., 13.]])

In [61]: np.hsplit(x, 2)[1]
Out[61]: 
array([[ 2.,  3.],
       [ 6.,  7.],
       [10., 11.],
       [14., 15.]])

In [62]: np.vsplit(x, 2)
Out[62]: 
[array([[0., 1., 2., 3.],
        [4., 5., 6., 7.]]), array([[ 8.,  9., 10., 11.],
        [12., 13., 14., 15.]])]

In [63]: np.vsplit(x, 2)[0]
Out[63]: 
array([[0., 1., 2., 3.],
       [4., 5., 6., 7.]])

In [64]: np.vsplit(x, 2)[1]
Out[64]: 
array([[ 8.,  9., 10., 11.],
       [12., 13., 14., 15.]])
```
## 如何按列分割矩阵?
``` python
In [34]: x
Out[34]: 
array([[ 0.,  1.,  2.,  3.],
       [ 4.,  5.,  6.,  7.],
       [ 8.,  9., 10., 11.],
       [12., 13., 14., 15.]])

In [35]:  x[:,:-2]
Out[35]: 
array([[ 0.,  1.],
       [ 4.,  5.],
       [ 8.,  9.],
       [12., 13.]])
```

## 如何删除某列/删除一列?
``` python
In [66]: x
Out[66]: 
array([[ 0.,  1.,  2.,  3.],
       [ 4.,  5.,  6.,  7.],
       [ 8.,  9., 10., 11.],
       [12., 13., 14., 15.]])

In [67]: np.delete(x,-1,axis=1)
Out[67]: 
array([[ 0.,  1.,  2.],
       [ 4.,  5.,  6.],
       [ 8.,  9., 10.],
       [12., 13., 14.]])
```

## 如何将一个元素的列元素相加?
``` python
In [28]: x
Out[28]: 
array([[ 0.,  1.,  2.,  3.],
       [ 4.,  5.,  6.,  7.],
       [ 8.,  9., 10., 11.],
       [12., 13., 14., 15.]])

In [29]: np.sum(x,axis=0)
Out[29]: array([24., 28., 32., 36.])
```

## 如何list转numpy.ndarray?
``` python
b = [1,2,1]
nb = np.array(b)
# nb: array([1, 2, 1])
```

## 如何一维ndarray 变二维， 如何添加一个维度？
``` python
nb = array([1, 2, 1])
nb = nb[np.newaxis, :]
# nb: array([[1, 2, 1]])
```

## 如何一行一行拼接2维的ndarray?
``` python
In [122]: ss
Out[122]: 
array([[ 1,  2,  3],
       [11, 22, 33],
       [44, 55, 66],
       [ 1,  2,  1]])

In [123]: bb = np.array([[7,8,9]])

In [124]: bb
Out[124]: array([[7, 8, 9]])

In [125]: np.concatenate((ss,bb),axis=0)
Out[125]: 
array([[ 1,  2,  3],
       [11, 22, 33],
       [44, 55, 66],
       [ 1,  2,  1],
       [ 7,  8,  9]])
```

## 如何重复某一行?
``` python
In [149]: x
Out[149]: array([[1, 2]])

In [150]: np.repeat(x, 2, axis=0)
Out[150]: 
array([[1, 2],
       [1, 2]])
```

## 如何按行打乱顺序?
```python
In [34]: X = np.random.random((6, 2))

In [35]: X
Out[35]: 
array([[0.13620184, 0.3942041 ],
       [0.75771171, 0.08963793],
       [0.44497732, 0.94352307],
       [0.88938908, 0.61157559],
       [0.2932643 , 0.95246537],
       [0.4272179 , 0.74175378]])

In [36]: np.random.shuffle(X)

In [37]: X
Out[37]: 
array([[0.4272179 , 0.74175378],
       [0.88938908, 0.61157559],
       [0.13620184, 0.3942041 ],
       [0.2932643 , 0.95246537],
       [0.75771171, 0.08963793],
       [0.44497732, 0.94352307]])
```

## 如何生成一个递增的数列
``` python
np.linspace(70,99,30)
array([70., 71., 72., 73., 74., 75., 76., 77., 78., 79., 80., 81., 82.,
       83., 84., 85., 86., 87., 88., 89., 90., 91., 92., 93., 94., 95.,
       96., 97., 98., 99.])

```

## 如何理解numpy中的axis？
<p align='center'>
<img src='/images/python/daily_python/numpy/numpy-arrays-have-axes.png'>
</p>

参考 [链接](https://www.sharpsightlabs.com/blog/numpy-axes-explained/)

## 如何将大小为1的array转化成对应的Scalar?
```python
>>> np.asscalar(np.array([24]))
24
>> np.asscalar(np.array([[24]]))
24
```

### 如何将多个矩阵叠起来形成类似多通道图片的数据?
```python
import numpy as np 
# 3张单通道的图片
x = np.array([[ 0,  1,  2], [ 3,  4,  5], [ 6,  7,  8], [ 9, 10, 11]])
y = np.array([[12, 13, 14], [15, 16, 17], [18, 19, 20], [21, 22, 23]])
z = np.array([[24, 25, 26], [27, 28, 29], [30, 31, 32], [33, 34, 35]])

# 叠加成一张3通道的图片
t = np.stack((x,y,z))

print(x.shape, y.shape, z.shape,t.shape)
``` 
输出:
```bash
(4, 3) (4, 3) (4, 3) (3, 4, 3)
```
最后的的(3,4,3)中的数字代表的意思是:
- 3: 三个通道
- 4: 四行
- 3: 三列

结合下面这张图:
<p align='center'>
<img src='https://www.numpy.org.cn/static/images/article/arr3d.7442cd4e11c6.jpg'>
</p>

我们想要索引17，则可以通过下面的方式:
```python
t[1][1][2]
```
输出:
```bash
17
```
::: tip 提示
注意我们的index是从0开始。
:::

参考:<br/> 
[使用 NumPy 进行数组编程](https://www.numpy.org.cn/article/advanced/numpy_array_programming.html#%E8%BF%9B%E5%85%A5%E7%8A%B6%E6%80%81%EF%BC%9A%E4%BB%8B%E7%BB%8Dnumpy%E6%95%B0%E7%BB%84) <br/>
[numpy.stack](https://docs.scipy.org/doc/numpy/reference/generated/numpy.stack.html)


### 如何打印一个完整的Numpy Array? 
我们在打印输出比较大的Numpy矩阵的时候，因为显示完整的矩阵会不太美观，所以会简化输出。但有时我们确实需要查看完整的信息，
那么我们可以在`print`语句前面加下面的语句来显示完整的内容:
```python
np.set_printoptions(threshold=np.inf)
```

### 如何用指定的索引值批量索引? 
#### 方法1 fancy index
这个问题有热心网友帮我回答了, [How to index numpy array with given indexes?](https://stackoverflow.com/questions/58870150/how-to-index-numpy-array-with-given-indexes)

有时我们需要对一个array批量索引，这时我们可以把索引值放在一个列表里面。

在强化学习中我现在有很多个不同状态下的动作的分布dis(离散的分布)：
```python
import numpy as np
distributions = np.array([[0.1,0.2,0.7],[0.3,0.3,0.4],[0.2,0.2,0.6]])

# array([[0.1, 0.2, 0.7],  # \pi(s0)
#        [0.3, 0.3, 0.4],  # \pi(s1)
#        [0.2, 0.2, 0.6]]) # \pi(s2)
```

接下来我们想要看在s0状态下采取动作0,在s1状态下采取动作2,在s2状态下采取动作1,对应的概率分别是多少，于是我们将索引保存到一个列表中:

``` python
actions = np.array([[0],[2],[1]])

# array([[0],  # 在s0状态采取动作0
#        [2],  # 在s1状态采取动作2
#        [1]]) # 在s2状态采取动作1
```

接下来想要得到在对应状态下采取特定动作对应的概率:

想要得到的结果是:
```python
# array([0.1,0.4,0.2])
# or 
# array([[0.1],
#        [0.4],
#        [0.2]])
```

但是应该怎么做? 我尝试过np.take, 但是我没有达到效果.

```python
probabilities = np.take(distributions, actions)
```

可以这样做:

```python
distributions[np.arange(3), actions.ravel()]  
```

总结一下可以这样做:

```python
import numpy as np
distributions = np.array([[0.1,0.2,0.7],[0.3,0.3,0.4],[0.2,0.2,0.6]])
actions = np.array([0, 2, 1])
probabilities = distributions[np.arange(distributions.shape[0]), actions] 
```


#### 方法二 bool索引
```python
import numpy as np
distributions = np.array([[0.1,0.2,0.7],
                          [0.3,0.3,0.4],
                          [0.2,0.2,0.6]])
```

```python
H = distributions
#定义两个数组，便于后面用作布尔索引
[i,j]=np.indices(H.shape)
print(i)
print(j)
```

```
[[0 0 0]
 [1 1 1]
 [2 2 2]]
[[0 1 2]
 [0 1 2]
 [0 1 2]]
```

```python
#对第一个态，提取第一个动作
H[(i==j) & (i<1)]
```
```
array([0.1])
```

```python
#对第2个态，提取第3个动作
H[(i+1==j) & (i>0)]
```
```
array([0.4])
```

```python
#对第3个态，提取第2个动作
H[(i==j+1) & (j>0)]
```
```
array([0.2])
```

```python
H[((i==j) & (i<1)) | ((i+1==j) & (i>0)) | ((i==j+1) & (j>0))]
```
```
array([0.1, 0.4, 0.2])
```  

```python
H[((i==j) & (i==0)) | ((i+1==j) & (i==1)) | ((i==j+1) & (i==2))]
```
```
array([0.1, 0.4, 0.2])
```



<Livere/>