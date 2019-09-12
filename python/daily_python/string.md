---
pageClass: python-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-12 15:16:34
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-12 15:17:49
 -->

# 字符串
## 1. 如何分割字符串? | How to split a string?
``` python
txt = "hello, my name is Peter, I am 26 years old"
x = txt.split(", ")
print(x)
```

## 2. 如何提取字符串中的数字? | How to extract numbers in a string?
```python
import re
s = '1x100.csv'
re.findall('\d+')
```

## 3. 如何将字符串列表按数字大小排序？| How to sort string list by number？
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

## 4. 如何选出两个字符中间的部分？｜How to select the string between two strings?
```python
>>> import re
>>> s = 'Part 1. Part 2. Part 3 then more text'
>>> re.search(r'Part 1\.(.*?)Part 3', s).group(1)
' Part 2. '
>>> re.search(r'Part 1(.*?)Part 3', s).group(1)
'. Part 2. '
```