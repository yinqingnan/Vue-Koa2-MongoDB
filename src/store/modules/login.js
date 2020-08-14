// 引入types
import { LOGIN, LOGOUT, USERNAME } from "../types";

const state = {
  token: window.sessionStorage.getItem("token"),
  username: ""
};
const getters = {};
const mutations = {
  //   [ADD_NUM](state, payload) {
  //     state.number += payload;
  //   }
  [LOGIN]: (state, data) => {
    //更改token的值
    state.token = data;
    window.sessionStorage.setItem("token", data);
  },
  [LOGOUT]: state => {
    //登出的时候要清除token
    state.token = null;
    window.sessionStorage.removeItem("token");
  },
  [USERNAME]: (state, data) => {
    //把用户名存起来
    state.username = data;
    window.sessionStorage.setItem("username", data);
  }
};

export default {
  namespaced: true, //命名空间
  state,
  getters,
  mutations
};
