# Markdown语法入门啦🎉🎉🎉
<p align='center'>
<img src='/images/linux/linux_tools/markdown/girl2.png' width='50%'>
</p>

使用Markdown写文档真的是很方便啊🤫！花十分钟来试试吧🤪
## 标题
Markdown里面使用#来表示标题。
## 二号标题两个井号
### 三号标题三个井号
```markdown
# 大标题一个井号
## 二号标题两个井号
### 三号标题三个井号
```
::: tip 温馨提示💋
#号后面一般是需要加一个空格的！
:::
## 强调
### 斜体
*斜体* 用一对*筐住,
```markdown
*斜体*用一对*筐住,
```
### 加粗
**加粗** 用两对**筐住,
```markdown
**加粗** 用两对**筐住,
```

### 高亮
==高亮== 用两对==筐住,
```markdown
==高亮==用两对==筐住,
```

### 划掉
~~划掉~~用两对~~筐住.
```markdown
~~划掉~~用两对~~筐住.
```

简单又方便，有没有呢😃


## 列表
### 有序列表
1. 有编号的列表
2. 使用：数字，点，空格，内容 
3. 试试就会，非常简单🍳
4. 还可以这样哦
    1. 嵌套也是可以的
    2. 只需要用Tab一下就
    3. 可以开启嵌套的列表啦👏🏻
```markdown
1. 有编号的列表
2. 使用：数字，点，空格，内容 
3. 试试就会，非常简单🍳
4. 还可以这样哦
    1. 嵌套也是可以的
    2. 只需要用Tab一下就
    3. 可以开启嵌套的列表啦👏🏻
```
### 无序列表
- 无序列表
- 更简单
- 使用：-，点，空格，内容 就好啦
- 同样也可以嵌套
    - 就是这样的
    - 是不是简单到不行呢😸

```markdown
- 无序列表
- 更简单
- 使用：-，点，空格，内容 就好啦
- 同样也可以嵌套
    - 就是这样的
    - 是不是简单到不行呢😸
```

## 写公式
现在谁不写公式呢，怎么写？ MD支持使用Latex的的格式写公式。
### 行内公式
什么是**行内公式**呢？ 哈哈，就是将公式和描述的文字写在一行里面，比如说我们大家都知道的一个
公式是勾股定理：$a^2 + b^2 = c^2$. 它说的是直角边$a,b$的平方和等于斜边$c$的平方和。 行内公式
只需要用一对$将要写的公式筐起来就可以啦。
```latex
$a^2 + b^2 = c^2$. 它说的是直角边$a,b$的平方和等于斜边$c$的平方和。
```
### 独行公式
独行公式就是将公式单独拿出来写作一行，只要用两对$把公式筐起来就可以了。
$$
e^{x}=1+x+\frac{x^{2}}{2 !}+\frac{x^{3}}{3 !}+\cdots
$$
```latex
$$
e^{x}=1+x+\frac{x^{2}}{2 !}+\frac{x^{3}}{3 !}+\cdots
$$
```
有了Latex：
1. 你只需要关注公式的关系，而不用去考虑各种符号的大小位置。因为Latex会自动
地帮你渲染出公式本来应该的样子；
2. 你写公式快的飞起来了🧚🏿‍♂️；
3. 优雅啊🦩。

## 写代码
MD插入代码的方法也是很简单的哦。
### 行内代码
且看我插入一行代码: `print('你瞅啥?')`， 只要使用一对反引号\`\`筐住就可以啦！`print('啥叫反引号？')`, `print('Tab上面那个啦🙄')`

### 多行代码
厉害的你需要写多行代码，接下来就插入多行代码：
```python
# 格式：
#  ```python
#  这里添加你的Python代码
#  ```
Year = 0
while Year < 10000:
    print('Love You.')
    Year += 1
```

```c    
// 格式：
//  ```c
//  这里添加你的C语言代码
//  ```
#include <stdio.h>
void main()
{
    printf("知道啦知道啦!\n")
}
```

## 表格
| 语言  |  🐶| 🐱|
| ---- |---| ---|
| 中文   | 狗 | 猫 |
| 日本語 | 犬 | ねこ |
| English | dog | cat |
```markdown
| 表格  |  🐶 | 🐱|
| ---- |---| ---|
| 中文   | 狗 | 猫 |
| 日本語  | 犬 | ねこ |
| English | dog | cat |
```

## 链接
Markdown支持链接🔗，这一点非常受大家欢迎🎉🎉🎉！
Hi, 大家好！ [way2ml](https://www.way2ml.com) 欢迎您！
```markdown
Hi, 大家好！ [way2ml](https://www.way2ml.com) 欢迎您！
```
链接--让你的文档变得灵活，这样的文档就像是一把🔑，为别人开启了新世界的大门；<br/>
链接--让你与世界相关，编不下去了。总之，用就对了🤪

## 图片
图片插入方法多，任选下面的一个！🥰 图片的链接可以是本地的链接，也可以是网络上的图片链接。
### 使用标准Markdown语法
![女孩](/images/linux/linux_tools/markdown/girl1.png)
```markdown
![女孩](/images/linux/linux_tools/markdown/girl1.png)
```
可以看到使用标准的Markdown语法会使得图片的宽度占比很大。
### 使用HTML语法插入
Markdown最终是会被后台转化成HTML的，因此在写的时候就使用HTML的语法也完全是可以的。
<img src='/images/linux/linux_tools/markdown/girl1.png' width='50%'>

```html
<img src='/images/linux/linux_tools/markdown/girl1.png' width='50%'>
```
使用html的方式可以调整图片的宽度占比。

有时我们还可能需要将图片居中，就像下面这样:
<p align='center'>
<img src='/images/linux/linux_tools/markdown/girl1.png' width='50%'>
</p>

```html
<p align='center'>
<img src='/images/linux/linux_tools/markdown/girl1.png' width='50%'>
</p>
```
这样才符合强迫症的习惯嘛！🤣 女孩子要站在中间才更可爱嘛☃️。

## 分割线
我们可以在需要的地方添加分割线

---
***
___
```markdown
---
***
___
```
## 添加音频
添加音频直接使用HTML中的`audio`标签，指定音频位置就可以了！ 喏，就像下面这样! 工作累的时候，
听听下面的歌曲放松一下吧！ 

<p align="center">
<audio ref='themeSong' src="https://github.com/HuangJiaLian/DataBase0/blob/master/sound/My_Tree.mp3?raw=true" controls loop preload></audio>
</p>

```html
<p align="center">
<audio ref='themeSong' src="https://github.com/HuangJiaLian/DataBase0/blob/master/sound/My_Tree.mp3?raw=true" controls loop preload></audio>
</p>
```

## 添加视频
### 本地视频
其实直接在Markdown中添加HTML语句就可以了。来看看这段[有趣的视频](https://crypko.ai/#/)吧！
<video style="display:block; margin: 0 auto;" width="70%" controls>
<source src="/images/ml/GAN/female.mp4" type="video/mp4">
</video>

```html
<video style="display:block; margin: 0 auto;" width="50%" controls>
<source src="/images/ml/GAN/female.mp4" type="video/mp4">
</video>
```

### Bilibili 或者 Youtube
使用Bilibili, Youtube的视频分享功能，可以得到一段`iframe`代码，将它复制到Markdown中就可以啦。
我们来看看自称AI的绊爱的视频吧！
<p align='center'>
<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=9800170&cid=16201929&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</p>

```html
<p align='center'>
<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=9800170&cid=16201929&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</p>
```

## Markdown编辑器
好的Markdown编辑器让你如虎添翼。我觉得很不错的编辑器有[Typora](https://typora.io/)，推荐给大家！


## 结语
不多不少刚刚好，希望这篇文章能够帮助到你！ 我是阿梁，专注与Linux,Python,机器学习内容分享。我在[way2ml](https://www.way2ml.com)
等你，See you！

**参考**
1. [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
2. [小可愛表情 png from pngtree.com](https://pngtree.com/so/小可愛表情)
3. [女生 png from pngtree.com](https://pngtree.com/so/女生)
4. [crypko](https://crypko.ai/#/)
5. [Full-body High-resolution Anime Generation with Progressive Structure-conditional Generative Adversarial Networks](https://dena.com/intl/anime-generation/)
<Livere/>