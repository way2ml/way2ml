---
pageClass: python-class
---

# 文件操作
## 1. 如何创建文件夹?
``` python
if os.path.exists(LAST_MODE_PATH):
    pass
else:
    os.makedirs(LAST_MODE_PATH) 
```

## 2. 如何判断文件/文件夹是否存在?
``` python
import os
os.path.exists(test_dir)

if os.path.exists(test_dir) != True:
    os.makedirs(test_dir)
```

## 3. 如何得到文件的后缀?
``` python
def file_extension(path):
    return os.path.splitext(path)[1][1:]
```

## 3. 如何得到文件夹内的文件列表?
``` python
file_list = os.listdir(data_path)
file_list.sort()
```

## 4. 如何保存一串字符到文本?
``` python 
def savetxtfile(string, filename):
text_file = open(filename, "w")
text_file.write(string)
text_file.close()
```

## 5. 如何获取文件的行数?
```
num_lines = sum(1 for line in open('myfile.txt'))
```

## 6. 如何遍历规范的多层文件夹?
```
import os 
data_dir = "./Pentacam/1. Raw Data"

for classType in os.listdir(data_dir):
    for patient in os.listdir(data_dir + "/" + classType):
        for file in os.listdir(data_dir + "/" + classType + "/" + patient):
            if(not file.endswith('.CSV')):
                inputfile = data_dir + "/" + classType + "/" + patient + "/" + file
                print(inputfile)
                os.remove(inputfile)
            
```

## 7. 如何判断文件是否是以某个后缀结尾?
```
if(file.endswith('.CSV')):
    print("This file is end with .CSV.")
```

## 8. 如何得到修改时间最新的文件夹?
``` python
import glob
# Get the latest folder name 
list_of_files = glob.glob('./wb_rec/*')
latest_file = max(list_of_files, key=os.path.getctime)
```
##  9. 如何获取文件路径?
``` python
import os
# 当前路径
os.getcwd()
#父目录
os.path.dirname(os.getcwd())
# 
```

## 如何删除文件，文件夹

- `os.remove()` removes a file.
- `os.rmdir()` removes an empty directory.
- `shutil.rmtree()` deletes a directory and all its contents.

[参考](https://stackoverflow.com/questions/6996603/how-to-delete-a-file-or-folder)