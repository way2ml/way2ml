---
pageClass: linux-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-10-12 17:58:48
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-10-22 13:32:17
 -->
# 系统管理

## 如何在Ubuntu中创建一个有管理员权限的用户?
```bash
sudo adduser dylan
sudo usermod -aG sudo dylan
```
这样就创建好了一个具有管理员权限的用户dylan



## 如何在Ubuntu中安装显卡驱动, CUDA, cuDnn?
1. 安装显卡驱动
- 不需要使用官网下载的的`.run`文件，直接添加源，然后使用`apt`安装即可。
- 需要在Bios中禁用Secure Boot
- 貌似需要禁用开源的显卡驱动

2. 安装CUDA
按照官方教程走。
::: tip
貌似安装了CUDA,还会重新自动给你装显卡驱动。
:::

3. 安装CUDNN
直接在官网下载两个Deb包，正常安装即可。

## 如何防止远程Linux自动断开SSH连接?
在==本地电脑==上:
编辑文件: ` ~/.ssh/config`

添加
```
Host *
    ServerAliveInterval 30
```

保存之后:
```bash
chmod 600 ~/.ssh/config
```

## 如何免密码登录远程Linux?
执行下面语句一次:
```bash
ssh-copy-id jack@xxx.xxx.xxx.xxx
```
以后就不用输入密码了


## 如何在Ubuntu上开机运行程序? 
编辑`rc.local`文件
```bash
sudo vim /etc/rc.local
```
添加你想要执行的语句
```bash
#!/bin/sh -e
sh /home/jack/.jackprograms/frp/run.sh &
exit 0
```

```bash
sudo chmod 755 /etc/rc.local
```
[参考1](https://blog.mimvp.com/article/20433.html) <br/>
[参考2](https://ruby-china.org/topics/38609)

## 如何强制杀死一个进程?
```bash
sudo kill -9 PID
```

<Livere/>