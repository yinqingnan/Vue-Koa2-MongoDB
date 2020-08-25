import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '@/views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home/index"
  },
  {
    path: "/lockscreen",
    name: "Lockscreen",
    component: () => {
      return import("@/view/Lockscreen/Lockscreen.vue");
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => {
      return import("@/view/user/login.vue");
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => {
      return import("@/view/user/register.vue");
    }
  },
  {
    path: "/test",
    name: "Test",
    component: () => {
      return import("@/view/test.vue");
    }
  },
  {
    path: "/home/404",
    name: "404",
    // redirect: "/404",
    component: () => {
      return import("@/view/Error/error404.vue");
    }
  },
  {
    path: "/home/403",
    name: "403",
    // redirect: "/403",
    component: () => {
      return import("@/view/Error/error403.vue");
    }
  },
  {
    path: "/home/500",
    name: "500",
    // redirect: "/500",
    component: () => {
      return import("@/view/Error/error500.vue");
    }
  }
];
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const createRouter = () =>
  new VueRouter({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}
export default router;
