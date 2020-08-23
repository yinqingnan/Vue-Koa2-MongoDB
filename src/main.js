import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./http/index"; //引入封装的axios
import vueWaves from "./lib/directive/waves"; //使用点击波纹涟漪效果

import { resetRouter } from "@/router/index.js";
import routerlist from "./router/routerlist.js";
import { concatrouter } from "./router/concatrouter";

Vue.use(vueWaves);

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
} from "ant-design-vue";

// console.log(routerlist);
Vue.component(Button.name, Button);
Vue.use(api) //注册axiosAPI
  .use(Form)
  .use(Input)
  .use(Layout)
  .use(Switch)
  .use(Checkbox)
  .use(Icon)
  .use(Menu)
  .use(Select)
  .use(Modal)
  .use(Drawer)
  .use(message);
Vue.prototype.$message = message; //全局注册message
Vue.prototype.$notification = notification; //全局注册message

Vue.config.productionTip = false;
//注册全局钩子用来拦截登陆导航
router.beforeEach(function(to, from, next) {
  if (!localStorage.getItem("token")) {
    if (to.path !== "/login") {
      return next("/login");
    }
  } else {
    if (to.path !== "/login") {
      if (store.state.nav.navlist.length == 0) {
        store.state.nav.navlist = routerlist;
        resetRouter();
        router.addRoutes(routerlist);
        next({ ...to, replace: true });
      } else {
        next();
      }
    }
  }
  next();
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
