---
pageClass: python-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-12 15:20:27
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-10-24 10:39:06
 -->
# 数据处理

## 如何生成0到1之间的随机数？ | How to generate random numbers between 0 and 1?

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

## 如何生成1到20之间的列表？| How to generate a number list from 1 to 20？ 
```python
>> a=[x for x in range(1,20)]
>> a
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
```

## 如何从一个列表中随机选取一个元素？｜How to random select a number from a list?
``` python
import random
num_layers = random.sample(layers_option, 1)[0]
```

## 如何将一列数和矩阵相互转换?
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

## 如何将一个数字转换成科学计数的格式?
``` python
from decimal import Decimal

def format_e(n):
    a = '%E' % n
    return a.split('E')[0].rstrip('0').rstrip('.') + 'E' + a.split('E')[1]
```

## 如何以同样的顺序交换两个列表?
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

## 如何保存和恢复一个列表? | How to save and restore a list ?
```python
import pickle
with open('list.data', 'wb') as filehandle:
    # store the data as binary data stream
    pickle.dump(Train_list, filehandle)

with open('list.data', 'rb') as filehandle:  
    # read the data as binary data stream
    placesList = pickle.load(filehandle)
```

## 如何获取一个列表中特定元素的index? 
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

## 如何将list of list 变成　list?
```python
d = [[180.0], [173.8], [164.2], [156.5], [147.2], [138.2,12]]
elite_states = sum(d,[])
[180.0, 173.8, 164.2, 156.5, 147.2, 138.2, 12]
```

## 如何统计一个列表中的元素出现的次数？
```python
a = [1, 2, 3, 1, 1, 2]
dict = {}
for key in a:
    dict[key] = dict.get(key, 0) + 1
print(dict)
# >>>{1: 3, 2: 2, 3: 1}
```

## 如何使用固定长度的list？
```python
from collections import deque
replay_size = 2000
replay_queue = deque(maxlen=replay_size)
replay_queue.append((state, action, reward, next_state, done))
if len(replay_queue) < replay_size:
			return None
```


## 如何添加一个logger追踪训练过程的参数变化?

```python
import pandas as pd 
import os 
import matplotlib.pyplot as plt 

class logger:
    def __init__(self, logger_name, logger_path, col_names, restore=False):
        self.logger_name = logger_name
        if not os.path.exists(logger_path):
            os.makedirs(logger_path)
        self.logger_path = logger_path
        self.col_names = col_names
        self.save_path = os.path.join(self.logger_path, self.logger_name + '.csv')
        if restore:
            self.dataLogs = self.load()
        else:
            self.dataLogs = pd.DataFrame(columns=col_names) 

    def add_row_data(self, one_row, saveFlag=False):
        last_index = len(self.dataLogs)
        self.dataLogs.loc[last_index] = one_row
        if saveFlag:
            self.save()

    def save(self):
        self.dataLogs.to_csv(self.save_path)

    def load(self):
        dataLogs_Saved = pd.read_csv(self.save_path)
        return dataLogs_Saved

    def plotToFile(self, title, showFlag = False):
        plt.clf()
        plt.title(title)
        ax = plt.gca()
        self.dataLogs.plot(kind='line', x = self.col_names[0], y=self.col_names[1], ax=ax)
        self.dataLogs.plot(kind='line', x = self.col_names[0], y=self.col_names[2], ax=ax)
        self.dataLogs.plot(kind='line', x = self.col_names[0], y=self.col_names[3], ax=ax)
        self.dataLogs.plot(kind='line', x = self.col_names[0], y=self.col_names[4], ax=ax)
        plt.savefig(os.path.join(self.logger_path, self.logger_name + '.png'))
        if showFlag:
            plt.show()

    def close(self):
        self.save()
```

## 如何取整? 
向下取整:
```python
>>> a = 3.75
>>> int(a)
3
```

四舍五入:
```
>>> round(3.25); round(4.85)
3.0
5.0
```

向上取整:
```python
>>> import math
>>> math.ceil(3.25)
4.0
>>> math.ceil(3.75)
4.0
>>> math.ceil(4.85)
5.0
```

分别取小数部分和整数部分:
```python
>>> import math
>>> math.modf(3.25)
(0.25, 3.0)
>>> math.modf(3.75)
(0.75, 3.0)
>>> math.modf(4.2)
(0.20000000000000018, 4.0)
```
[Python 几种取整的方法](http://kuanghy.github.io/2016/09/07/python-trunc)