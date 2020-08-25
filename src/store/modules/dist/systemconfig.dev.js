"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _types = require("../types");

var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
  collapsed: false,
  leftnav: true,
  topnav: false,
  theme: "dark" //模式有light  ，  dark 两种

};
var getters = {};
var mutations = (_mutations = {}, _defineProperty(_mutations, _types.MENUSIZE, function (state) {
  state.collapsed = !state.collapsed;
}), _defineProperty(_mutations, _types.CHANGENAV, function (state, data) {
  if (data == 0) {
    state.leftnav = true;
    state.topnav = false;
  } else {
    state.leftnav = false;
    state.topnav = true;
    state.theme = "light";
  }
}), _defineProperty(_mutations, _types.CHANGENAVCLOOR, function (state, data) {
  if (data == 0) {
    state.theme = "dark";
  } else {
    state.theme = "light";
  }
}), _mutations);
var _default = {
  namespaced: true,
  //命名空间
  state: state,
  getters: getters,
  mutations: mutations
};
exports["default"] = _default;