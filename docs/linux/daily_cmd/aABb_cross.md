---
pageClass: linux-class
---
 
# 连通两个内部局域网:aABb

## 故事
::: warning Jack:
师兄，有个问题需要你的帮助。今天我给会议室桌上的电脑新装了一个Ubuntu, IP:192.168.1.113然后我自己的电脑(IP:192.168.0.199)连到“Office1915”wifi,发现ssh连不过去。只有我连到Mr.J办公室的网络Onsager才可以连到会议室的电脑,怎么样做才能够从Office1915连接到会议室的电脑?
::: 

::: tip Tao:
两个电脑的 ip 都是路由器的内网，且第三段不同，说明各自所处不在同一个子网内，也就是分别躲在不同的路由器后。

两个路由器应该是可以直接互访的，假设分别为 A, B, 外网 ip 分别为 wan_A, wan_B

两台电脑为 a, b，分别在 A, B 后，ip 为 lan_a, lan_b

现在假设你要从 a 用 ssh 访问 b，路径是 a -> A -> B -> b:22

问题在于 a 最多只能知道 B 在哪，不知道 b 在哪，所以应该由 a 访问 B 的某个端口，然后由 B 转发到 b 的 22 端口。

在 B 上设置端口转发，在路由器B的设置界面找“端口转发”或“虚拟主机”之类的选项，将 wan_B 的 1234 端口转发到 lan_b 的 22 端口

然后在 a 上访问 wan_B 的 1234 端口，就登录到了 b
:::

<p align='center'>
<img src='/images/linux/daily_linux/network/aABb.png' width='100%'>
</p>

::: tip Tao:
上面的 1234 端口是随便选的，也可以直接设为 22 ，注意概念上区分 B:22 与 b:22 的不同就行
:::

::: tip Tao:
按照经验，wan_A 与 wan_B 在Baiyan都 10.xx.xx.xx ，而 lan_a 与 lan_b 则可由各自 wifi 路由上的 dhcp 服务器设定
:::

::: tip Tao:
最好在 B 中 dhcp 服务器上设定 b 的 ip 为静态 ip ，也就是要把 lan_b 与 b 的 MAC 号绑定
:::

::: warning Jack:
登录B现在有困难，不知道账号。师兄你刚刚说的"wan_A 与 wan_B 在BaiYan都 10.xx.xx.xx"这个是什么意思?
:::

::: tip Tao:
wan_A 与 wan_B 都是由上一级路由上的 dhcp server 分配的 ip ，上一级路由器就在19楼 190X 那个屋子里（或许是个交换机，路由器更远），一般 10、192 、172等开头的都是局域网。不过对于 a 和 b 来说，就和广域网区别不大了
:::

::: tip Tao:
按你的描述，B 应该就是Mr.J那个 Onsager, 登录到这个热点，然后访问 192.168.1.1 密码很大可能就是 Onsager 的 wifi 密码
:::


::: warning Jack:
真的诶! 登录上了。
:::

::: warning Jack:
弄好了。谢谢师兄，终于学会啦! 
:::


::: tip Tao:
不客气
:::

## 步骤
### B端的操作
1. 登录到B:
浏览器输入地址:`192.168.1.1`, 密码使用Onsager的密码；

2. 为b设置IP地址为静态
`系统管理`->`静态IP分配`

`dell-Tower-7910`	`50:9a:4c:4a:5d:2f`	`192.168.1.113`

<p align='center'>
<img src='/images/linux/daily_linux/network/staticIP.png' width='100%'>
</p>

3. 设置端口转发
`192.168.1.113 22 6666 TCP`

<p align='center'>
<img src='/images/linux/daily_linux/network/SettingB.png' width='100%'>
</p>

### A端的操作
1. 登录到A:
浏览器输入地址:`http://tendawifi.com/`(在路由器背后发现的),　密码使用Office_1915的密码；

2. 设置a访问B的6666端口
<p align='center'>
<img src='/images/linux/daily_linux/network/SettingA.png' width='100%'>
</p>

### 从a连接到B,b
首先登录B可以看到B的IP地址:wan_B, 我这里是`10.143.7.153`
```bash
ssh -p 6666 dell@10.143.7.153
```

Enjoy.


## 致谢
感谢[Tao](http://taohonker.science/#/)师兄耐心地讲解。