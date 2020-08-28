"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Article123123 = exports.ArticleSave = void 0;

var _api = require("@/http/api");

// eslint-disable-next-line no-unused-vars
// 保存文章列表
var ArticleSave = function ArticleSave(obj) {
  return (0, _api.post)("/content", obj);
};

exports.ArticleSave = ArticleSave;

var Article123123 = function Article123123(obj) {
  return (0, _api.post)("/content123123", obj);
};

exports.Article123123 = Article123123;