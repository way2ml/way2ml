---
pageClass: python-class
---
# Steady Hand游戏设计
开始这节学习之前，我们先来看看Steady Hand游戏是怎么回事。

<p align="center">
<iframe src="//player.bilibili.com/player.html?aid=48432827&cid=84825562&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width=480 height=380> </iframe>
</p>

整个游戏有一个开始点，一个挑战终点，在开始点和结束点之间有一根铜丝。游戏规则是这样: 
挑战者需要拿着一个铁环，不断调整角度，方向，将铁环从开始点移动到挑战终点。在整个挑战过程中，铁环不能接触铜丝，否则挑战失败。

现在我们一边玩，一边想如何编程实现这样一个游戏。

在开始的时候我们需要用铁环触碰开始点，那如何检测到我是否触碰到了开始点呢? 对，靠电平信号。我们将铁环(记铁环为`D`)和树莓派的`GND`相连，将和开始位置相连的GPIO口引脚(这里记为`A`)，设置为输入模式，并设置成电平上拉模式(这样在铁环没有接触开始位置的时候，开始位置对应于高电平)。因此在开始的部分我们可以这样做，不停地检测开始位置的电平，若是开始位置`A`的电平由高变低，那么游戏就开始了。就像是赛跑一样，信号枪声一响起，裁判便按下计时器，开始计时。这里我们也把开始的时刻给记录下来(我们记为`T1`)，到挑战成功后，便可以用来计算挑战所用的时间了。

在游戏开始后，我们的背景音乐响起。如何播放音乐? 你还记得吗。如果不记得了，到第8小节看看吧。播放音乐在这里可以想象成按下了一个播放按钮，也就是启动了一个开关。按下这个开关后，我们便不需要管音乐播放的事了。那这段空闲应该做什么呢? 

你看这时挑战者在不停地移动铁环，好像没有程序什么事。好像真的没有什么事做? 真的是这样吗? 当然不是，你看当铁环触碰到铜丝的时候，树莓派便发出语音警告`干什尼？`(做什么啊?)。也就是说在移动铁环的过程中树莓派一直在检测铁环有没有触碰到铜丝，一旦触碰到，马上做出反应。如何检测的呢? 方法和检测触碰开始位置的方法一样。铜丝和树莓派的一个引脚(记为`C`)相连，同样把铜丝的引脚`C`设置成上拉输入模式，因此在没有铁环接触到铜丝的时候呢，引脚`C`的是高电平。一旦铁环触碰到铜丝，那么引脚`C`的信号便变成了低电平。立刻做出反应--播放语音提示`干什尼？`表示挑战失败。失败后需要重新回到开始位置，重新计时。

若是在挑战过程中，铁环没有触碰到铁丝,一直成功地到了结束位置，这时挑战者需要用铁环触碰结束位置，以此告诉树莓派挑战成功了。一旦树莓派收到挑战成功的信号，那么它立刻会记录这时的时刻(记为`T2`)。 利用最开始记录的`T1`和挑战成功记录的`T2`，那么就可以很容易的得到挑战用的时间`T = T2 - T1`。然后播放挑战成功的语音提示--一串笑声`Hahahaha`, 播放用时多久。

程序的思路就是这样，接下来就是具体怎么去完成这样一个项目了。
在编写程序之前，我们准备游戏的硬件。就像下面一样[3]: 

<p align="center">
<img src='/images/python/use_pi_to_learn_python/steadyhand.svg' width=500>
</p>

对照第4节里面的引脚图，将A,B,C,D和树莓派对应引脚相连，如下: 
<p align="center">
<img src='/images/python/use_pi_to_learn_python/steady_hand_connect.svg' width='50%'>
</p>

接下来为游戏编写程序, 这里我把v2.0主程序的`main()`写在下面: 
```python
def main():
    print("***** Welcome To The Steady Hand Challenge *****")
    setUp()
    musicSetup(volume=30)

    bgmSound = './music/creativeminds_l.mp3'
    startSound = './music/start_ad_01.mp3'
    ooopsSound = './music/ooops_ya_01.mp3'
    endSound = './music/end_fql_01.mp3'
    badSound = '/music/ooops_ya_02.mp3'

    dum = 0
    start_rest = 4
    end_rest = 0
    wire = 1

    while True:
        print(">> To Start Move the loop to the start rest")
        stopPlay()
        # Wait for the iron loop to touch the
        # Start rest A
        while GPIO.input(start_rest) != 0:
            time.sleep(0.2)
        # print(">> Start when you are ready")
        play(startSound,5) 
        time.sleep(0.7)
        while GPIO.input(start_rest) == 0:
            time.sleep(0.01)
        play(bgmSound,-1)
        print(">> Game Start, keep moving......")
        start_time = datetime.datetime.now()
        errorCounter = 0
        happyFlag = True
        while GPIO.input(end_rest) != 0: 
            if GPIO.input(wire) != 0:
                time.sleep(0.01)
            else:
                play(ooopsSound,1)
                time.sleep(1)
                errorCounter = errorCounter + 1
                happyFlag = False
                print('>> Ooops, Game Over')
                break
        end_time = datetime.datetime.now()
        total_time =(end_time  - start_time).seconds
        print('>> Time: ' + str(total_time) + 's')
        stopPlay()
        if happyFlag == True:
            print('>> Congratulations, You win!')
            play(endSound,1)
            time.sleep(2)
            tellTimeUsed(total_time)
        else:
            pass
```
好了，通过这一节的游戏设计，我们把前面学到的知识又复习了一遍，希望你可以把这个游戏完成，然后给周围的伙伴玩你做的游戏，他们或许能够给你提出一些需要优化的地方，这时你就可以针对他们的反馈更新你的程序，让游戏变得越来越好玩。希望你能够喜欢这个游戏，享受编程带给你的乐趣。

这个教程的所有例子在[这里](https://github.com/HuangJiaLian/UseRaspberryPiToLearnPython)都可以下载。

<Livere/>