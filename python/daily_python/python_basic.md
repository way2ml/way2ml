---
pageClass: python-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-12 15:08:24
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-12 15:47:20
 -->

# 基操
## 1. 如何对列表切片 ? | How to slice a list ?
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
## 2. 如何遍历文件列表 ？ | How to loop a file list ?
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

## 3. 如何使用迭代器?
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
## 4. 如何控制浮点数的输出格式? | How to control the output format of a float number?
``` python
"{0:.2f}".format(13.949999999999999)
```

## 5. 如何筛选一个列表中的特定元素？| How to select specific element in a list?
``` python
a = [1,2,2,3,4,5]
a = list(filter(lambda x: x!= 2, a))
```
结果是`[1,3,4,5]`

## 6. 如何对列表求和?
``` python
li = [1,2,3]
sum(li)
```

## 7. 如何对两列表同时遍历?
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

## python 运行系统命令
``` python 
 import os
 os.system('cat /proc/cupinfo')
```
## 获取命令行参数
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