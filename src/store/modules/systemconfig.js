import { MENUSIZE } from "../types";
const state = {
    collapsed: false
};
const getters = {};
const mutations = {
  [MENUSIZE](state) {
    state.collapsed = !state.collapsed
  }
};

export default {
  namespaced: true, //命名空间
  state,
  getters,
  mutations
};