---
pageClass: python-class
---


# 声音

## 如何使用google-speech对单字或句子发音?
```bash
pip install gTTS
```
在Bash中使用:
```bash
google_speech -l en stall -e delay 0.5 overdrive 20 repeat 5 speed 0.9 gain -5
```

```bash
google_speech -l en "Hello, I am a stupid robot voice" -e speed 0.9 overdrive 10 echo 0.8 0.7 6 0.7 echo 0.8 0.7 10 0.7 echo 0.8 0.7 12 0.7 echo 0.8 0.88 12 0.7 echo 0.8 0.88 30 0.7 echo 0.6 0.6 60 0.7
```

保存成mp3
```bash
google_speech -l en -o hello.mp3 "Hello Google, greetings from France !"
```

问候
```bash
google_speech -l en "Hello $USER, it is $(date)"
```

倒数
```bash
for i in {10..0}; do ( google_speech $i & ); sleep 1s; done
```

读笑话
```bash
curl -s http://api.icndb.com/jokes/random/ | python3 -c 'import html.parser, json, sys; print(html.parser.HTMLParser().unescape(json.load(sys.stdin)["value"]["joke"]))' | google_speech -
```


在Python中使用
```python
from google_speech import Speech

text = "Hello World"
lang = "en"
speech = Speech(text, lang)
speech.play()

# you can also apply audio effects while playing (using SoX)
# see http://sox.sourceforge.net/sox.html#EFFECTS for full effect documentation
sox_effects = ("speed", "1.5")
speech.play(sox_effects)

# save the speech to an MP3 file (no effect is applied)
speech.save("output.mp3")
```

参考 [链接](https://pypi.org/project/google-speech/)

