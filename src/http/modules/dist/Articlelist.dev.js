"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArticleSave = void 0;

var _api = require("@/http/api");

// eslint-disable-next-line no-unused-vars
// 保存文章列表
var ArticleSave = function ArticleSave(obj) {
  return (0, _api.post)("/content", obj);
}; // export const Article123123 = obj => post("/content123123", obj);


exports.ArticleSave = ArticleSave;