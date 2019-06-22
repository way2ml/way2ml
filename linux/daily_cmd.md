---
pageClass: linux-class
---
::: tip
Linux好用但是需要学习。
:::
# 命令行日常
## bash shell
### for 循环
一个批量提交的脚本
```bash
#!/bin/bash
for i in 1 2 3 4 5 6 7 8 9 10
do
   cd $i
   echo "Submitting $i"
   qsub ./myworkflow
   cd ..
done
echo "Done"
```

## 日常工具
### 穿梭命令行
```bash
# 列出文件
ls 
```
{%raw%}
hello
{%endraw%}

```bash
# 切换目录
# . 代表当前目录
# ..　代表父目录(或叫做上级目录)
# ~ 代表家目录(或叫做Home目录, 打开终端默认的目录是Home目录)  
# 例: 切换到上一级目录
cd ..　

```

### 压缩/解压
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
```

## 网络操作
### ssh连接远程主机
```bash
ssh jack@112.2.1.23
```

### ssh连接远程主机免输入密码
```bash
# 输入命令后一路回车
ssh-keygen
# 执行下面命令，输入密码后。下次登录不在需要密码
ssh-copy-id jack@112.2.1.23
```

### 远程复制
```bash
# 复制远程服务器(ip为10.95.10.44)上我(jack用户)的Home目录(~)
# 下的文件 compare_train.zip 到本机的当前目录(.)下
scp jack@10.95.10.44:~/compare_train.zip .
```

<Livere/>
