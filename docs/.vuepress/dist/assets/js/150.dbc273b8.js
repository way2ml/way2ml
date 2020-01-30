(window.webpackJsonp=window.webpackJsonp||[]).push([[150],{359:function(t,s,n){"use strict";n.r(s);var a=n(0),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"使用python检测按键状态"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用python检测按键状态"}},[t._v("#")]),t._v(" 使用Python检测按键状态")]),t._v(" "),n("p",[t._v("在这节中，我们会用Python检测按键的状态，根据按键不同的状态来做出不同的反应[2]。首先，让我们来看一看按键的物理特性,如图:\n")]),n("p",{attrs:{align:"center"}},[n("img",{attrs:{src:"/images/python/use_pi_to_learn_python/push_button.svg",width:"50%"}})]),t._v("\n它有这几个关键的性质:"),n("p"),t._v(" "),n("ol",[n("li",[t._v("数字相同的引脚内部是相连的")]),t._v(" "),n("li",[t._v("数字不同的引脚内部是断开的")]),t._v(" "),n("li",[t._v("当按下按键后,数字不同的引脚由断开状态变为相连的状态")])]),t._v(" "),n("p",[t._v("按照给出的原理图:\n")]),n("p",{attrs:{align:"center"}},[n("img",{attrs:{src:"/images/python/use_pi_to_learn_python/button_led_shematic.png",width:"50%"}})]),t._v("\n搭建出下面的电路:\n"),n("p",{attrs:{align:"center"}},[n("img",{attrs:{src:"/images/python/use_pi_to_learn_python/button_led.png",width:"50%"}})]),t._v("\n接下来，我们通过编程来获取第一个按键开关的状态。编写程序"),n("code",[t._v("detect_button.py")]),t._v(":"),n("p"),t._v(" "),n("div",{staticClass:"language-python line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-python"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" RPi"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("GPIO "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" GPIO\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" time\n\nGPIO"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("setmode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("GPIO"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("BCM"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nGPIO"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("setup"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("27")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" GPIO"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("IN"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pull_up_down"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("GPIO"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("PUD_UP"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    input_state "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" GPIO"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("input")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("27")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" input_state "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("False")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Button Pressed'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        time"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sleep"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br"),n("span",{staticClass:"line-number"},[t._v("9")]),n("br"),n("span",{staticClass:"line-number"},[t._v("10")]),n("br"),n("span",{staticClass:"line-number"},[t._v("11")]),n("br")])]),n("p",[t._v("在上面的程序里面:")]),t._v(" "),n("ol",[n("li",[n("code",[t._v("GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)")]),t._v(" 设置"),n("code",[t._v("GPIO27")]),t._v("引脚为输入引脚，并设置为引脚"),n("strong",[t._v("上拉")]),t._v(",即"),n("code",[t._v("pull up")]),t._v("模式。上拉模式的内部原理如下:\n"),n("p",{attrs:{align:"center"}},[n("img",{attrs:{src:"/images/python/use_pi_to_learn_python/pullup.svg",width:"50%"}})])])]),t._v(" "),n("p",[t._v("在设置"),n("code",[t._v("GPIO27")]),t._v("的引脚为输入引脚上拉模式后, 树莓派检测到的引脚电平为高电平(True), 当按下按键后，树莓派检测到"),n("code",[t._v("GPOI27")]),t._v("的电平为低电平(False)。")]),t._v(" "),n("ol",{attrs:{start:"2"}},[n("li",[n("p",[t._v("通过无限循环来检测"),n("code",[t._v("GPIO27")]),t._v("的输入电平，如果检测到低电平(即第一个按键被按下), 则终端打印输出"),n("code",[t._v("Button Pressed")]),t._v("。")])]),t._v(" "),n("li",[n("p",[t._v("第一次出现了"),n("code",[t._v("if")]),t._v("语句，它有下面的几个特征:")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("if")]),t._v("关键字")]),t._v(" "),n("li",[t._v("一个条件(一个为"),n("code",[t._v("True")]),t._v("或者"),n("code",[t._v("False")]),t._v("的表达式)")]),t._v(" "),n("li",[t._v("一个冒号")]),t._v(" "),n("li",[t._v("一组缩进的代码")])])])]),t._v(" "),n("p",[t._v("当条件为"),n("code",[t._v("True")]),t._v("时，执行一次"),n("code",[t._v("if")]),t._v("的缩进代码；否则不执行"),n("code",[t._v("if")]),t._v("缩进代码。\n运行"),n("code",[t._v("detect_button.py")]),t._v("，　按下第一个按键，看看有什么反应。退出程序记得按"),n("code",[t._v("Ctrl C")]),t._v("。")]),t._v(" "),n("p",[n("strong",[t._v("练习")]),t._v(":")]),t._v(" "),n("p",[t._v("结合现在了解到的知识，你能够设计实现通过按下第二个按键点亮LED灯的程序吗？")]),t._v(" "),n("p",[t._v("通过本节，我们可以了解到:")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("if")]),t._v("语句的基本语法")]),t._v(" "),n("li",[t._v("使用Python检测按键的状态")])]),t._v(" "),n("Livere")],1)}),[],!1,null,null,null);s.default=e.exports}}]);