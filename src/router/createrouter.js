// eslint-disable-next-line no-unused-vars
export function createrouter(routerMap, parent) {
  let routerarr = [];
  routerMap.map(item => {
    if (item.children == null) {
      routerarr.push(item);
    } else {
      routerarr.push(...item.children);
    }
  });
  // console.log(routerarr);
  return routerarr.map(item => {
    const currentRouter = {
      path: `/home/${item.path}`, // 路由地址 动态拼接生成如 /dashboard/workplace
      name: item.name || item.key || "", // 路由名称
      component: resolve => require(["@/view/" + item.component], resolve), // 该路由对应页面的组件
      title: item.meta.title, //标题
      meta: item.meta, //源信息
      key: item.key, //key值
      hidden: item.hidden // 是否隐藏 true隐藏
    };
    currentRouter.path = currentRouter.path.replace("//", "/");
    item.redirect && (currentRouter.redirect = item.redirect); // 路由重定向
    // console.log(currentRouter);
    return currentRouter;
  });
}
