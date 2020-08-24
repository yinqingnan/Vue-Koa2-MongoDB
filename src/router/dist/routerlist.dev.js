"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routers = [{
  path: "/",
  name: "home",
  redirect: "/home/index",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/home/index.vue"));
    });
  },
  children: [{
    path: "/home/index",
    name: "index",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/index/index.vue"));
      });
    }
  }, {
    path: "/home/vue",
    name: "vue",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/Article/vue.vue"));
      });
    }
  }, {
    path: "/home/react",
    name: "react",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/Article/react.vue"));
      });
    }
  }, {
    path: "/home/serve",
    name: "serve",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/Article/serve.vue"));
      });
    }
  }, {
    path: "/home/applets",
    name: "applets",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/Article/applets.vue"));
      });
    }
  }, {
    path: "/home/other",
    name: "other",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/Article/other.vue"));
      });
    }
  }, {
    path: "/home/dynamic",
    name: "dynamic",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/Form/dynamicform.vue"));
      });
    }
  }, {
    path: "/home/dragform",
    name: "dragform",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/Form/dragform.vue"));
      });
    }
  }, {
    path: "/home/echarts",
    name: "echarts",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/echart/echarts.vue"));
      });
    }
  }, {
    path: "/home/basicstable",
    name: "basicstable",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/Tables/basicstable.vue"));
      });
    }
  }, {
    path: "/home/querytable",
    name: "querytable",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/Tables/querytable.vue"));
      });
    }
  }, {
    path: "/home/cardlist",
    name: "cardlist",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/Tables/cardlist.vue"));
      });
    }
  }, {
    path: "/home/edit",
    name: "edit",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/Tool/editor.vue"));
      });
    }
  }, {
    path: "/home/draglist",
    name: "draglist",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/Tool/darg.vue"));
      });
    }
  }, {
    path: "/home/menu",
    name: "menu",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/System/Menumanagement.vue"));
      });
    }
  }, {
    path: "/home/jurisdiction",
    name: "jurisdiction",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/System/Authoritymanagement.vue"));
      });
    }
  }, {
    path: "/home/role",
    name: "role",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/System/rolemanagement.vue"));
      });
    }
  }, {
    path: "/home/user",
    name: "user",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/view/DynamicMenu/System/usermanagement.vue"));
      });
    }
  }]
}, {
  path: "*",
  redirect: "/404"
}];
var _default = routers;
exports["default"] = _default;