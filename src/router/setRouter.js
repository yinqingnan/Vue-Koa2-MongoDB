import { resolve } from "core-js/fn/promise";

export function getList(routerMap, parent) {
  // console.log(routerMap, parent);
  // 返回一个map对象
  return routerMap.map((item, i) => {
    // console.log([`@/view/${item.component}`]);

    console.log(item.component);
    const currentRouter = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `/home/${item.path}`,
      // 路由名称
      name: item.name || item.key || "",
      // 该路由对应页面的组件
      component: (resolve) => require([`@/view/${item.component}`], resolve),
      // component: require("@/view/" + item.component).default,
      //
      //标题
      title: item.meta.title,
      //源信息
      meta: item.meta,
      //
      key: item.key,
      // 是否隐藏 true隐藏
      hidden: item.hidden,
    };
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace("//", "/");
    console.log(currentRouter);

    // 路由重定向
    // item.redirect && (currentRouter.redirect = item.redirect);
    // 子菜单递归循环
    if (item.children && item.children.length > 0) {
      currentRouter.children = getList(item.children, currentRouter);
    }

    // 返回路由数组
    return currentRouter;
  });
}
