"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getList = getList;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// eslint-disable-next-line no-unused-vars
function getList(routerMap, parent) {
  var routerarr = [];
  routerMap.map(function (item) {
    if (item.children == null) {
      routerarr.push(item);
    } else {
      routerarr.push.apply(routerarr, _toConsumableArray(item.children));
    }
  }); // console.log(routerarr);

  return routerarr.map(function (item) {
    var currentRouter = {
      path: "/home/".concat(item.path),
      // 路由地址 动态拼接生成如 /dashboard/workplace
      name: item.name || item.key || "",
      // 路由名称
      component: function component(resolve) {
        return require(["@/view/" + item.component], resolve);
      },
      // 该路由对应页面的组件
      title: item.meta.title,
      //标题
      meta: item.meta,
      //源信息
      key: item.key,
      //key值
      hidden: item.hidden // 是否隐藏 true隐藏

    };
    currentRouter.path = currentRouter.path.replace("//", "/");
    item.redirect && (currentRouter.redirect = item.redirect); // 路由重定向
    // console.log(currentRouter);

    return currentRouter;
  }); // 废弃
  // eslint-disable-next-line no-unused-vars
  // return routerMap.map((item, i) => {
  //   // console.log(item.children);
  //   // if()
  //   const currentRouter = {
  //     // 路由地址 动态拼接生成如 /dashboard/workplace
  //     path: `/home/${item.path}`,
  //     // 路由名称
  //     name: item.name || item.key || "",
  //     // 该路由对应页面的组件
  //     component: resolve => require(["@/view/" + item.component], resolve),
  //     //标题
  //     title: item.meta.title,
  //     //源信息
  //     meta: item.meta,
  //     //
  //     key: item.key,
  //     // 是否隐藏 true隐藏
  //     hidden: item.hidden
  //   };
  //   // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
  //   currentRouter.path = currentRouter.path.replace("//", "/");
  //   // console.log(currentRouter);
  //   // 路由重定向
  //   item.redirect && (currentRouter.redirect = item.redirect);
  //   // 子菜单递归循环
  //   if (item.children && item.children.length > 0) {
  //     currentRouter.children = getList(item.children, currentRouter);
  //   }
  //   // 返回路由数组
  //   return currentRouter;
  // });
}