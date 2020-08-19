import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { car, login, nav,systemconfig } from "./modules/index";
export default new Vuex.Store({
  modules: {
    car, //示例在test.vue文件
    login,   //登录
    nav,  //左侧导航菜单
    systemconfig    //系统设置
  }
});
