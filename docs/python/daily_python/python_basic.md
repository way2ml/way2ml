---
pageClass: python-class
---


# 基操
## 如何对列表切片 ? | How to slice a list ?
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
## 如何遍历文件列表 ？ | How to loop a file list ?
### 法1
``` python
for f in file_list:
    print(f)
```

### 法2
``` python
for i in range(len(file_list)):
    print(i,file_list[i])

```

## 如何使用迭代器?
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
## 如何控制浮点数的输出格式? | How to control the output format of a float number?
``` python
"{0:.2f}".format(13.949999999999999)
```

## 如何筛选一个列表中的特定元素？| How to select specific element in a list?
``` python
a = [1,2,2,3,4,5]
a = list(filter(lambda x: x!= 2, a))
```
结果是`[1,3,4,5]`

## 如何对列表求和?
``` python
li = [1,2,3]
sum(li)
```

## 如何对两列表同时遍历?
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

## 如何创建固定大小的空的列表?
长度为10的空列表
```python
l = [None] * 10
```

## 如何运行系统命令?
``` python 
 import os
 os.system('cat /proc/cupinfo')
```
## 如何获取命令行参数?
### 最简单的例子
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

### 使用argparse传入数字
```python
import argparse
parser = argparse.ArgumentParser()
parser.add_argument('-N', nargs='?', const=-1, type=int, default=-1, \
                    help="choose the num(th) checkpoint to restore.")
args = parser.parse_args()
print(args.N)
```

[参考](https://stackoverflow.com/questions/15301147/python-argparse-default-value-or-specified-value)

### 使用argparse传入字符
编辑python程序`hello.py`
```python
import argparse
parser = argparse.ArgumentParser()

parser.add_argument('--path', help='The path.',default='./default_path/')
args = parser.parse_args()


print(args.path, type(args.path))
```
保存后，在命令行中输入:
```bash
python hello.py --path './hello/'
```
输出结果为:
```python
./hello/ <class 'str'>
```
也就是说命令行的字符串参数顺利地传到了程序内部。

### 使用argparse传入boolean参数
编辑程序`hello.py`

```python
import argparse
parser = argparse.ArgumentParser()
parser.add_argument('--stochastic', dest='stochastic', action='store_true')
parser.add_argument('--no-stochastic', dest='stochastic', action='store_false')
parser.set_defaults(stochastic=True)
args = parser.parse_args()
print(args.stochastic)
```

使用:
```bash
python hello.py --stochastic
```
输出为`True`

使用:
```
python hello.py --no-stochastic
```
输出为`False`

非常方便

### 在-h信息中添加额外的信息?
```python
import argparse
import textwrap
# 在这里添加了详细的使用说明
parser = argparse.ArgumentParser(
        prog='ProgramName',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent('''\
        Example:
         python 05_gail.py --episodes 36000 --mpath \'./model36000/\' --lpath \'./trainingLog36000/\'
        '''))
    
parser.add_argument('-E', '--episodes', nargs='?', const=24000, type=int, default=24000, \
                help='The maximum number of episode.')
parser.add_argument('-M', '--mpath', help='Path to save model.', default='./model/')
parser.add_argument('-L', '--lpath', help='Path to save log.', default='./trainingLog/')
args = parser.parse_args()
print(args.mpath, args.lpath,args.episodes)
```
在运行命令时加入命令行参数`-h`就可以看到:
```bash
usage: ProgramName [-h] [-E [EPISODES]] [-M MPATH] [-L LPATH]

optional arguments:
  -h, --help            show this help message and exit
  -E [EPISODES], --episodes [EPISODES]
                        The maximum number of episode.
  -M MPATH, --mpath MPATH
                        Path to save model.
  -L LPATH, --lpath LPATH
                        Path to save log.

Example:
 python 05_gail.py --episodes 36000 --mpath './model36000/' --lpath './trainingLog36000/'

```
[参考:Stackoverflow](https://stackoverflow.com/questions/50021282/python-argparse-how-can-i-add-text-to-the-default-help-message/50021771)

## Python首行注释是什么? 
```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*- 
```

传说第一句会帮你自动找到对应的Python解释器，特别是你有多个Python解释器(系统自带的Python或者Anaconda里的Python);

第二句在有中文或者其他特殊字符的时候可以避免报错, 很有用。


## Python可变参数(Variable Argument)怎么使用? 
转载自:[团子的小窝](http://kodango.com/): [理解 Python 中的 *args 和 **kwargs](http://kodango.com/variable-arguments-in-python)

Python是支持可变参数的，最简单的方法莫过于使用默认参数，例如：
```python
def test_defargs(one, two = 2):
   print ('Required argument: ', one)
   print ('Optional argument: ', two)

test_defargs(1)
# result:
# Required argument: 1
# Optional argument: 2

test_defargs(1, 3)
# result:
# Required argument: 1
# Optional argument: 3
```

当然，本文章的主题并不是讲默认参数，而是另外一种达到可变参数 (Variable Argument) 的方法：使用*args和 \*\*kwargs语法。其中，\*args是可变的positional arguments列表，\*\*kwargs是可变的keyword arguments列表。并且，\*args必须位于\*\*kwargs之前，因为positional arguments必须位于keyword arguments之前:

下面一个例子使用*args，同时包含一个必须的参数：
```python
def test_args(first, *args):
    print('Required argument: ', first)
    for v in args:
        print('Optional argument: ',v)
test_args(1,2,3,4)

# result:
# Required argument: 1
# Optional argument:  2
# Optional argument:  3
# Optional argument:  4
```

下面一个例子使用*kwargs, 同时包含一个必须的参数和*args列表：
```python
def test_kwargs(first, *args, **kwargs):
    print('Required argument: ', first)
    for v in args:
        print('Optional argument: ', v)
    for k, v in kwargs.items():
        print('Optional argument %s (*kwargs): %s' %(k,v))
test_kwargs(1,2,3,4,k1=5,k2=6)

# results:
# Required argument:  1
# Optional argument (*args):  2
# Optional argument (*args):  3
# Optional argument (*args):  4
# Optional argument k2 (*kwargs): 6
# Optional argument k1 (*kwargs): 5
```

\*args和\*\*kwargs语法不仅可以在函数定义中使用，同样可以在函数调用的时候使用。不同的是，如果说在函数定义的位置使用\*args和\*\*kwargs是一个将参数pack的过程，那么在函数调用的时候就是一个将参数unpack的过程了。下面使用一个例子来加深理解：

```python
# 同样可以在函数调用使用
def test_args(first, second, third, fourth, fifth):
    print ('First argument: ', first)
    print ('Second argument: ', second)
    print ('Third argument: ', third)
    print ('Fourth argument: ', fourth)
    print ('Fifth argument: ', fifth)

args = [1,2,3,4,5]
test_args(*args)

# results:
# First argument:  1
# Second argument:  2
# Third argument:  3
# Fourth argument:  4
# Fifth argument:  5

# Use **kwargs
kwargs = {
    'first': 1,
    'second': 2,
    'third': 3,
    'fourth': 4,
    'fifth': 5
}
test_args(**kwargs)

# results:
# First argument:  1
# Second argument:  2
# Third argument:  3
# Fourth argument:  4
# Fifth argument:  5
```

使用*args和**kwargs可以非常方便的定义函数，同时可以加强扩展性，以便日后的代码维护。


## 如何使用Python里面的装饰器?
程序来自[黄浩杰](https://www.youtube.com/user/tpof314)的[Python小技巧：装饰器(Decorator)](https://youtu.be/QqRvteWBSWg)。
感谢他的视频，讲得非常棒。

```python
import time 

# # Part 2:
# def display_time(func):
#     def wrapper():
#         t1 = time.time()
#         func()
#         t2 = time.time()
#         print(t2 - t1)
#     return wrapper

# # Part 4:
# # 处理有返回值的情况
# # 在wrapper里面得到function的返回值
# def display_time(func):
#     def wrapper():
#         t1 = time.time()
#         result = func()
#         t2 = time.time()
#         print("Total time: {:.4} s".format(t2 - t1))
#         return result
#     return wrapper

# Part 5:
# 处理有函数有参数的情况
# 在wrapper里面加参数 *args:
# 表示可变参数原本有多少参数就传递多少个参数进去
def display_time(func):
    def wrapper(*args):
        t1 = time.time()
        result = func(*args)
        t2 = time.time()
        print("Total time: {:.4} s".format(t2 - t1))
        return result
    return wrapper

# Part 0:
def is_prime(num):
    if num < 2:
        return False
    elif num == 2:
        return True
    else:
        for i in range(2,num):
            if num % i == 0:
                return False
            return True

# # Part 1:
# # 有计时的部分，同时也有逻辑的部分
# # 可读性差，为了使得两个功能分离，我们就要用到装饰器
# def prime_nums():
#     t1 = time.time()
#     for i in range(2,10000):
#         if is_prime(i):
#             print(i)
#     t2 = time.time()
#     print(t2 - t1)

# # Part 3:
# # 1. 去掉原来计时的部分
# # 2. 然后使用@为函数prime_nums加上装饰器display_time
# # 这样运行函数prime_nums的时候其实就是运行的装饰器
# @display_time
# def prime_nums():
#     for i in range(2,10000):
#         if is_prime(i):
#             print(i)


# # Part ４:
# # 处理函数有返回值的情况
# @display_time
# def count_prime_nums():
#     count = 0 
#     for i in range(2,10000):
#         if is_prime(i):
#             count = count + 1
#     return count

# Part 5:
# 处理函数有参数的情况
@display_time
def count_prime_nums(maxnum):
    count = 0 
    for i in range(2,maxnum):
        if is_prime(i):
            count = count + 1
    return count

count = count_prime_nums(5000)
print(count)
```
::: tip 理解
装饰器就是一个更方便的函数。
:::