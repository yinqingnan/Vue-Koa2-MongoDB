import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./http/index"; //引入封装的axios

import { resetRouter } from "@/router/index.js"; //重置路由表方法
import { concatrouter } from "@/router/concatrouter"; //生成路由表方法
import Loading from "./lib/loading/index"; //引入lodaing
import NProgress from "nprogress"; // 引入进度条组件及css
import "nprogress/nprogress.css";
NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 200, showSpinner: false });
Vue.use(NProgress);
// 按需引入antd
import {
  Button,
  Form,
  Input,
  Checkbox,
  Icon,
  message,
  Select,
  Modal,
  Menu,
  Layout,
  notification,
  Switch,
  Drawer,
  Tooltip,
  Badge,
  Avatar,
  Dropdown,
  Popconfirm
} from "ant-design-vue";

Vue.component(Button.name, Button);
Vue.use(Loading);
Vue.use(api) //注册axiosAPI
  .use(Form)
  .use(Input)
  .use(Badge)
  .use(Layout)
  .use(Avatar)
  .use(Switch)
  .use(Checkbox)
  .use(Icon)
  .use(Dropdown)
  .use(Menu)
  .use(Select)
  .use(Modal)
  .use(Drawer)
  .use(Tooltip)
  .use(Popconfirm)
  .use(message);
Vue.prototype.$message = message; //全局注册message
Vue.prototype.$notification = notification; //全局注册message

Vue.config.productionTip = false;
//注册全局钩子用来拦截登陆导航
router.beforeEach(function(to, from, next) {
  NProgress.start();
  console.log(localStorage.getItem("lockpsd"));
  if (!localStorage.getItem("token")) {
    if (to.path !== "/login") {
      return next("/login");
    }
  } else if (localStorage.getItem("lockpsd")) {
    if (to.path !== "/lockscreen") {
      return next("/lockscreen");
    }
  } else {
    if (to.path !== "/login") {
      if (store.state.nav.navlist.length == 0) {
        store.state.nav.navlist = concatrouter(); //添加到store中
        resetRouter(); //重置路由
        router.addRoutes(concatrouter()); //添加新的路由表
        next({ ...to, replace: true });
        NProgress.done();
      } else {
        next();
        NProgress.done();
      }
    }
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
