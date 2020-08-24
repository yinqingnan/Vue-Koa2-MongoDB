import { createrouter } from "./createrouter";

export function concatrouter() {
  let obj = JSON.parse(localStorage.getItem("navlist"));
  let arr = createrouter(obj);

  const routers = [
    {
      path: "/home/index",
      name: "home",
      redirect: "/home/index",
      component: () => {
        return import("@/view/home/index.vue");
      },
      children: arr
    }
  ];
  return routers;
}
