import { get, post } from "../api";

// 登陆
export const login = obj => post("/api/login", obj);
//用户注册
export const userRegister = obj => get("/api/login", obj);
//获取用户
export const getUser = obj => get("/api/login", obj);
//删除用户
export const delUser = obj => get("/api/login", obj);
