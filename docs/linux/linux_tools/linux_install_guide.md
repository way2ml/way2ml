---
pageClass: linux-class
---
# Linux系统安装注意

## Dell电脑安装注意
安装之前一定要先设置模式为UEFI模式, 否则安装了无法启动。

## 安装后的工作
开启ssh服务,允许其他电脑远程连接

```bash
sudo apt-get install openssh-server
```

