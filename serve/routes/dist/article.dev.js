"use strict";

var router = require("koa-router")();

var multer = require("koa-multer"); //加载koa-multer模块


var storage = multer.diskStorage({
  // 文件保存路径
  destination: function destination(req, file, cd) {
    cd(null, "../public/images");
  },
  filename: function filename(req, file, cb) {
    // 设置 文件名
    var name = file.originalname;
    var extension = name.substring(name.length - 4);
    console.log(name);
    console.log(extension);
    cb(null, "img-" + Date.now() + extension);
  }
});
var upload = multer({
  storage: storage
});
router.post("/uploadimg", upload.array("avatar"), function _callee(ctx) {
  var files;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // eslint-disable-next-line no-unused-vars
          files = ctx.req.files; //上传过来的文件

          console.log(files);
          ctx.body = {
            msg: "添加成功"
          }; //返回数据

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;