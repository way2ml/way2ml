---
pageClass: ml-class
---

# 使用Python实现人脸识别(Face Recognition)

## 1. 准备工作
- 操作系统: `Linux` 或者 `MacOS`
- `Python3`, `pip3`
- 安装: [dlib](https://github.com/davisking/dlib)
    ``` bash
    git clone https://github.com/davisking/dlib.git
    cd dlib
    sudo python setup.py install
    ```
- 安装: [face_recognition](https://github.com/ageitgey/face_recognition)
    ``` bash
    sudo pip3 install face_recognition
    ```
- 安装: OpenCV
    ``` bash
    sudo pip3 install opencv-python
    ```
人脸识别库官方支持的的操作系统是`Linux`, `MacOS`。我们这里使用的是`Linux`操作系统。`face_recognition`需要调用`dlib`库，因此在安装`face_recognition`之前需要先安装`dlib`库，这里采用源码编译安装`dlib`。

## 2. 测试安装
在python环境中输入
``` python
import face_recognition
import cv2
```
若没有报错，则说明准备工作已经完成了。

## 3. 人脸检测
``` python
import face_recognition
image = face_recognition.load_image_file("face_detect_demo.jpg")
face_locations = face_recognition.face_locations(image)
print(face_locations)
```
输出:
```bash
[(116, 306, 223, 199), (186, 464, 275, 374)]
```
这里的输出为一个列表，包含两个元素，也就是找到了两个人脸。
接着使用OpenCV可视化`face_recognition`找到的两个人脸。

```python
cv2.rectangle(image, (face_locations[0][1], face_locations[0][0]), (face_locations[0][3], face_locations[0][2]), (0,123,234), 2)
cv2.rectangle(image, (face_locations[1][1], face_locations[1][0]), (face_locations[1][3], face_locations[1][2]), (0,123,234), 2)
cv2.imshow('face_detect_demo',image)
cv2.waitKey(0)
```
于是得到:

![detected_faces](https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/detected_faces.png)

## 4. 人脸识别
```python
import face_recognition
import cv2
# 加载只含周杰伦的图片
known_image = face_recognition.load_image_file("Jay_Chou.jpeg")
# 加载一张包含周杰伦的图片
unknown_image = face_recognition.load_image_file("test_face_recognition.jpeg")

# 对只含周杰伦的图片进行编码
Jay_encoding = face_recognition.face_encodings(known_image)[0]
# 对待识别的图片进行编码
unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

# 对比两者的编码, 判断周杰伦是否在　test_face_recognition.jpeg　中
results = face_recognition.compare_faces([Jay_encoding],unknown_encoding)
print(results)
```
输出
```python
[True]
```
表示`test_face_recognition.jpeg`中包含了周杰伦。

上述例子源码可以在[这里](https://github.com/way2ml/codeSource/tree/master/ml/face_recognition)下载。

更多例子参考`face_recognition`的[Examples](https://github.com/ageitgey/face_recognition)



<Livere/>