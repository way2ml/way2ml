---
pageClass: python-class
---

# 环境

## Anaconda的使用(Usage of Anaconda)
### 删除软件源
``` bash
conda config --show
conda config --remove channels 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/' 
```

### 更新所有的软件
``` bash
conda update --all
```

### 创建新的环境
```bash
conda create -n gpu_tf_keras
```

### 切换到新的环境
```bash
conda activate gpu_tf_keras
```

### 删除一个环境
```bash
conda env remove -n gpu_tf_keras
```

## pip 的使用(Usage Of pip)
### 安装python软件包？
```bash
pip install package
```
### 卸载python软件包?
```bash
pip uninstall package
```
### 临时修改pip软件源，当下载速度很慢时使用
```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple package
```
### 如何安装老版本的软件包？
到pip官网对应的包的位置,里面选择Release History, 找到后pip网站会自动给你提示应该如何安装。


## 如何找到某个包的位置?
安装完OpenAI Gym后想要自己编写自己的环境, 需要找到gym的安装位置，然后编写自己的环境。可以通过下面的方法找到
gym的路径。在你要使用的环境中(如果你是使用Anaconda的话),执行下面Python程序:

```python
from distutils.sysconfig import get_python_lib
print(get_python_lib())
```

我的电脑上的输出是:

```bash
/home/jack/jack/.jackprograms/anaconda3/envs/tf_gpu/lib/python3.6/site-packages
```

于是在这个路径下面就真的找到了gym的文件了。

[参考](https://stackoverflow.com/questions/31003994/anaconda-site-packages)


## Jupyter Notebook
### 如何让Jupyter Notebook可远程访问?
生成配置文件:
```bash
jupyter notebook --generate-config
```
输出:
```bash
Writing default config to: /home/xxx/.jupyter/jupyter_notebook_config.py
```

设置密码:
```bash
jupyter notebook password
```
输出:
```bash
Enter password: 
Verify password: 
[NotebookPasswordApp] Wrote hashed password to /home/xxx/.jupyter/jupyter_notebook_config.json
```

准备Hashed Password:

在`Ipython`环境中输入:
```python
Python 3.7.3 (default, Mar 27 2019, 22:11:17) 
Type 'copyright', 'credits' or 'license' for more information
IPython 7.6.1 -- An enhanced Interactive Python. Type '?' for help.

In [1]: from notebook.auth import passwd                                                              
In [2]: passwd()  
Enter password: 
Verify password: 
Out[2]: 'sha1:399f1541504b:c4c09a80fe65c190068625e66091695867cf665d'
```
退出交互环境后。

编辑配置文件:
```bash
vim ~/.jupyter/jupyter_notebook_config.py
```
找到下面对应的行,取消注释, 改为:
```python
c.NotebookApp.password = u'sha1:399f1541504b:c4c09a80fe65c190068625e66091695867cf665d'
c.NotebookApp.ip = '*'
c.NotebookApp.open_browser = False
c.NotebookApp.port = 9999
```
保存后退出。

其中:
- `c.NotebookApp.ip = '*'` 表示允许所有的IP来连接这个Notebook Server
- `c.NotebookApp.open_browser = False` 表示不默认打开浏览器
- `c.NotebookApp.port = 9999` 代表Notebook Server的端口号是9999

至此，配置就完成了。

利用`ifconfig`命令得到服务器的IP地址:
```bash
enp0s25   Link encap:Ethernet  HWaddr 18:66:da:2f:38:ef  
          inet addr:192.168.0.127  Bcast:192.168.0.255  Mask:255.255.255.0
          inet6 addr: fe80::1b51:3c37:f58e:82a3/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:1284744 errors:0 dropped:0 overruns:0 frame:0
          TX packets:840830 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000 
          RX bytes:1411205022 (1.4 GB)  TX bytes:310720533 (310.7 MB)
          Interrupt:20 Memory:f3100000-f3120000 
```
我的内网地址是`192.168.0.127`，这个地址需要记录下来。
然后我在服务PC上开启Jupyter Notebook的服务:
```bash
jupyter-notebook 
```


然后在局域网内其他电脑的浏览器上输入地址
```bash
192.168.0.127:9999
```

输入密码后，便可以进入到Server的Jupyter Notebook了。

## VSCode的使用
## 如何在VSCode中选择调试的Python环境?
`Ctrl+Shift+P`, 然后输入:Select Interpreter，然后选择你要使用的Python环境即可。

[Vscode说明](https://code.visualstudio.com/docs/python/environments)

<Livere/>