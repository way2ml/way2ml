---
pageClass: python-class
---
# 记录挑战成功数据
在游戏Steady Hand的挑战中，当挑战者成功后我们记录下挑战所用的时间和挑战成功的时刻。这里主要涉及到了两个要点: 时间的记录和文件的写入。首先我们来尝试记录挑战时间。编写程序`learn_time.py`,内容如下:
```python
# -*- coding: utf-8 -*-
import time
start_time = time.time()

# 下面一段用来模拟玩游戏的过程，消耗一定的时间
#####################################
for i in range(5):
    time.sleep(1.2)
    print('Come on, you can do it.')
#####################################
end_time = time.ctime()
time_consume = time.time() - start_time
print('Time you spent: ' + str(time_consume) +'s.')
print('You complete the challenge at ' + end_time)
```
上面一段代码的运行结果如下:
```bash
Come on, you can do it.
Come on, you can do it.
Come on, you can do it.
Come on, you can do it.
Come on, you can do it.
Time you spent: 6.00714087486s.
You complete the challenge at Mon Mar 25 21:29:14 2019
```
在上面的代码中:
- `time_consume`记录下了游戏过程消耗的时间。`time.time()`记录的是从开始计时的时刻(Linux下是1970年1月1号)到运行`time.time()`过的秒数。我们在游戏开始的时候记录下这个秒数`start_time`, 在挑战成功后再次记录一个秒数`time.time()`, 两者作差，即可得到挑战所用的时间。
- `time.ctime()`记录的是一个包含年，月，日，时，分，秒，周的时间数据，可以用来记录挑战者挑战成功的时刻。

接下来我们将需要的两个数据`time_consume`和`end_time`写入到文件里面，作为挑战成功的记录。
在上面的基础上我们添加最后3行代码，保存为`save_record.py`, 内容如下:
```python
# -*- coding: utf-8 -*-
import time
start_time = time.time()

# 下面一段用来模拟玩游戏的过程，消耗一定的时间
#####################################
for i in range(5):
    time.sleep(1.2)
    print('Come on, you can do it.')
#####################################
end_time = time.ctime()
time_consume = time.time() - start_time
print('Time you spent: ' + str(time_consume) +'s.')
print('You complete the challenge at ' + end_time)

f = open('record.csv','a')
f.write(str(time_consume) + ' , ' + end_time + '\n')
f.close()
```
在上面的语句中:
- `f = open('record.csv','a')`以追加(append)的方式打开一个文件`record.csv`。如果没有这个文件则创建这个文件。使用`'a'`的原因是我们希望新的记录不会覆盖掉原来的记录。
- `f.write(str(time_consume) + ' , ' + end_time + '\n')` 将数据写入到文件。其中由于`time_consume`的类型不是字符串, 因此我们使用`str(time_consume)`来将数字转换为字符串以写入文件。`end_time`由于它的值本身就是字符串，因此不需要做转换的操作。在两组数据中间，我们添加`' , '`用来分割两部分数据。在最后添加一个换行符使得每条记录独占一行。

多运行几次`save_record.py`，观察`record.csv`内容的变化(使用`cat record.csv`命令)，是否符合你的预期。

在这一节中，我们可以了解到:
- 记录时间的方法
- 将数据写入(追加)到文件的方法

<Livere/>