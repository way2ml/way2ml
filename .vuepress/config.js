module.exports = {
    title: 'Way To Machine Learning',
    description: '机器学习之路',
    markdown: {
        anchor: { permalink: true }, // 内置插件设置：文件内部链接。
        lineNumbers: false, // 设置代码块中是否显示行号。
        toc: { includeLevel: [2, 3, 4] }, // 内置插件设置：目录显示标题的层级。
        config: md => { // 外部插件设置：markdown-it-plugin。
          md.use(require('markdown-it-katex'))
          md.use(require('markdown-it-mark'))
          md.use(require('markdown-it-sup'))
          md.use(require('markdown-it-sub'))
        }
      },
      head: [
        ['link', {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css'}], 
        ['link', {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css'}] 
    ],  

    themeConfig:{
        nav:[
            {text: 'Home', link:'/'},
            {text: 'Linux', link:'/basic/'},
            {text: 'Python', link:'/middle/'},
            {text: 'ML', link:'/high/'},
        ],
        // sidebar: 'auto'
        sidebar: {
            '/basic/':[
                '',
            ],

            '/middle/':[
                '',
            ],

            '/high/':[
                '',
            ],
        }
    }
}