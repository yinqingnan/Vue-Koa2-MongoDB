import { ADDNAV, ADDNAVLIST } from "../types";
const state = {
  nav: null,
  navlist: []
};
const getters = {};
const mutations = {
  [ADDNAV](state, val) {
    // console.log(data);
    // console.log(localStorage.getItem("nav"));
    state.nav = val;
  },
  [ADDNAVLIST](state, val) {
    state.navlist = val;
  }
};

export default {
  namespaced: true, //命名空间
  state,
  getters,
  mutations
};
