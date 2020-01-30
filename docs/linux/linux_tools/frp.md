---
pageClass: linux-class
---

# 没有公共IP却想使用远程计算机怎么办? 
```
frp 实现内网穿透
natfrp.org 提供免费的 frp server 服务
在 frp 中设置使用 XTCP 协议可以建立 p2p 连接，数据不走 server
```
## 工具
[FRP](https://github.com/fatedier/frp)的全称Fast Reverse Proxy。可以从[这里](https://github.com/fatedier/frp/releases)下载。
下载好的文件，解压后是这个样。
```bash
.
├── frpc
├── frpc_full.ini
├── frpc.ini
├── frps
├── frps_full.ini
├── frps.ini
├── LICENSE
└── systemd
    ├── frpc.service
    ├── frpc@.service
    ├── frps.service
    └── frps@.service
```
文件含有`c`字符的代表是`client`客户端程序;含有`s`字符的代表是`server`服务器程序。
也就是我们还需要一个服务器。

## 服务器
接下来我们到 [natfrp.org](natfrp.org) 得到一个免费的frp server。很遗憾，这个网站已经不行了。

看来天下真的没有免费的午餐啊。于是乎我在[vultr](www.vultr.com)买了一个东京的服务器。
试了7,8个服务器，ssh都连不过去。貌似是这些IP都已经被墙了。
貌似还有一个搬瓦工的账户，我再试一下这个。这下可以了。

公共IP的服务器(Server):放`frps`，`frps.ini`两个文件
想要访问的内网机器(Target): 放`frpc`,`frpc.ini`两个文件

在任意一个地方的电脑(User)

## 设置协议
### Server的配置
在Server的`frps.ini`中填写:
```bash
# frps.ini
[common]
bind_port = 7000
```

然后在Server上执行:
```bash
./frps -c ./frps.ini
```
若没有出现问题，Ctrl+C中断程序。然后使用使用下面的命令使其后台运行。
```bash
nohup ./frps -c ./frps.ini &
```
退出服务器。

### 内网机器(Target的配置)
在Target的`frpc.ini`中填写，其中`xxx.xxx.xxx.xxx`是你的服务器的IP地址。
```bash
[common]
server_addr = xxx.xxx.xxx.xxx
server_port = 7000
http_proxy =

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000
```

同样现在内网机器Target上执行
```bash
./frpc -c ./frpc.ini
```
用来连接你的frp服务器。
若没有出现问题，那么就可以使用下面的命令使其后台运行
```bash
nohup ./frpc -c ./frpc.ini &
```

### 在任意一台电脑上的操作
配置好Server和Target上的frp程序后，我们可以使用下面的命令在任意一台电脑上连接你的内网机器了。
假设你的内网电脑上的用户是`jack`,那么对应的命令就是:

```bash
ssh -p 6000 jack@xxx.xxx.xxx.xxx
```

当然为了操作简单，我们这里没有使用P2P的技术。
暂时就先这样，以后有需要了再说。


<Livere/>
