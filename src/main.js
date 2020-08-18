import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./http/index"; //引入封装的axios
import vueWaves from "./lib/directive/waves"; //使用点击波纹涟漪效果
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
  notification
} from "ant-design-vue";

Vue.component(Button.name, Button);
Vue.use(api) //注册axiosAPI
  .use(Form)
  .use(Input)
  .use(Layout)
  .use(Checkbox)
  .use(Icon)
  .use(Menu)
  .use(Select)
  .use(Modal)
  .use(message);
Vue.prototype.$message = message; //全局注册message
Vue.prototype.$notification = notification; //全局注册message

Vue.config.productionTip = false;
//注册全局钩子用来拦截登陆导航
router.beforeEach(function(to, from, next) {
  // console.log(localStorage.getItem("token"));
  if (!localStorage.getItem("token")) {
    if (to.path !== "/login") {
      return next("/login");
    }
  }
  next();
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
