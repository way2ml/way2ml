---
pageClass: python-class
---


# 工具

## 如何批量转换pdf为png
1. 安装pdf2image
```bash
pip install pdf2image
```
2. 编写下面的程序:
```python
import sys

if len(sys.argv) < 2:
	print("Ooops. Usage:" + sys.argv[0] + ' PDF_FILE')
	exit()

from pdf2image import convert_from_path

input_pdf = sys.argv[1]

pages = convert_from_path(input_pdf, 500)

num = 0;
for page in pages:
	num += 1
	page.save(input_pdf.split('.')[0] + '_' + str(num) + '.png', 'PNG')

```

3. 在命令行执行下面的操作:
```bash
python convert_to_png.py Policy_Based_Approch.pdf
```
于是便得到了按页码排序的png图片了。

## 简繁转换
```bash
pip install hanziconv
```

```python
>>> from hanziconv import HanziConv
>>> print(HanziConv.toSimplified('繁簡轉換器'))
繁简转换器
>>> print(HanziConv.toTraditional('繁简转换器'))
繁簡轉換器
>>> print(HanziConv.toSimplified(u'繁簡轉換器'))
繁简转换器
>>> print(HanziConv.toTraditional(u'繁简转换器'))
繁簡轉換器
>>> print(HanziConv.toSimplified(u'mix English and Chinese. 繁簡轉換器')
mix English and Chinese. 繁简转换器
>>> print(HanziConv.toTraditional(u'mix English and Chinese. 繁简转换器'))
mix English and Chinese. 繁簡轉換器
>>> print(HanziConv.toSimplified('mix English and Chinese. 繁簡轉換器'))
mix English and Chinese. 繁简转换器
>>> print(HanziConv.toTraditional('mix English and Chinese. 繁简转换器'))
mix English and Chinese. 繁簡轉換器
```