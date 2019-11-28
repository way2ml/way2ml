/*
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-05 16:24:09
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-11-12 15:31:45
 */

module.exports = {
    title: 'Way To Machine Learning',
    description: 'Welcome to this wonderful journey.',
    markdown: {
        anchor: { permalink: true }, // 内置插件设置：文件内部链接。
        lineNumbers: true, // 设置代码块中是否显示行号。
        toc: { includeLevel: [1, 2, 3, 4, 5] }, // 内置插件设置：目录显示标题的层级。
        config: md => { 
          // 外部插件设置：markdown-it-plugin。
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
    plugin:[
        [
            '@vuepress/register-components',
            {
                componentsDir: './components'
            }
        ]
    ],
    themeConfig:{
        nav:[
            {text: 'Home', link:'/'},
            {text: 'Linux',
             items:[
                 {text:'动手学Linux',link:'/linux/learn_linux_by_doing/'},
                 {text:'Linux工具箱',link:'/linux/linux_tools/'},
                 {text:'命令行日常',link:'/linux/daily_cmd/'}
                   ]
            },

            {text: 'Python', link:'/python/',
             items:[
                {text:'用树莓派入门Python',link:'/python/use_pi_to_learn_python/'},
                {text:'Python日常',link:'/python/daily_python/'}
                   ]
            },

            {text: 'ML', link:'/ml/',
            items:[
                {text:'CNN',link:'/ml/CNN/'},
                {text:'RNN',link:'/ml/RNN/'},
                {text:'GAN',link:'/ml/GAN/'},
                {text:'Tensorflow',link:'/ml/TF/'},
                {text:'PyTorch',link:'/ml/PyTorch/'},
                {text:'RL理论',link:'/ml/RL_Theory/'},
                {text:'RL实践',link:'/ml/RL_Practice/'},
                {text:'实战项目',link:'/ml/Projects/'},
                {text:'ML经验',link:'/ml/Experience/'},
                {text:'信息论',link:'/ml/Information_Theory/'},
                {text:'其他',link:'/ml/Others/'},
                   ]
            },
            {text:'About',link:'/about/'}
        ],
        // sidebar: 'auto'
        sidebar: {
            ///////////////////////////
            //        Linux          //
            ///////////////////////////
            // 动手学Linux教程
            '/linux/learn_linux_by_doing/':[
                '',
                'Linux_Intro',
                'Start_To_Use_Linux',
                'GUI',
                'Linux_Env',
                'Keyboard',
                'App_In_Cmd',
                'Linux_Manual',
                'Command_Syntax',
                'The_Shell',
                'Shell_Init_Files',
                'Std_IO_Redirection_Pipes',
                'Filter_Intro_Basic',
                'Filter_Compare_Extract',
                'Filter_Counting_Format',
                'Filter_Selecting_Sorting_Combine',
                'Regular_Expression',
                'Display',
                'Vim',
                'Linux_FileSystem',
                'Working_With_Directories',
                'Working_With_Files',
                'Process_And_Job',
                'Remote_Control',
            ],
            '/linux/linux_tools/':[
                '',
                'download_tool',
                'latex',
                'gnome_calculatar',
                'git',
                'raspberry_pi',
                'frp',
                'startdic',
                'linux_install_guide',
            ],

            '/linux/daily_cmd/':[
                '',
                'very_basic',
                'daily_shell',
                'remote_control',
                'aABb_cross',
                'admin',
                'gui_env',
                
            ],
            

   
            ///////////////////////////
            //        Python         //
            ///////////////////////////
            // 用树莓派学Python教程
            '/python/use_pi_to_learn_python/':[
                '',
                '01_background',
                '02_Purpose',
                '03_menu',
                '04_python_intro',
                '05_python_env',
                '06_hello_world',
                '07_led',
                '08_blink',
                '09_button',
                '10_elegant_code',
                '11_music',
                '12_record',
                '13_oop',
                '14_steady_hand',
                '15_end',
                '16_reference',
                '17_material',
            ],

            // Python日常命令
            '/python/daily_python/':[
                '',
                'python_env',
                'python_basic',
                'string',
                'haddle_file',
                'probability',
                'handle_time',
                'signal_processing',
                'numpy',
                'pandas',
                'pytables',
                'data_processing',
                'visualise',
                'sound',
                'tensorflow',
                'solutions',
                'tools',
                'web',
                'solved_problems',
                'vscode'
            ],

            ///////////////////////////
            //          ML           //
            ///////////////////////////
            // 卷积神经网络
            '/ml/CNN/':[
                '',
                'a_01_story_of_cnn',
                'a_02_cnn_machanism',
                'b_3d_cnn',
            ],
            // 强化学习理论
            '/ml/RL_Theory/':[
                '',
                'a_01_what_is_rl',
                'a_02_basic_interface',
                'a_03_rl_vs_others',
                'a_04_rl_in_life',
                'a_05_terms_in_rl',
                'a_06_a_target_of_rl',
                'a_06_difficulties_in_rl',
                'a_07_rl_class',
                'a_08_rl_mathods',
                'q_learning',
                'TD_0',
                'sarsa',
                'n_step_td',
                'td_lambda',
                'sarsa_lambda',
                'on_policy_vs_off_policy',
                'b_01_policy_based_approch',
                'b_02_a_importance_sampling',
                'b_02_ppo',
                'c_actor_critic',
                'c_02_GAE',
                'd_irl',
                'Maximum_Entropy_IRL',
                'why_gail_reward_no_use',
                'AIRL',
                'mountain_car_env',
                'z_99_references',
                
            ],

            // 强化学习实践
            '/ml/RL_Practice/':[
                '',
                'a_start_to_use_Gym',
                'b_q_learning',
                'c_deep_q_learning',
                'c_deep_q_learning_2',
                'c_deep_q_learning_3',
                'd_create_env',
                'a2c',
                'PPO',
                'GAIL',
                'pendulum_v0',
            ],

            // Tensorflow实践
            '/ml/TF/':[
                '',
                'a_01_how_to_make_your_own_dataset',
                'b_01_deep_learning_with_tensorflow',
                'questions_how_to_gradient_in_tf'
            ],
            // PyTorch
            '/ml/PyTorch/':[
                '',
                'install',
            ],

            // 实战项目
            '/ml/Projects/':[
                '',
                'a_01_face_recognition',
            ],

            // Gan
            '/ml/GAN/':[
                '',
                'gan',
                'convex_conjugate_and_gan',
                'think_gan',
                'wgan'
            ],
            
            // RNN
            '/ml/RNN/':[
                '',
            ],

            '/ml/Experience/':[
                '',
                'Machine_Learning_Yearning'
            ],

            '/ml/Information_Theory/':[
                '',
            ],
            // 其他
            '/ml/Others/':[
                '',
                'a_01_how_to_start_learning_ml',
                'entropy_cross_entropy_and_kl_divergence',
                'why_ppo_cant_solve_moutain_car',
                'Convex_function',
                'some_math'
            ],

        },
        sidebarDepth:3,
        lastUpdated: '上次更新',
    }
}
