module.exports = {
    title: 'Way To Machine Learning',
    description: '机器学习之道',
    markdown: {
        anchor: { permalink: true }, // 内置插件设置：文件内部链接。
        lineNumbers: true, // 设置代码块中是否显示行号。
        toc: { includeLevel: [1, 2, 3, 4, 5] }, // 内置插件设置：目录显示标题的层级。
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
            {text: '主页', link:'/'},
            {text: '玩转Linux', link:'/linux/'},
            {text: '爱上Python', link:'/python/'},
            {text: '沉迷ML', link:'/ml/'},
        ],
        // sidebar: 'auto'
        sidebar: {
            '/linux/':[
                '',
                'download_tool',
            ],

            '/python/':[
                '',
                'use_pi_to_learn_python'
            ],

            '/ml/':[
                '',
                'how_to_start_learning_ml',
                'deep_learning_with_tensorflow',
                'gan',
                'face_recognition',
                'how_to_make_your_own_dataset',
            ],
        }
    }
}