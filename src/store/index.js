import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { car, login, nav } from "./modules/index";

export default new Vuex.Store({
  modules: {
    car, //示例在test.vue文件
    login,
    nav
  }
});
