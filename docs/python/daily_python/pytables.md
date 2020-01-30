---
pageClass: python-class
---


# PyTables 
## 如何导入Pytables？
```
import tables as tb
```

## 如何存/取数据？
``` python
# 生成数组，比如一个2D numpy 数组如下
arr = np.random.normal(0, 1.0, (1000,3000))
#打开一个HDF5文件（后面要记得关闭这个文件）,模式为"w"，意思是写
f = tb.open_file("array.hdf5", mode="w")

# 利用creat_array()方法创建一个数组于文件array.hdf5中.
a = f.create_array('/','arr',arr)

# 初始化一个表达式（对数组arr的操作）;  估算
expr = tb.Expr("2*arr")
expr.eval()

# 打印结果： 比如，打印出这个数组所有元素之和
print("Sum of arr:", sum(expr))

# 关闭HDF5文件 （它相当于一个文件的路径）
f.close()
```

<Livere/>