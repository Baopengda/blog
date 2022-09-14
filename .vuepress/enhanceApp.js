import VueRouter from 'vue-router'

const originalReplace = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err);
};

export default ({
  Vue,
  options,
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  try {

  } catch (e) {
    console.error(e.message)
  }
}