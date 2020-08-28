"use strict";

var router = require("koa-router")();

var multer = require("koa-multer"); //加载koa-multer模块
// 引入操作数据库的中间件


var Monk = require("monk");

var db = new Monk("123.57.181.73:27017/yqn"); //链接到远程数据库 指定到yqn库

var Article = db.get("Articlelist"); //选择文章列表
// router.prefix("/article"); // 设置当前的请求前缀
// 保存图片

var _filename = "";
var storage = multer.diskStorage({
  // 文件保存路径
  destination: function destination(req, file, cd) {
    cd(null, "public/images/Background"); //设置图片保存地址，该路径必须提前存在才生效
  },
  filename: function filename(req, file, cb) {
    var name = file.originalname;
    _filename = file.originalname;
    cb(null, name); //设置文件的名称
  }
});
var upload = multer({
  storage: storage
});
router.post("/uploadimg", upload.array("file"), function _callee(ctx) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ctx.body = {
            path: "http://123.57.181.73:3000/images/Background/" + _filename //返回图片路径

          };

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}); //保存编辑器的内容到服务器

router.post("/content", function _callee2(ctx) {
  var postParam, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          postParam = ctx.request.body; // 接收的参数;

          Article.insert(postParam);
          _context2.next = 4;
          return regeneratorRuntime.awrap(Article.find());

        case 4:
          data = _context2.sent;
          //查询当前所有的列表
          ctx.body = {
            code: "200",
            msg: "添加成功",
            data: data
          };

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post("/content123123", function _callee3(ctx) {
  var postParam;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          postParam = ctx.request.body; // 接收的参数;

          Article.insert(postParam);
          ctx.body = {
            code: "200",
            msg: "添加成功",
            data: postParam
          };

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;