import { ADDNAV } from "../types";
const state = {
  nav: null
};
const getters = {};
const mutations = {
  [ADDNAV](state, data) {
    console.log(data);
    console.log(localStorage.getItem("nav"));
    state.nav = data;
  }
};

export default {
  namespaced: true, //命名空间
  state,
  getters,
  mutations
};
