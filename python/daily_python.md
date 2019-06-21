---
pageClass: python-class
---
# Python日常
在这个板块，我主要记录的是会常用到的Python技能。
## Anaconda的使用(Usage of Anaconda)
### 1.删除软件源
``` python
conda config --show
conda config --remove channels 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/' 
```

### 2. 更新所有的软件
``` python
conda update --all
```

### 3. 创建新的环境
```bash
conda create -n gpu_tf_keras
```

### 4. 切换到新的环境
```bash
conda activate gpu_tf_keras
```

### 5. 删除一个环境
```bash
conda env remove -n gpu_tf_keras
```

## pip 的使用(Usage Of pip)
### 1. 安装python软件包？
```bash
pip install package
```
### 2. 卸载python软件包?
```
pip uninstall package
```
### 3. 临时修改pip软件源，当下载速度很慢时使用
```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple package
```
## 基本操作
### 1. 列表如何切片 ? | How to slice a list ?
``` python
# 切片是不包含最后一个元素的
>>> li = [0,3,3,6,7]
>>> li[0:1]
[0]
>>> li[2:3]
[3]
>>> li[0:4]
[0, 3, 3, 6]
```
### 2. 如何遍历文件列表 ？ | How to loop a file list ?
#### 法1
``` python
for f in file_list:
    print(f)
```

#### 法2
``` python
for i in range(len(file_list)):
    print(i,file_list[i])

```

### 3. 迭代器的使用
Gang: 迭代器的特点就是 你调用时 它才给你传值
```
In [8]: a = [1,2,3]

In [9]: b = [4,5,6]

In [10]: c = zip(a,b)

In [11]: def test(li):
    ...:     res = []
    ...:     for i in zip(a,b):
    ...:         res.append(i)
    ...:     return res
    ...: 
    ...: 

In [12]: test(c)
Out[12]: [(1, 4), (2, 5), (3, 6)]

In [13]: test(c)
Out[13]: [(1, 4), (2, 5), (3, 6)]
```
### 4. 如何控制浮点数的输出格式? | How to control the output format of a float number?
``` python
"{0:.2f}".format(13.949999999999999)
```

### 5. 筛选出一个列表中的特定元素？| How to select specific element in a list?
``` python
a = [1,2,2,3,4,5]
a = list(filter(lambda x: x!= 2, a))
```
结果是`[1,3,4,5]`

### 6. 对列表求和
``` python
li = [1,2,3]
sum(li)
```

### 7. 对两列表同时遍历
```python
li1 = [1,2,3,4,5]
li2 = ['a','b','c','d','e']
for i,j in zip(li1,li2):
    print(i,j)
``` 
输出:
```bash
1 a
2 b
3 c
4 d
5 e
```

## 概率统计
### 1. 如何按照概率对一个列表采样
```python
np.random.seed(0)
p = np.array([0.1, 0.0, 0.7, 0.2])
index = np.random.choice([0, 1, 2, 3], p = p.ravel())
```

## 字符串处理
### 1. 如何分割字符串? | How to split a string?
``` python
txt = "hello, my name is Peter, I am 26 years old"
x = txt.split(", ")
print(x)
```

### 2. 如何提取字符串中的数字? | How to extract numbers in a string?
```python
import re
s = '1x100.csv'
re.findall('\d+')
```

### 3. 如何将字符串列表按数字大小排序？| How to sort string list by number？
[参考](https://stackoverflow.com/questions/5967500/how-to-correctly-sort-a-string-with-a-number-inside)
```python
import re

def atof(text):
    try:
        retval = float(text)
    except ValueError:
        retval = text
    return retval

def natural_keys(text):
    '''
    alist.sort(key=natural_keys) sorts in human order
    http://nedbatchelder.com/blog/200712/human_sorting.html
    (See Toothy's implementation in the comments)
    float regex comes from https://stackoverflow.com/a/12643073/190597
    '''
    return [ atof(c) for c in re.split(r'[+-]?([0-9]+(?:[.][0-9]*)?|[.][0-9]+)', text) ]

alist=[
    "something1",
    "something2",
    "something1.0",
    "something1.25",
    "something1.105"]

alist.sort(key=natural_keys)
print(alist)
```

### 4. 如何选出两个字符中间的部分？｜How to select the string between two strings?
```python
>>> import re
>>> s = 'Part 1. Part 2. Part 3 then more text'
>>> re.search(r'Part 1\.(.*?)Part 3', s).group(1)
' Part 2. '
>>> re.search(r'Part 1(.*?)Part 3', s).group(1)
'. Part 2. '
```

## 数据处理
### 1. 如何生成0到1之间的随机数？ | How to generate random numbers between 0 and 1?

```python
from pyDOE import lhs

# 生成10000对数据
all_data = lhs(2,10000)

# 从10000个数据里面随机选num个数据，用来训练
def get_traing_data(all_data, num):
    idx = np.random.choice(all_data.shape[0], num, replace=False)
    traing_data = all_data[idx,:]
    t_data = traing_data[:,0]
    x_data = traing_data[:,1]
    t_data = t_data[:,np.newaxis]
    x_data = x_data[:,np.newaxis]
    return t_data, x_data
```

### 2. 如何生成1到20之间的列表？| How to generate a number list from 1 to 20？ 
```python
>> a=[x for x in range(1,20)]
>> a
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
```

### 3. 如何从一个列表中随机选取一个元素？｜How to random select a number from a list?
``` python
import random
num_layers = random.sample(layers_option, 1)[0]
```

### 4. 一列数和矩阵的相互转换
``` python
import numpy as np

def l2m(l):
    global NX,NT
    return(l.reshape(NT,NX,order='F'))

def m2l(m):
    global NX,NT
    t_m = np.transpose(m)
    l_m = t_m.reshape(-1,1)
    return l_m
```

### 5. 将一个数字转换成科学计数的格式
``` python
from decimal import Decimal

def format_e(n):
    a = '%E' % n
    return a.split('E')[0].rstrip('0').rstrip('.') + 'E' + a.split('E')[1]
```

### 6. 以同样的顺序交换两个list
``` python
>>> import numpy as np
>>> x = np.arange(10)
>>> y = np.arange(9, -1, -1)
>>> x
array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
>>> y
array([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
>>> s = np.arange(x.shape[0])
>>> np.random.shuffle(s)
>>> s
array([9, 3, 5, 2, 6, 0, 8, 1, 4, 7])
>>> x[s]
array([9, 3, 5, 2, 6, 0, 8, 1, 4, 7])
>>> y[s]
array([0, 6, 4, 7, 3, 9, 1, 8, 5, 2])
```

### 7. 如何保存和恢复一个列表? | How to save and restore a list ?
```python
import pickle
with open('list.data', 'wb') as filehandle:
    # store the data as binary data stream
    pickle.dump(Train_list, filehandle)

with open('list.data', 'rb') as filehandle:  
    # read the data as binary data stream
    placesList = pickle.load(filehandle)
```

### 8. 如何获取一个列表中特定元素的index? 
```python
li = [1,2,3,4,5]
In [30]: li = np.array(li)                                                           

In [31]: li                                                                          
Out[31]: array([1, 2, 3, 4])

In [32]: li > 1                                                                      
Out[32]: array([False,  True,  True,  True])

In [33]: select = li > 1                                                             

In [34]: select                                                                      
Out[34]: array([False,  True,  True,  True])

In [35]: li[select]                                                                  
Out[35]: array([2, 3, 4])

```

### 9.如何将list of list 变成　list
```python
d = [[180.0], [173.8], [164.2], [156.5], [147.2], [138.2,12]]
elite_states = sum(d,[])
[180.0, 173.8, 164.2, 156.5, 147.2, 138.2, 12]
```

### 10. 如何统计一个列表中的元素出现的次数
```python
a = [1, 2, 3, 1, 1, 2]
dict = {}
for key in a:
    dict[key] = dict.get(key, 0) + 1
print(dict)
# >>>{1: 3, 2: 2, 3: 1}
```
## Numpy 
### 1. 二维数据变一维/一维变二维
```
A1=np.ones([1,NX])*(1+r)
A1 = A1.ravel()
```

### 2. 存/取数据
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

### 3. 大矩阵分成小矩阵

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
### 按列分割矩阵
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

### 4.矩阵删除某列/删除一列
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

### 5. 将一个元素的列元素相加
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

### 6. list转numpy.ndarray
``` python
b = [1,2,1]
nb = np.array(b)
# nb: array([1, 2, 1])
```

### 7. 1维ndarray 变二维， 添加一个维度
``` python
nb = array([1, 2, 1])
nb = nb[np.newaxis, :]
# nb: array([[1, 2, 1]])
```

### 8. 一行一行拼接2维的ndarray
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

### 9. 重复某一行
``` python
In [149]: x
Out[149]: array([[1, 2]])

In [150]: np.repeat(x, 2, axis=0)
Out[150]: 
array([[1, 2],
       [1, 2]])
```

### 10. 按行打乱顺序
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

### 11. 生成一个递增的数列
``` python
np.linspace(70,99,30)
array([70., 71., 72., 73., 74., 75., 76., 77., 78., 79., 80., 81., 82.,
       83., 84., 85., 86., 87., 88., 89., 90., 91., 92., 93., 94., 95.,
       96., 97., 98., 99.])

```

## Pandas
### 1. 读取CSV文件
```python
import numpy as np 
import pandas as pd
df = pd.read_csv(PATH+FILENAME1)
df = pd.read_csv('loss.txt',sep=' ', header=None)
```

### 2. 将某一列元素乘以一个数
```
#!/usr/bin/env python
import numpy as np 
import pandas as pd
import sys 

if len(sys.argv) < 2:
    print("Ooops, Usage:" + sys.argv[0] + " FILENAME")
    exit()

dataframe = pd.read_csv(sys.argv[1], header=None)
dataframe.loc[:,1] *= 1000
dataframe.to_csv(sys.argv[1][:-4] + '_m.csv')
```

## 可视化
### 1. 散点图
```
import matplotlib.pyplot as plt
fig1 = plt.figure()
# 设置图片大小
plt.figure(figsize=(15,10))
ax = fig1.add_subplot(1,1,1)
ax.scatter(x_data1,t_data1,c='g',s=15, alpha = 1,label='random 2d data1')
plt.xlim(0,1)
plt.ylim(0,1)
plt.xlabel('x')
plt.ylabel('t')
plt.legend()
plt.savefig("examples.png")  
plt.show()
```
[参考](https://www.cnblogs.com/sunshinewang/p/6853813.html)

### 2. 3D图
``` python
import util # 我自己写的 
import matplotlib.pyplot as plt 
import numpy as np 
from mpl_toolkits.mplot3d import Axes3D

NX = 33
NT = 33
c = 7.0
fig = plt.figure()
ax = Axes3D(fig)
ax.set_xlabel('T')
ax.set_ylabel('X')
ax.set_zlabel('U')
T,X = np.meshgrid(np.linspace(0,1,NT),np.linspace(0,1,NX))
u = util.get_num_solution(NX,NT,7.)
u = u.reshape(NX,NT,order='C')
surfaces = ax.plot_surface(T,X,u,rstride=1,cstride=1,cmap=plt.cm.jet)
plt.show()
```


### 3. plotly 

```python 
import os
import plotly
import plotly.graph_objs as go
import time
from shutil import copyfile

img_name = 'my-plot'
dload = os.path.expanduser('~/Downloads')
save_dir = '/tmp'

data = [go.Scatter(x=[1, 2, 3], y=[3, 2, 6])]

plotly.offline.plot(data, image_filename=img_name, image='svg')

```

### 4. plt 每次不一样的marker
```python
import numpy as np
import matplotlib.pyplot as plt
import itertools

x = np.linspace(0,2,10)
y = np.sin(x)

marker = itertools.cycle((',', '+', '.', 'o', '*')) 

fig = plt.figure()
ax = fig.add_subplot(111)

for q,p in zip(x,y):
    ax.plot(q,p, linestyle = '', marker=next(marker))

plt.show()
```
[marker 参考](https://matplotlib.org/api/markers_api.html#module-matplotlib.markers)

### 5. legend 在制定的位置
``` python
plt.legend(loc='lower right')
```
Location String | Location Code
---|---
'best'| 0
'upper right'|	1
'upper left'|	2
'lower left'|	3
'lower right'|	4
'right'	|5
'center left'|	6
'center right'|	7
'lower center'|	8
'upper center'|	9
'center'	|10

[参考](https://matplotlib.org/api/_as_gen/matplotlib.pyplot.legend.html)

### 6. jupyter中使用交互式3D绘图功能
``` python
%matplotlib notebook
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure()
ax = fig.add_subplot(111,projection = '3d')
ax.scatter(X[:,0],X[:,1],y,c=y)
ax.set_xlabel("$x_1$")
ax.set_ylabel("$x_2$")
ax.set_zlabel("$y$");
```

### 7. 使用对数坐标画图
``` python
# 1. 画实线
plt.loglog(k_list, sk)

# 2. 画散点图
plt.yscale('log')
plt.xscale('log')
plt.scatter(k_list, sk)

# 一个栗子
sk = Nmodel.calSk(k_list, a , L)
plt.title("The simulated $S(k)$ data")
plt.xlabel("$k$")
plt.ylabel("$S(k)$")
plt.yscale('log')
plt.xscale('log')
plt.scatter(k_list, sk, s=6., c='orange')
plt.savefig("simulated_sk.pdf")
plt.show()
```

## 信号

### 1. 响应键盘事件

```py
import signal

is_sigint_up = False

def sigint_handler(signum, frame):
  global is_sigint_up
  is_sigint_up = True
  print ('Interrupted!')

signal.signal(signal.SIGINT, sigint_handler)

while True:
    if is_sigint_up == True:
        break
```

### 2. 定时中断

```python
import signal

# Define signal handler function
def myHandler(signum, frame):
    print("Now, it's the time")
    exit()
    
 # register signal.SIGALRM's handler 
signal.signal(signal.SIGALRM, myHandler)
signal.alarm(5)
while True:
    print('not yet')
```

### 3. 检测哪个键被按下了
```
import keyboard  # using module keyboard
while True:  # making a loop
    try:  # used try so that if user pressed other than the given key error will not be shown
        if keyboard.is_pressed('q'):  # if key 'q' is pressed 
            print('You Pressed A Key!')
            break  # finishing the loop
        else:
            pass
    except:
        break  # if user pressed a key other than the given key the loop will break
```


## 文件操作
### 1. 创建文件夹
``` python
if os.path.exists(LAST_MODE_PATH):
    pass
else:
    os.makedirs(LAST_MODE_PATH) 
```

### 2. 判断文件/文件夹是否存在
``` python
import os
os.path.exists(test_dir)

if os.path.exists(test_dir) != True:
    os.makedirs(test_dir)
```

### 3. 得到文件的后缀
``` python
def file_extension(path):
    return os.path.splitext(path)[1][1:]
```

### 3. 得到文件夹内的文件列表
``` python
file_list = os.listdir(data_path)
file_list.sort()
```

### 4. 保存一串字符到文本
``` python 
def savetxtfile(string, filename):
text_file = open(filename, "w")
text_file.write(string)
text_file.close()
```

### 5. 获取文件的行数
```
num_lines = sum(1 for line in open('myfile.txt'))
```

### 6. 遍历规范的多层文件夹
```
import os 
data_dir = "./Pentacam/1. Raw Data"

for classType in os.listdir(data_dir):
    for patient in os.listdir(data_dir + "/" + classType):
        for file in os.listdir(data_dir + "/" + classType + "/" + patient):
            if(not file.endswith('.CSV')):
                inputfile = data_dir + "/" + classType + "/" + patient + "/" + file
                print(inputfile)
                os.remove(inputfile)
            
```

### 7. 判断文件是否是以某个后缀结尾
```
if(file.endswith('.CSV')):
    print("This file is end with .CSV.")
```

### 8. 得到修改时间最新的文件夹
``` python
import glob
# Get the latest folder name 
list_of_files = glob.glob('./wb_rec/*')
latest_file = max(list_of_files, key=os.path.getctime)
```
###  9. 获取文件路径
``` python
import os
# 当前路径
os.getcwd()
#父目录
os.path.dirname(os.getcwd())
# 
```
## Tensorflow

### 1. Tensorboard里面显示图片
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

### 2. 断点续训功能
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

### 3. 切片
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
### 4. 查看Tensorfow是否使用的是GPU版本
``` python
import tensorflow as tf
if tf.test.gpu_device_name():
    print('Default GPU Device: {}'.format(tf.test.gpu_device_name()))
else:
    print("Please install GPU version of TF")
```
若是，那么通常会输出如下的结果:

`Default GPU Device: /device:GPU:0`


### 5.在Tensorflow中添加观察项，便于观察训练结果
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

### 6. loss降不下去可能的原因
- 每次的Minibatch都随便给
- 参数不够
- 
loss一会很高一会很低 

### 7. Tensorfow GPU 版本的依赖
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

## 操作系统
### 1. python 运行系统命令
``` python 
 import os
 os.system('cat /proc/cupinfo')
```
### 2. 获取命令行参数
``` python
#!/home/jack/anaconda3/bin/python
import os 
import sys

if len(sys.argv) < 2:
    print("Ooops. Usage:" + sys.argv[0] + ' times')
    exit()

cmd = 'python solve.py'
times = int(sys.argv[1])
for i in range(times):
    os.system(cmd)
```


## 图像处理
### 1. 读取.tif格式图片
```python
>>> from PIL import Image
>>> im = Image.open('ID44_LMY_OD_3D_01_FFT16.tif')
>>> im.show()
>>> import numpy
>>> imarray = numpy.array(im)
>>> imarray.shape
(1365, 2048)
>>> im.size
(2048, 1365)
>>> imarray
array([[40, 35,  1, ..., 21, 21,  8],
       [38, 31, 23, ..., 19,  2,  8],
       [33, 29, 25, ..., 18, 31,  3],
       ..., 
       [13, 25, 10, ..., 38, 25,  4],
       [ 3, 23, 18, ..., 21, 13, 16],
       [ 7, 25, 10, ...,  5, 16, 23]], dtype=uint8)
```

### 2. 如何安装PIL？ |　How to install PIL? 
```bash
conda install -c anaconda pillow
```

###  3. 批量图片格式转换
```python
import PIL.Image as Image
import os

# train_dir = './train/'
test_dir = './test1/'

# out_train_dir = './train_converted/'
out_test_dir = './test1_converted/'

# for img in os.listdir(train_dir):
# 	im = Image.open(train_dir+img).convert('L')
# 	im.save(out_train_dir+img[:-3] + 'tif')

for img in os.listdir(test_dir):
	im = Image.open(test_dir+img).convert('L')
	im.save(out_test_dir+img[:-3] + 'tif')
```

### 4. 如何安装Opencv? | How to install OpenCV?
```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple opencv_python
```