"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loading = _interopRequireDefault(require("./loading.vue"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var instance = null;
var _default = {
  install: function install(Vue) {
    if (!instance) {
      //使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
      var myLoadComponent = Vue.extend(_loading["default"]); //实例化

      instance = new myLoadComponent({
        el: document.createElement("div")
      }); //挂载到body节点下 也可使用$root(根节点) 或者 new实例之后使用$mount()方法挂载到某个元素

      document.body.appendChild(instance.$el); //初始化关闭

      instance.isShow = false;
      /**
                instance为Vue基础构造器(Vue.extend()方法)创建出来的一个子类，里面有组件内所有参数(data,dethods)等
                在此使用instance.xxxx 即可直接修改组件内参数或者调用方法
            */
      // 自定义方法 操作组件内部的参数

      var customMethods = {
        show: function show() {
          instance.isShow = true;
        },
        hide: function hide() {
          instance.isShow = false;
        }
      }; //挂载自定义方法到Vue实例

      if (!Vue.$Loading) {
        Vue.$Loading = customMethods;
      } else {
        console.log("单例模式,组件已被占用");
      } //全局混入
      // Vue.mixin({
      //     created(){
      //         this.$Loading = Vue.$Loading;
      //     }
      // })
      //挂载到原型链上

      Vue.prototype.$Loading = Vue.$Loading;
    }
  }
}; // 界面使用方法，在main全局注册后通过调用方法使用
// this.$Loading.show();
// this.$Loading.hide();

exports["default"] = _default;
