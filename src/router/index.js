import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '@/views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/home/index",
    component: () => {
      return import("../view/home/index.vue");
    },
    children: [
      {
        path: "/home/index",
        name: "index",
        component: () => {
          return import("../view/index/index.vue");
        }
      },
      {
        path: "/home/nemgmt",
        name: "memgmt",
        component: () => {
          return import("../view/nemgmt/index.vue");
        }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => {
      // return import("../view/test.vue");
      // return import("../view/login/index.vue");
      return import("../view/user/login.vue");
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => {
      return import("../view/user/register.vue");
    }
  },
  {
    path: "/test",
    name: "Test",
    component: () => {
      return import("../view/test.vue");
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => {
      return import("../view/Error/error404.vue");
    }
  },
  {
    path: "/403",
    name: "403",
    component: () => {
      return import("../view/Error/error403.vue");
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => {
      return import("../view/Error/error500.vue");
    }
  }
  // {
  //   path: "/home",
  //   name: "Home",
  //   component: () => {
  //     return import("../view/home/index.vue");
  //   }
  // }
];
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
