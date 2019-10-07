---
pageClass: python-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-12 15:25:13
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-27 15:06:13
 -->

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

<Livere/>