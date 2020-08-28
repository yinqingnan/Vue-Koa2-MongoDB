// eslint-disable-next-line no-unused-vars
import { get, post } from "@/http/api";

// 保存文章列表
export const ArticleSave = obj => post("/content", obj);

// export const Article123123 = obj => post("/content123123", obj);
