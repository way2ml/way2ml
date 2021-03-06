---
pageClass: python-class
---


# 字符串
## 如何分割字符串? | How to split a string?
``` python
txt = "hello, my name is Peter, I am 26 years old"
x = txt.split(", ")
print(x)
```

## 如何提取字符串中的数字? | How to extract numbers in a string?
```python
import re
s = '1x100.csv'
re.findall('\d+',s)
```

## 如何将字符串列表按数字大小排序？| How to sort string list by number？
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

## 如何选出两个字符中间的部分？｜How to select the string between two strings?
```python
>>> import re
>>> s = 'Part 1. Part 2. Part 3 then more text'
>>> re.search(r'Part 1\.(.*?)Part 3', s).group(1)
' Part 2. '
>>> re.search(r'Part 1(.*?)Part 3', s).group(1)
'. Part 2. '
```

## 如何控制浮点数的输出格式? | How to control the output format of a float number?
``` python
"{0:.2f}".format(13.949999999999999)
```

## 如何得到现在的时间？
```python
import time

def timeString():
    return time.strftime("%Y%m%d-%H%M%S")
```

调用上面的函数 `timeString()` 可以得到:
```bash
20201222-162651
```

这个简单的操作可以方便你对生成的文件命名，而不会覆盖掉原来的文件。

```python
fileName = 'Hello_{}.jpg'.format(timeString())
```

```python
In [4]: fileName = 'Hello_{}.jpg'.format(timeString())

In [5]: fileName
Out[5]: 'Hello_20201222-163104.jpg'

In [6]: fileName = 'Hello_{}.jpg'.format(timeString())

In [7]: fileName
Out[7]: 'Hello_20201222-163115.jpg'
```

是不是挺酷的。

