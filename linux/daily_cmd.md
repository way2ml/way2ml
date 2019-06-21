---
pageClass: linux-class
---
::: tip
Linux好用但是需要学习。
:::
# 命令行日常
## bash shell
### 1. for 循环
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
