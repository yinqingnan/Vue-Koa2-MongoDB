"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetRouter = resetRouter;
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import Home from '@/views/Home.vue'
_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/",
  redirect: "/home/index"
}, {
  path: "/lockscreen",
  name: "Lockscreen",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/Lockscreen/Lockscreen.vue"));
    });
  }
}, {
  path: "/login",
  name: "Login",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/user/login.vue"));
    });
  }
}, {
  path: "/register",
  name: "Register",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/user/register.vue"));
    });
  }
}, {
  path: "/test",
  name: "Test",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/test.vue"));
    });
  }
}, {
  path: "/home/404",
  name: "404",
  // redirect: "/404",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/Error/error404.vue"));
    });
  }
}, {
  path: "/home/403",
  name: "403",
  // redirect: "/403",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/Error/error403.vue"));
    });
  }
}, {
  path: "/home/500",
  name: "500",
  // redirect: "/500",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/Error/error500.vue"));
    });
  }
}];
var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
};

var createRouter = function createRouter() {
  return new _vueRouter["default"]({
    mode: "history",
    scrollBehavior: function scrollBehavior() {
      return {
        y: 0
      };
    },
    routes: routes
  });
};

var router = createRouter();

function resetRouter() {
  var newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

var _default = router;
exports["default"] = _default;