import { get, post } from "../api";

export const getnavlist = obj => post("/api/getnavlist", obj);
