const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");

const onerror = require("koa-onerror");

const bodyparser = require("koa-bodyparser"); //用于接收并解析前台发送过来的post数据
const logger = require("koa-logger");

const jwtKoa = require("koa-jwt"); //引入token工具

// 导入路由配置信息
const index = require("./routes/index");
const user = require("./routes/user");
const article = require("./routes/article");

const cors = require("koa-cors"); // CORS是一个W3C标准，全称是"跨域资源共享" 用来解决前端的跨域
app.use(cors()); //全部允许跨域

// error handler
onerror(app);

const secret = "serect"; //密钥，不能丢

/* 路由权限控制 */
app.use(
  jwtKoa({ secret: secret }).unless({
    // 设置接口，可以不需要认证访问
    path: [
      /^\/images/,
      /^\/uploadimg/,
      /^\/api\/login/,
      /^\/api\/register/,
      /^\/api\/getlist/,
      /^\/api\/getcode/,
      /^\/api\/resetpsd/,
      /^\/api\/verification/
      // /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源，可以不需要认证访问
    ]
  })
);

// 接收参数类型定义
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 注册routes
app.use(index.routes(), index.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(article.routes(), article.allowedMethods());
// error - handling;
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

const hostName = "127.0.0.1"; //本地IP
const port = 3000; //端口
// 将koa和两个中间件连起来
app.listen(port, hostName, () => {
  console.log(`服务运行在http://${hostName}:${port}`);
});
module.exports = app;
