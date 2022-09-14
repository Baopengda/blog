const path = require('path')

module.exports = {

  configureWebpack: () => {
    const NODE_ENV = process.env.NODE_ENV
    //判断是否是生产环境
    if (NODE_ENV === 'production') {
      return {
        output: {
          publicPath: 'https://cdn.feiyeorz.cn/'
        },
        resolve: {
          //配置路径别名
          alias: {
            'public': path.resolve(__dirname, './public')
          }
        }
      }
    } else {
      return {
        resolve: {
          //配置路径别名
          alias: {
            'public': path.resolve(__dirname, './public')
          }
        }
      }
    }
  },

  plugins: [
    [
      //添加看板娘
      '@vuepress-reco/vuepress-plugin-kan-ban-niang', {
        theme: [
          'whiteCat'
        ],
        //隐藏所有按钮
        clean: false,
        messages: {
          home: '喵喵喵~', close: '下次再见吧~', welcome: ''
        },
        //看板娘位置
        modelStyle: {
          right: '40px', bottom: '-20px', opacity: '0.9'
        },
        //几个消息按钮位置
        btnStyle: { right: '50px', bottom: '40px' },
        //消息框位置
        messageStyle: { right: '18px', bottom: '150px' },
        width: 150,
        height: 200
      }
    ],
    /*     //音乐播放器
        [
          "@vuepress-reco/vuepress-plugin-bgm-player",{
            autoplay: true,
            autoShrink: true,
            shrinkMode: 'mini',
            audios: [
              // 本地文件示例
              // {
              //   name: '장가갈 수 있을까',
              //   artist: '咖啡少年',
              //   url: '/bgm/1.mp3',
              //   cover: '/bgm/1.jpg'
              // },
              // 网络文件示例
              {
                name: '落诗',
                artist: 'feiyesblog',
                url: '/luo.mp3',
                cover: 'https://assets.smallsunnyfox.com/music/3.jpg',
              }
            ]  
          }
        ], */

    ["@vuepress-reco/vuepress-plugin-pagation", {
      perPage: 9
    }],//分页插件

    //添加鼠标点击特效
    [
      "vuepress-plugin-cursor-effects",
      {
        size: 2,                    // size of the particle, default: 2
        shape: 'circle',  // shape of the particle, default: 'star'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],

    //背景彩带
    ["ribbon-animation", {
      size: 90,   // 默认数据
      opacity: 0.3,  //  透明度
      zIndex: -1,   //  层级
      opt: {
        // 色带HSL饱和度
        colorSaturation: "80%",
        // 色带HSL亮度量
        colorBrightness: "60%",
        // 带状颜色不透明度
        colorAlpha: 0.65,
        // 在HSL颜色空间中循环显示颜色的速度有多快
        colorCycleSpeed: 6,
        // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
        verticalPosition: "center",
        // 到达屏幕另一侧的速度有多快
        horizontalSpeed: 200,
        // 在任何给定时间，屏幕上会保留多少条带
        ribbonCount: 2,
        // 添加笔划以及色带填充颜色
        strokeSize: 0,
        // 通过页面滚动上的因子垂直移动色带
        parallaxAmount: -0.5,
        // 随着时间的推移，为每个功能区添加动画效果
        animateSections: true
      },
      ribbonShow: false, //  点击彩带  true显示  false为不显示
      ribbonAnimationShow: true  // 滑动彩带
    }]

  ],

  "title": "知识产权",
  "description": "Simple life,quiet thinking...",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/href.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间轴",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "项目",
        "icon": "reco-api",
        "items": [
          {
            "text": "严选商城",
            "link": "http://47.105.90.21:3000/"
          }
        ]
      },
      {
        "text": "关于我",
        "icon": "reco-account",
        "items": [
          {
            "text": "Gitee",
            "link": "https://gitee.com/bao-pengda",
            "icon": "reco-mayun"
          }
        ]
      }
    ],
    sidebar: require('./sidebarConf'),
    /* "sidebar": {
      '/blogs/category1': [ 
        {
          title:'前端',
          sidebarDepth: 1,
          collapsable:true,
          children: ['/blogs/category1/2020/121501']
        },{
          title:'算法',
          sidebarDepth: 1,
          collapsable:true,
          children: ['/blogs/category1/2021/092101','/blogs/category1/2021/092102']
        },{
          title:'数据库',
          sidebarDepth: 1,
          collapsable:true,
          children: ['/blogs/category1/2020/121502']
        }
      ],
      '/blogs/knowledge': [ {
          title:'面试题',
          sidebarDepth: 1,
          collapsable:true,
          children: ['/blogs/knowledge/know001']
        }
      ],
    }, */
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "cp.cp",
        "link": "https://cpcpxxx.vip/"
      },
      {
        "title": "vivod",
        /* "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com", */
        "link": "https://www.vivod.xyz/"
      },
      {
        "title": "btnull",
        "link": "https://www.btnull.org/"
      },
      {
        "title": "diduan",
        "link": "https://ddrk.me/"
      },
      {
        "title": "feijisu",
        "link": "http://www.feijisu8.com/"
      },
      {
        "title": "dianyinggou",
        "link": "https://www.dianyinggou.com/"
      },
      {
        "title": "axutongxue",
        "link": "https://axutongxue.com/"
      }
    ],

    // "logo": "/head2.jpg",
    // "search": true,
    // "searchMaxSuggestions": 10,
    // "lastUpdated": "最后更新时间",
    // "author": "feiye",
    // "authorAvatar": "/head2.jpg",
    // "record": "辽ICP备2022000154号-1",
    // "recordLink": "http://beian.miit.gov.cn",
    // "startYear": "2022"
  },
  "markdown": {
    "lineNumbers": true
  }
}