---
pageClass: python-class
---



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
```python
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

## 如何将Dataframe数据转换成Numpy数据?

```python
    df = pd.read_csv('./expert_demo.csv')
    ex_x = df.to_numpy()[:,0]
    ex_y = df.to_numpy()[:,1]
    plt.plot(ex_x,ex_y,color='blue')
```

## 如何选择一列? 
```python
import pandas as pd 
data = pd.read_csv('xxxxx.csv',sep=' ', header=None)
print(data.columns) # 从中选择一个label
AgeCol= data["Age"] 
```

参考: [Indexing and Selecting Data with Pandas](https://www.geeksforgeeks.org/indexing-and-selecting-data-with-pandas/)

## 如何创建一个空的Dataframe?
```python
import pandas as pd
newDF = pd.DataFrame()
```

## 如何动态地创建Dataframe?
```python
# Create an empty dataframe to save all position (x,y)
df = pd.DataFrame()
for episode in range(max_episode):
	# Create empity cols dynamically
	df['tao_'+str(episode) +'_x'] = ''
	df['tao_'+str(episode) +'_y'] = ''
	for step in range(max_steps):
		x, y = obs[0][0],obs[0][1]
		# Add row element dynamically 
		df.loc[step+1, 'tao_'+str(episode) +'_x'] = x
        df.loc[step+1, 'tao_'+str(episode) +'_y'] = y 
df.to_csv('traj.csv')
```

<Livere/>