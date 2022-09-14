const getDocPath = require('./getDocPath')
module.exports = {
  '/blogs/study/': [ 
    getDocPath('前端',true,'/blogs/study/headend/'),
    getDocPath('数据库',true,'/blogs/study/dataBase/'),
    getDocPath('算法',true,'/blogs/study/method/'),
    getDocPath('工具类',true,'/blogs/study/tools/'),
    getDocPath('框架',true,'/blogs/study/framwork/'),
    getDocPath('面经',true,'/blogs/study/knowledge/'),
    getDocPath('源码',true,'/blogs/study/soundCode/'),
    getDocPath('操作系统',true,'/blogs/study/linux/'),
    getDocPath('项目积累',true,'/blogs/study/project/')
  ]
}