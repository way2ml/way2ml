---
pageClass: linux-class
---
# Bash shell
## for 循环
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

<Livere/>