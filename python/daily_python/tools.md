---
pageClass: python-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-22 23:53:56
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-22 23:57:12
 -->

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