"use strict";

var Koa = require("koa");

var app = new Koa();

var views = require("koa-views");

var json = require("koa-json");

var onerror = require("koa-onerror");

var bodyparser = require("koa-bodyparser"); //用于接收并解析前台发送过来的post数据


var logger = require("koa-logger");

var jwtKoa = require("koa-jwt"); //引入token工具
// 导入路由配置信息


var index = require("./routes/index");

var user = require("./routes/user");

var article = require("./routes/article");

var cors = require("koa-cors"); // CORS是一个W3C标准，全称是"跨域资源共享" 用来解决前端的跨域


app.use(cors()); //全部允许跨域
// error handler

onerror(app);
var secret = "serect"; //密钥，不能丢

/* 路由权限控制 */

app.use(jwtKoa({
  secret: secret
}).unless({
  // 设置接口，可以不需要认证访问
  path: [/^\/json/, /^\/uploadimg/, /^\/api\/login/, /^\/api\/register/, /^\/api\/getlist/, /^\/api\/getcode/, /^\/api\/resetpsd/, /^\/api\/verification/ // /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
})); // 接收参数类型定义

app.use(bodyparser({
  enableTypes: ["json", "form", "text"]
}));
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));
app.use(views(__dirname + "/views", {
  extension: "pug"
})); // logger

app.use(function _callee(ctx, next) {
  var start, ms;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          start = new Date();
          _context.next = 3;
          return regeneratorRuntime.awrap(next());

        case 3:
          ms = new Date() - start;
          console.log("".concat(ctx.method, " ").concat(ctx.url, " - ").concat(ms, "ms"));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); // 注册routes

app.use(index.routes(), index.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(article.routes(), article.allowedMethods()); // error - handling;

app.on("error", function (err, ctx) {
  console.error("server error", err, ctx);
});
var hostName = "127.0.0.1"; //本地IP

var port = 3000; //端口
// 将koa和两个中间件连起来

app.listen(port, hostName, function () {
  console.log("\u670D\u52A1\u8FD0\u884C\u5728http://".concat(hostName, ":").concat(port));
});
module.exports = app;