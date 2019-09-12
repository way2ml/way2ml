---
pageClass: python-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-12 15:03:54
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-12 15:12:37
 -->

# 环境

## Anaconda的使用(Usage of Anaconda)
### 1.删除软件源
``` python
conda config --show
conda config --remove channels 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/' 
```

### 2. 更新所有的软件
``` python
conda update --all
```

### 3. 创建新的环境
```bash
conda create -n gpu_tf_keras
```

### 4. 切换到新的环境
```bash
conda activate gpu_tf_keras
```

### 5. 删除一个环境
```bash
conda env remove -n gpu_tf_keras
```

## pip 的使用(Usage Of pip)
### 1. 安装python软件包？
```bash
pip install package
```
### 2. 卸载python软件包?
```
pip uninstall package
```
### 3. 临时修改pip软件源，当下载速度很慢时使用
```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple package
```