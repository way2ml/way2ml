(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{252:function(s,t,a){"use strict";a.r(t);var e=a(0),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git"}},[s._v("#")]),s._v(" git")]),s._v(" "),a("p",[s._v("git是一款版本管理的工具，可以用在管理代码的不同版本，论文的不同版本等等。同时Github的官网也提供云存储的功能。很多大牛写的算法也都会放在Github\n上，因此学习git是很有必要的。")]),s._v(" "),a("h2",{attrs:{id:"基础"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础"}},[s._v("#")]),s._v(" 基础")]),s._v(" "),a("p",[s._v("初始化当前目录为git目录")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" init\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("添加文件到git")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" hello.py\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("commit留下版本截图:")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'添加了一个hello.y的文件，开始学习git啦.'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("在github官网创建远程仓库;\n关联本地和远程:")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" origin git@github.com:HuangJiaLian/3DCNN.git\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("将本地程序推送到远程github仓库:")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push -u origin master\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"进阶"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#进阶"}},[s._v("#")]),s._v(" 进阶")]),s._v(" "),a("p",[a("code",[s._v("--hard")]),s._v("参数有啥意义？这个后面再讲，现在你先放心使用。"),a("br"),s._v("\n后悔药: "),a("code",[s._v("git reflog")]),a("br"),s._v("\nGit的版本回退速度非常快，因为Git在内部有个指向当前版本的HEAD指针，当你回退版本的时候，Git仅仅是把HEAD从指向append GPL："),a("br")]),s._v(" "),a("p",[a("code",[s._v("git add -u")]),s._v(" ：他仅监控已经被add的文件（即tracked file），他会将被修改的文件提交到暂存区")]),s._v(" "),a("p",[a("code",[s._v("git checkout -b dev")]),s._v(" : 创建并切换到dev分支")]),s._v(" "),a("p",[a("code",[s._v("git push origin dev")]),s._v(" ：在"),a("code",[s._v("dev")]),s._v("中"),a("code",[s._v("commit")]),s._v("后推送到远程分支"),a("code",[s._v("dev")])]),s._v(" "),a("p",[s._v("添加本地现有库到远程端：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" existing_git_repo\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" origin https://gitee.com/Jack_Huang/Jquirc.git\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push -u origin master\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("码云添加key了以后")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("ssh -T git@gitee.com\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"gist的妙用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gist的妙用"}},[s._v("#")]),s._v(" gist的妙用")]),s._v(" "),a("p",[s._v("讨论问题的时候多多使用Github的gist功能, 不用发一些格式不对的东西个别人了。\nhttps://gist.github.com/")])])}),[],!1,null,null,null);t.default=n.exports}}]);