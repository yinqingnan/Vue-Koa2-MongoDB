import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '@/views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/home",
    component: () => {
      return import("../view/home/index.vue");
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => {
      // return import("../view/test.vue");
      // return import("../view/login/index.vue");
      return import("../view/login/login.vue");
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
    path: "/home",
    name: "Home",
    component: () => {
      return import("../view/home/index.vue");
    }
  }
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
