"use strict";

var router = require("koa-router")();

var multer = require("koa-multer"); //加载koa-multer模块


var _filename = ""; // var msg = "";

var storage = multer.diskStorage({
  // 文件保存路径
  destination: function destination(req, file, cd) {
    cd(null, "public/images");
  },
  filename: function filename(req, file, cb) {
    var name = file.originalname;
    _filename = file.originalname;
    cb(null, name);
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
            path: "http://127.0.0.1:3000/images/" + _filename
          };

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;