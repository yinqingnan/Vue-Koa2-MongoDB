import { getList } from "./setRouter";

export function concatrouter() {
  let obj = JSON.parse(localStorage.getItem("navlist"));
  //   console.log(obj);
  let arr = getList(obj);
  console.log(...arr);

  const routers = [
    ...arr,
    {
      path: "*",
      redirect: "/404",
    },
  ];
  return routers;
}
