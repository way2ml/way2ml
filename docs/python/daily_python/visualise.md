---
pageClass: python-class
---


# 可视化

<Processing/>

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

## 如何将多张图变成视频?
```python
from moviepy.editor import *
import moviepy.editor as mpe
import moviepy.audio.fx.all as afx
import os,re 
import datetime
import argparse

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


parser = argparse.ArgumentParser()
parser.add_argument('-P', '--path', help='The path.',default='./')
args = parser.parse_args()

# 获取文件列表
file_list = os.listdir(args.path)

# 排序
file_list.sort(key=natural_keys)
# print(file_list)

# 制作视频
date_ = datetime.date.today()
clips = [ImageClip(im).set_duration(0.5) for im in file_list[1:-1]]
concat_clip = concatenate_videoclips(clips, method="compose")
concat_clip.write_videofile(str(date_)+'.mp4', fps=24)
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

## 如何legend在制定的位置?
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

## 如何在matplotlib中动态地画图? 

```python
import matplotlib.pyplot as plt
import numpy as np
import time
from math import *

plt.ion() #开启interactive mode 成功的关键函数
plt.figure(1)
t = [0]
t_now = 0
m = [sin(t_now)]

for i in range(2000):
	plt.clf() #清空画布上的所有内容
    t_now = i*0.1
    t.append(t_now)#模拟数据增量流入，保存历史数据
    m.append(sin(t_now))#模拟数据增量流入，保存历史数据
    plt.plot(t,m,'-r')
    plt.draw()#注意此函数需要调用
    plt.pause(0.01)
```

参考 [链接](https://blog.csdn.net/u013468614/article/details/58689735)


## 如何可视化一个3D的ndarray?

```python
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np
import h5py

def show3d_character(img_3d, title):
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.grid(False)
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_zlabel('z')
    ax.set_xlim(0, 15)
    ax.set_ylim(0, 15)
    ax.set_zlim(0, 15)
    ax.set_title(title)
    box_size = 16
    x = []
    y = []
    z = [] 
    for i in range(box_size):
        for j in range(box_size):
            for k in range(box_size):
                if img_3d[j,i,k] > 0.1:
                    x.append(i)
                    y.append(j)
                    z.append(k)
                
    img = ax.scatter( z, x, y, c=img_3d[x,y,z],s=10, cmap=plt.hot())
    fig.colorbar(img)
    plt.show()


dataset = h5py.File('./input/full_dataset_vectors.h5', 'r')

x_test = dataset["X_test"][:]
y_test = dataset["y_test"][:]

for index in range(10,40):
    img_3d = np.reshape(x_test[index],(16,16,16))
    img_3d_label = y_test[index]
    show3d_character(img_3d, str(img_3d_label) + ' in 3D')
```

## 如何画一个过山车的跑道?

```python
import numpy as np
import matplotlib.pyplot as plt
import os 

save_path = './img/'
if not os.path.exists(save_path): 
    os.mkdir(save_path)

plt.xlabel('x') 
plt.title('Mountain Car Track')
plt.xlim(-1.2,0.6)
plt.ylim(0,1.2)
x = np.linspace(-1.2,0.6,100)
plt.plot(x,np.sin(3*x)*.45+.55,'k-',lw=2,label='height(x)=0.45sin(3x) + 0.55')
plt.legend(loc='upper left')
plt.savefig(os.path.join(save_path,'MountainCarTrack'))
plt.show()
```

## 如何生成，可视化一个二维的矩阵?

```python
import numpy as np 
import matplotlib.pyplot as plt 
import matplotlib.cm as cm 

def main():
    x_min =  -1.2
    x_max = 1.2
    y_min = -0.2 
    y_max = 1.2

    n = 100

    x = np.linspace(x_min,x_max,n)
    y = np.linspace(y_min,y_max,n)


    X,Y = np.meshgrid( x , y )

    # print(xv.shape,yv.shape)

    Z = (1 - X**2 - Y**2)**2 +(Y**2)/(X**2 + Y**2)

    plt.title('$V(x,y) = (1-x^2-y^2)^2 + y^2/(x^2+y^2)$')
    plt.xlabel('$x$')
    plt.ylabel('$y$')
    C = plt.contour(X, Y, Z, 25, colors='green')
    plt.savefig('./potential_surface.png')
    plt.show()

if __name__ == '__main__':
    main()
```

```python
import numpy as np
from matplotlib import pyplot as plt
import matplotlib.cm as cm

n = 256
x = np.linspace(-3., 3., n)
y = np.linspace(-3., 3., n)
X, Y = np.meshgrid(x, y)
Z = X * np.sinc(X ** 2 + Y ** 2)
plt.pcolormesh(X, Y, Z, cmap = cm.gray)
plt.show()
```

参考: 《Matplotlib Plotting Cookbook》

## 如何选择合适的颜色?
[<p align='center'>
<img src='https://matplotlib.org/3.1.0/_images/sphx_glr_named_colors_003.png' width='50%'>
</p>](https://matplotlib.org/3.1.0/_images/sphx_glr_named_colors_003.png)


[一个优雅的网站](https://www.webdesignrankings.com/resources/lolcolors/)

[随便选都好看](https://color.adobe.com/create)

## 如何选择互补色?
色环中相对的颜色即为补色

<p align='center'>
<img src='/images/python/daily_python/visualize/fanse.png' width='30%'>
</p>

[维基百科:互补色](https://zh.wikipedia.org/wiki/%E4%BA%92%E8%A3%9C%E8%89%B2)

## 如何使得y坐标反向? 
```python
plt.gca().invert_yaxis()
```

## 如何画一个点? 
```python
plt.plot([1], [1], marker='o', markersize=3, color="red")
```
或者
```python
plt.plot(1, 1, marker='o', markersize=3, color="red")
```

## 如何使波动较大的图变得平滑?
使用Moving Averages
```python
import argparse
import matplotlib.pyplot as plt 
import pandas as pd 
import textwrap

parser = argparse.ArgumentParser(
        prog='ProgramName',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent('''\
        Example:
         python Jplot.py -F Easy_V_Training_Log.csv
        '''))

parser.add_argument('-F','--file', help='The csv file to plot.')
args = parser.parse_args()


df = pd.read_csv(args.file)

df['Moving Ave Actor(D)'] = df.iloc[:,2].rolling(window=50).mean()

col_name = df.columns
print(col_name)

plt.figure(figsize=[15,10])
plt.grid(True)
plt.title('Return Changes')
plt.xlabel('episode')
plt.ylabel('return')
plt.plot(df['Episode'], df['Actor(D)'], label='Actor(D)',color='lightgrey')
plt.plot(df['Episode'], df['Moving Ave Actor(D)'],label='Moving Ave Actor(D)')
plt.plot(df['Episode'], df['Expert Mean(D)'], label='Expert Mean(D)')
plt.legend()

imName = args.file.split('.')[0] + '.png'
plt.savefig(imName)
```

<p align='center'>
<img src='/images/python/daily_python/visualize/moving_ave.png'>
</p>

参考:
[Moving Averages in pandas](https://www.datacamp.com/community/tutorials/moving-averages-in-pandas)

## 如何将鼠标事件加入到图片中?
**在Python脚本中:**
```python
import matplotlib.pyplot as plt

# Need to create as global variable so our callback(on_plot_hover) can access
fig = plt.figure()
plot = fig.add_subplot(111)

# create some curves
for i in range(4):
    # Giving unique ids to each data member
    plot.plot(
        [i*1,i*2,i*3,i*4],
        gid=i)

def mouse_move(event):
    x, y = event.xdata, event.ydata
    print(x, y)

fig.canvas.mpl_connect('motion_notify_event', mouse_move)           
plt.show()
```

**在Jupyter Notebook中:**
```python
%matplotlib notebook
import numpy as np
import matplotlib.pyplot as plt

fig = plt.figure()
ax = fig.add_subplot(111)

# create some curves
for i in range(4):
    ax.plot(
        [i*1,i*2,i*3,i*4],
        gid=i)

text=ax.text(0,0,'')

def mouse_move(event):
    x, y = event.xdata, event.ydata
    text.set_text('x:{0:.4f}'.format(x) + ' ' + 'y:{0:.4f}'.format(y))

fig.canvas.mpl_connect('motion_notify_event', mouse_move)           
plt.show()
```



**参考**:

[Get mouse coordinates without clicking in matplotlib](https://stackoverflow.com/questions/51349959/get-mouse-coordinates-without-clicking-in-matplotlib)<br/>
[Possible to make labels appear when hovering over a point in matplotlib?](https://stackoverflow.com/questions/7908636/possible-to-make-labels-appear-when-hovering-over-a-point-in-matplotlib)<br/>
[canvas.mpl_connect in jupyter notebook](https://stackoverflow.com/questions/43923313/canvas-mpl-connect-in-jupyter-notebook)


## 如何画直方图?
```python
import numpy as np
import matplotlib.pyplot as plt

# Fixing random state for reproducibility
np.random.seed(19680801)

mu, sigma = 100, 15
x = mu + sigma * np.random.randn(10000)

# the histogram of the data
n, bins, patches = plt.hist(x, 50, density=True, facecolor='g', alpha=0.75)


plt.xlabel('Smarts')
plt.ylabel('Probability')
plt.title('Histogram of IQ')
plt.text(60, .025, r'$\mu=100,\ \sigma=15$')
plt.xlim(40, 160)
plt.ylim(0, 0.03)
plt.grid(True)
plt.show()
```
<p align='center'>
<img src='https://matplotlib.org/3.1.1/_images/sphx_glr_pyplot_text_001.png'>
</p>

[参考:Pyplot Text](https://matplotlib.org/3.1.1/gallery/pyplots/pyplot_text.html#sphx-glr-gallery-pyplots-pyplot-text-py)

## 如何在背景中添加网格?
```python
plt.grid()
```


## 如何画虚线?
```python
import numpy as np
import matplotlib.pyplot as plt


x = np.linspace(0, 10, 500)
dashes = [10, 5, 100, 5]  # 10 points on, 5 off, 100 on, 5 off

fig, ax = plt.subplots()
line1, = ax.plot(x, np.sin(x), '--', linewidth=2,
                 label='Dashes set retroactively')
line1.set_dashes(dashes)

line2, = ax.plot(x, -1 * np.sin(x), dashes=[30, 5, 10, 5],
                 label='Dashes set proactively')

ax.legend(loc='lower right')
plt.show()
```

<p align='center'>
<img src='https://matplotlib.org/2.1.1/_images/sphx_glr_line_demo_dash_control_001.png'>
</p>


```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 500)
y = np.sin(x)

fig, ax = plt.subplots()

# Using set_dashes() to modify dashing of an existing line
line1, = ax.plot(x, y, label='Using set_dashes()')
line1.set_dashes([2, 2, 10, 2])  # 2pt line, 2pt break, 10pt line, 2pt break

# Using plot(..., dashes=...) to set the dashing when creating a line
line2, = ax.plot(x, y - 0.2, dashes=[6, 2], label='Using the dashes parameter')

ax.legend()
plt.show()
```
<p align='center'>
<img src='https://matplotlib.org/3.1.1/_images/sphx_glr_line_demo_dash_control_001.png'>
</p>


[A simple plot with a custom dashed line](https://matplotlib.org/2.1.1/gallery/lines_bars_and_markers/line_demo_dash_control.html)<br/>
[Customizing dashed line styles](https://matplotlib.org/3.1.1/gallery/lines_bars_and_markers/line_demo_dash_control.html)<br>


## 如何画一个势能面?
```python
import numpy as np 
import matplotlib.pyplot as plt 
import matplotlib.cm as cm 

def main():
    x_min =  -1.2
    x_max = 1.2
    y_min = -0.2 
    y_max = 1.2

    offset = 0.07
    n = 100

    x = np.linspace(x_min,x_max,n)
    y = np.linspace(y_min,y_max,n)


    X,Y = np.meshgrid( x , y )

    # print(xv.shape,yv.shape)

    Z = (1 - X**2 - Y**2)**2 +(Y**2)/(X**2 + Y**2)
    
    # Draw y coordinate inverse
    plt.gca().invert_yaxis()
    # plt.title('$V(x,y) = (1-x^2-y^2)^2 + y^2/(x^2+y^2)$')
    plt.xlabel('$x$')
    plt.ylabel('$y$')
    C = plt.contour(X, Y, Z, 25, colors='green')
    plt.scatter(-1,0,marker='x',color='tomato')
    plt.annotate('A=(-1,0)',(-1-offset,0-offset))
    plt.scatter(1,0,marker='x',color='tomato')
    plt.annotate('B=(1,0)',(1-offset,0-offset))
    plt.savefig('./data/potential_surface_ry.png')
    plt.show()

if __name__ == '__main__':
    main()
```

<p align='center'>
<img src='/images/python/daily_python/visualize/potential_surface_ry.png'>
</p>


## 如何解决使用了plt.show()却不显示图片的问题?
修改`matplotlibrc`文件. 

首先通过下面的方法找到它的位置:
```python
>>> import matplotlib
>>> matplotlib.matplotlib_fname()
```

然后改变里面的backend选项，可选项有:
```python
['GTK', 'GTKAgg', 'GTKCairo', 'FltkAgg', 'MacOSX', 'QtAgg', 'Qt4Agg',
'TkAgg', 'WX', 'WXAgg', 'CocoaAgg', 'agg', 'cairo', 'emf', 'gdk', 'pdf',
'ps', 'svg', 'template']
```
然后一个个尝试，直到找到你可以用的.

[Stack Overflow:matplotlib does not show my drawings although I call pyplot.show()](https://stackoverflow.com/questions/7534453/matplotlib-does-not-show-my-drawings-although-i-call-pyplot-show)

## 如何画子图?

```python
import numpy as np
import matplotlib.pyplot as plt

x1 = np.linspace(0.0, 5.0)
x2 = np.linspace(0.0, 2.0)

y1 = np.cos(2 * np.pi * x1) * np.exp(-x1)
y2 = np.cos(2 * np.pi * x2)

plt.subplot(2, 1, 1)
plt.plot(x1, y1, 'o-')
plt.title('A tale of 2 subplots')
plt.ylabel('Damped oscillation')

plt.subplot(2, 1, 2)
plt.plot(x2, y2, '.-')
plt.xlabel('time (s)')
plt.ylabel('Undamped')

plt.show()
```

<p align='center'>
<img src='https://matplotlib.org/3.1.1/_images/sphx_glr_subplot_001.png'>
</p>

[Multiple subplots](https://matplotlib.org/3.1.1/gallery/subplots_axes_and_figures/subplot.html#sphx-glr-gallery-subplots-axes-and-figures-subplot-py)


## 如何去掉/自定义坐标tick上的字符
```python
import numpy as np 
import matplotlib.pyplot as plt
import string 

# Three different distributions
distro_1 = np.array([0, 0, 0, 0, 1])
distro_2 = np.array([0.1, 0.25, 0.3, 0.25, 0.1])
distro_3 = np.full((5), 1/5)

distros = [distro_1,distro_2,distro_3]
colors = ['#9DC8C8', '#58C9B9', '#519D9E', '#D1B6E1']
num_distro = len(distros)

nums = [-2,-1,0,1,2]
point_labels = ['', '-10','-5','0','5','10']
empty_labels = ['', '', '', '', '', '']

plt.xkcd()

fig, axs = plt.subplots(3,1,figsize=(8,6))
axs = axs.flat

for i, ax in enumerate(axs):
    ax.bar(nums, distros[i], color=colors[i])
    ax.text(0.96, 0.80, string.ascii_uppercase[i], transform=ax.transAxes)   
    if i == 0:
        ax.set_title('Three diffrent distributions of a random variable X')
    
    if i == 2:
        ax.set_xlabel('Rating obtained')
    ax.set_ylabel('Probability')

    if i < 2:
        ax.set_xticklabels(empty_labels)
    else:
        ax.set_xticklabels(point_labels)

    if i == 0:
        H = (0 + 1*np.log2(distros[i][-1]))
    else:
        H = -1*np.sum(distros[i] * np.log2(distros[i]))
    ax.text(0.05, 0.70, 'H(X) = {:.2f} bits'.format(H), transform=ax.transAxes)   
plt.savefig('./02_entropy.png')
plt.show()
```

<Cimg src='https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/02_entropy.png'/>

<Livere/>
