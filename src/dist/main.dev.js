"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _index = _interopRequireDefault(require("./http/index"));

var _index2 = require("@/router/index.js");

var _concatrouter = require("@/router/concatrouter");

var _index3 = _interopRequireDefault(require("./lib/loading/index"));

var _nprogress = _interopRequireDefault(require("nprogress"));

require("nprogress/nprogress.css");

var _antDesignVue = require("ant-design-vue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import VueQuillEditor from "vue-quill-editor";
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
// Vue.use(VueQuillEditor);
_nprogress["default"].inc(0.2);

_nprogress["default"].configure({
  easing: "ease",
  speed: 200,
  showSpinner: false
});

_vue["default"].use(_nprogress["default"]); // 按需引入antd


_vue["default"].component(_antDesignVue.Button.name, _antDesignVue.Button);

_vue["default"].use(_index3["default"]);

_vue["default"].use(_index["default"]) //注册axiosAPI
.use(_antDesignVue.Form).use(_antDesignVue.Input).use(_antDesignVue.TimePicker).use(_antDesignVue.DatePicker).use(_antDesignVue.Upload).use(_antDesignVue.Badge).use(_antDesignVue.Col).use(_antDesignVue.Layout).use(_antDesignVue.Avatar).use(_antDesignVue.Row).use(_antDesignVue.Switch).use(_antDesignVue.Checkbox).use(_antDesignVue.Icon).use(_antDesignVue.Dropdown).use(_antDesignVue.Menu).use(_antDesignVue.Select).use(_antDesignVue.Modal).use(_antDesignVue.Drawer).use(_antDesignVue.Tooltip).use(_antDesignVue.Popconfirm) // .use(draggable)
.use(_antDesignVue.message);

_vue["default"].prototype.$message = _antDesignVue.message; //全局注册message

_vue["default"].prototype.$notification = _antDesignVue.notification; //全局注册message

_vue["default"].config.productionTip = false; //注册全局钩子用来拦截登陆导航

_router["default"].beforeEach(function (to, from, next) {
  _nprogress["default"].start(); // console.log(localStorage.getItem("lockpsd"));


  if (!localStorage.getItem("token")) {
    if (to.path !== "/login") {
      return next("/login");
    }
  } else if (localStorage.getItem("lockpsd")) {
    if (to.path !== "/lockscreen") {
      return next("/lockscreen");
    }
  } else {
    if (to.path !== "/login") {
      if (_store["default"].state.nav.navlist.length == 0) {
        _store["default"].state.nav.navlist = (0, _concatrouter.concatrouter)(); //添加到store中

        (0, _index2.resetRouter)(); //重置路由

        _router["default"].addRoutes((0, _concatrouter.concatrouter)()); //添加新的路由表


        next(_objectSpread({}, to, {
          replace: true
        }));

        _nprogress["default"].done();
      } else {
        next();

        _nprogress["default"].done();
      }
    }
  }

  next();
});

_router["default"].afterEach(function () {
  _nprogress["default"].done();
});

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");