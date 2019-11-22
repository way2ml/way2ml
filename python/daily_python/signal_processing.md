---
pageClass: python-class
---

<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-12 15:38:17
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-10-15 15:39:07
 -->

# 信号

## 如何响应键盘事件?

```python
import signal

is_sigint_up = False

def sigint_handler(signum, frame):
  global is_sigint_up
  is_sigint_up = True
  print ('Interrupted!')

signal.signal(signal.SIGINT, sigint_handler)

while True:
    if is_sigint_up == True:
        break
```

## 如何定时中断?

```python
import signal

# Define signal handler function
def myHandler(signum, frame):
    print("Now, it's the time")
    exit()
    
 # register signal.SIGALRM's handler 
signal.signal(signal.SIGALRM, myHandler)
signal.alarm(5)
while True:
    print('not yet')
```

## 如何检测哪个键被按下?
```python
import keyboard  # using module keyboard
while True:  # making a loop
    try:  # used try so that if user pressed other than the given key error will not be shown
        if keyboard.is_pressed('q'):  # if key 'q' is pressed 
            print('You Pressed A Key!')
            break  # finishing the loop
        else:
            pass
    except:
        break  # if user pressed a key other than the given key the loop will break
```


## 如何检查方向键是否被按下? 
```python
import readchar

while True:
    keypress = readchar.readkey()
    if keypress == readchar.key.UP:
        print("UP")
    elif keypress == readchar.key.DOWN:
        print("DOWN")
    elif keypress == readchar.key.LEFT:
        print("LEFT")
    elif keypress == readchar.key.RIGHT:
        print("RIGHT")
    elif keypress in (readchar.key.CR, readchar.key.CTRL_C):
        break
```

## 如何使用Opencv读取按键?
```python
import cv2 

img = cv2.imread('directions.png')
cv2.imshow('img',img)
while True:
    key = cv2.waitKey(-1)
    print(key)
```

使用本地任意一张图代替`directions.png`即可。