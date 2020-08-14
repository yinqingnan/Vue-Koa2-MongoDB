// 引入types
import { ADD_NUM } from "../types";

const state = {
  number: 100
};
const getters = {};
const mutations = {
  [ADD_NUM](state, payload) {
    state.number += payload;
  }
};

export default {
  namespaced: true, //命名空间
  state,
  getters,
  mutations
};
