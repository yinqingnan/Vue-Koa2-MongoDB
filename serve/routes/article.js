const router = require("koa-router")();
const multer = require("koa-multer"); //加载koa-multer模块

var storage = multer.diskStorage({
  // 文件保存路径
  destination: function(req, file, cd) {
    cd(null, "../public/images");
  },
  filename(req, file, cb) {
    // 设置 文件名
    const name = file.originalname;
    const extension = name.substring(name.length - 4);
    console.log(name);
    console.log(extension);
    cb(null, "img-" + Date.now() + extension);
  }
});

var upload = multer({ storage: storage });
router.post("/uploadimg", upload.array("avatar"), async ctx => {
  // eslint-disable-next-line no-unused-vars
  const files = ctx.req.files; //上传过来的文件
  console.log(files);
  ctx.body = { msg: "添加成功" }; //返回数据
});

module.exports = router;
