---
pageClass: python-class
---
<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-12 14:55:54
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-12 16:04:00
 -->

# 可视化

## 如何连接多个视频?
```python
# 得到列表
import glob
videos = glob.glob("./*.mp4")
videos.sort()
print(videos)
# print()
from moviepy.editor import *
import moviepy.editor as mpe

clips = [VideoFileClip(video) for video in videos]
concat_clip = concatenate_videoclips(clips, method="compose")
concat_clip.write_videofile('output.mp4')
```


## 如何读取.tif格式图片?
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

## 如何安装PIL？ |　How to install PIL? 
```bash
conda install -c anaconda pillow
```

## 如何批量图片格式转换?
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

## 如何安装Opencv? | How to install OpenCV?
```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple opencv_python
```

## 如何作散点图？
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

## 如何作3D图？
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


## 如何用plotly作图?  
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

## 如何每次有不一样的marker?
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

##　如何legend在制定的位置?
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

## 如何在jupyter中使用交互式3D绘图功能?
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

## 如何使用对数坐标画图?
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

## 如何可视化dataframe的数据?
```python
def plot_record(file_path):
	df = pd.read_csv(file_path)
	ax = plt.gca()
	df.plot(kind='line',x='Eps',y='Min',ax=ax)
	df.plot(kind='line',x='Eps',y='Cur',ax=ax)
	df.plot(kind='line',x='Eps',y='Ave',ax=ax)
	df.plot(kind='line',x='Eps',y='Max',ax=ax)
	plt.savefig('plot.png')
	plt.show()
```