import { MENUSIZE, CHANGENAV, CHANGENAVCLOOR } from "../types";
const state = {
  collapsed: false,
  leftnav: true,
  topnav: false,
  theme: "dark" //模式有light  ，  dark 两种
};
const getters = {};
const mutations = {
  [MENUSIZE](state) {
    state.collapsed = !state.collapsed;
  },
  [CHANGENAV](state, data) {
    if (data == 0) {
      state.leftnav = true;
      state.topnav = false;
    } else {
      state.leftnav = false;
      state.topnav = true;
    }
  },
  [CHANGENAVCLOOR](state, data) {
    if (data == 0) {
      state.theme = "dark";
    } else {
      state.theme = "light";
    }
  }
};

export default {
  namespaced: true, //命名空间
  state,
  getters,
  mutations
};
