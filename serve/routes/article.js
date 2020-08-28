const router = require("koa-router")();
const multer = require("koa-multer"); //加载koa-multer模块
var filename = "";
// var msg = "";
var storage = multer.diskStorage({
  // 文件保存路径
  destination: function(req, file, cd) {
    cd(null, "public/images");
  },

  filename(req, file, cb) {
    const name = file.originalname;
    filename = file.originalname;
    cb(null, name);
  }
});

var upload = multer({ storage: storage });
router.post("/uploadimg", upload.array("file"), async ctx => {
  ctx.body = {
    path: "http://127.0.0.1:3000/images/" + filename
  };
});

module.exports = router;
