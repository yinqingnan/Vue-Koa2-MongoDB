import { get, post } from "../api";

export const usertabledata = obj => get("/sys/user/list", obj);
export const userupdate = obj => post("/sys/user/update", obj);
export const usersave = obj => post("/sys/user/save", obj);
export const userdlt = obj => post("/sys/user/delete", obj);

export const userdisable = obj => post("/sys/user/disable", obj);
export const userenable = obj => post("/sys/user/enable", obj);
