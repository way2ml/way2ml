---
pageClass: linux-class
---




# 最基础命令
## 穿梭命令行
```bash
# 列出文件
ls 
```

```bash
# 切换目录
# . 代表当前目录
# ..　代表父目录(或叫做上级目录)
# ~ 代表家目录(或叫做Home目录, 打开终端默认的目录是Home目录)  
# 例: 切换到上一级目录
cd ..　

```

## 压缩/解压
```bash
# .tar 
tar xvf FileName.tar
tar cvf FileName.tar DirName

# .gz
# 解压1：
gunzip FileName.gz
# 解压2：
gzip -d FileName.gz
# 压缩：
gzip FileName

# .tar.gz 和 .tgz
# 解压：
tar zxvf FileName.tar.gz
# 压缩：
tar zcvf FileName.tar.gz DirName

# .bz2
# 解压1：
bzip2 -d FileName.bz2
# 解压2：
bunzip2 FileName.bz2
# 压缩： 
bzip2 -z FileName

# .tar.bz2
tar jxvf FileName.tar.bz2
tar jcvf FileName.tar.bz2 DirName

# .bz
# 解压1：
bzip2 -d FileName.bz
# 解压2：
bunzip2 FileName.bz

# .tar.bz
# 解压：
tar jxvf FileName.tar.bz

# .zip
# 解压：
unzip FileName.zip
#压缩：
zip FileName.zip DirName -r

# .rar
rar x FileName.rar
rar a FileName.rar DirName

# 解压Deb包
ar x example.deb
```

<Livere/>