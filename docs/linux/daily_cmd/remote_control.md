---
pageClass: linux-class
---

# 网络操作
## ssh连接远程主机
```bash
ssh jack@112.2.1.23
```

## ssh连接远程主机免输入密码
```bash
# 输入命令后一路回车
ssh-keygen
# 执行下面命令，输入密码后。下次登录不在需要密码
ssh-copy-id jack@112.2.1.23
```

## 远程复制
```bash
# 复制远程服务器(ip为10.95.10.44)上我(jack用户)的Home目录(~)
# 下的文件 compare_train.zip 到本机的当前目录(.)下
scp jack@10.95.10.44:~/compare_train.zip .
```
<Livere/>