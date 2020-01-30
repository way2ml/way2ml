---
pageClass: python-class
---

# 时间

## 获得日期

## 定时器功能
有时候我们会设计过了多久就做什么的操作，因此我们可以这样做。
```python
import time 

start_time = time.time()

for i in range(200):
    time.sleep(1)
    print('Hi, Jack.')
    if time.time() - start_time > 5:
        # Do something you like
        print('5s passed, I\'m gonna leave.')
        break

```
一个简单的计时功能便完成啦。
