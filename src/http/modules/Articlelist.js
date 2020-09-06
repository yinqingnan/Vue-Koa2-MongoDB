// eslint-disable-next-line no-unused-vars
import { get, post } from "@/http/api";

// 保存富文本文章列表
export const ArticleSave = obj => post("/content", obj);

//保存markdown文章列表
export const ArticleMarkdownsave = obj =>post('/markdownsave',obj)

//vue富文本界面导出数据展示
export const exportarticle =obj =>post('/exportarticle',obj)
