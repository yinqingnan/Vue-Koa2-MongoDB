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
          return import("../view/DynamicMenu/notice/notice.vue");
        }
      },
      {
        path: "/home/vue",
        name: "vue",
        component: () => {
          return import("../view/DynamicMenu/Article/vue.vue");
        }
      },
      {
        path: "/home/react",
        name: "react",
        component: () => {
          return import("../view/DynamicMenu/Article/react.vue");
        }
      },
      {
        path: "/home/serve",
        name: "serve",
        component: () => {
          return import("../view/DynamicMenu/Article/serve.vue");
        }
      },
      {
        path: "/home/applets",
        name: "applets",
        component: () => {
          return import("../view/DynamicMenu/Article/applets.vue");
        }
      },
      {
        path: "/home/other",
        name: "other",
        component: () => {
          return import("../view/DynamicMenu/Article/other.vue");
        }
      },
      {
        path: "/home/dynamic",
        name: "dynamic",
        component: () => {
          return import("../view/DynamicMenu/Form/dynamicform.vue");
        }
      },
      {
        path: "/home/budgetLS2",
        name: "budgetLS2",
        component: () => {
          return import("../view/DynamicMenu/Form/seniorform.vue");
        }
      },

      {
        path: "/home/dragform",
        name: "dragform",
        component: () => {
          return import("../view/DynamicMenu/Form/dragform.vue");
        }
      },
      {
        path: "/home/echarts",
        name: "echarts",
        component: () => {
          return import("../view/DynamicMenu/echart/echarts.vue");
        }
      },
      {
        path: "/home/basicstable",
        name: "basicstable",
        component: () => {
          return import("../view/DynamicMenu/Tables/basicstable.vue");
        }
      },
      {
        path: "/home/querytable",
        name: "querytable",
        component: () => {
          return import("../view/DynamicMenu/Tables/querytable.vue");
        }
      },
      {
        path: "/home/querytable",
        name: "querytable",
        component: () => {
          return import("../view/DynamicMenu/Tables/querytable.vue");
        }
      },
      {
        path: "/home/cardlist",
        name: "cardlist",
        component: () => {
          return import("../view/DynamicMenu/Tables/cardlist.vue");
        }
      },
      {
        path: "/home/edit",
        name: "edit",
        component: () => {
          return import("../view/DynamicMenu/Tool/editor.vue");
        }
      },
      {
        path: "/home/draglist",
        name: "draglist",
        component: () => {
          return import("../view/DynamicMenu/Tool/darg.vue");
        }
      },
      {
        path: "/home/menu",
        name: "menu",
        component: () => {
          return import("../view/DynamicMenu/System/Menumanagement.vue");
        }
      },
      {
        path: "/home/jurisdiction",
        name: "jurisdiction",
        component: () => {
          return import("../view/DynamicMenu/System/Authoritymanagement.vue");
        }
      },
      {
        path: "/home/role",
        name: "role",
        component: () => {
          return import("../view/DynamicMenu/System/rolemanagement.vue");
        }
      },
      {
        path: "/home/user",
        name: "user",
        component: () => {
          return import("../view/DynamicMenu/System/usermanagement.vue");
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
