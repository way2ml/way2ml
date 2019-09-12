---
pageClass: python-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-12 15:31:27
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-12 15:59:14
 -->

# Pandas
## 如何读取,保存CSV文件?
```python
import numpy as np 
import pandas as pd
df = pd.read_csv(PATH+FILENAME1)
df = pd.read_csv('loss.txt',sep=' ', header=None)
```

```python
import pandas as pd
df.to_csv('Record.csv')
```

## 如何创建dataframe,存储数据?
```python
col_names = ['Eps','Won','Cur','Min','Ave','Max']
df = pd.DataFrame(columns=col_names)
df.loc[len(df)] = [episode, win_flag, score, min(scores[-record_every:]),np.mean(scores[-record_every:]), max(scores[-record_every:])]
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

## 如何将某一列元素乘以一个数?
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

