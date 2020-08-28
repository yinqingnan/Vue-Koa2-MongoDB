const router = require("koa-router")();
const multer = require("koa-multer"); //加载koa-multer模块
// 引入操作数据库的中间件
const Monk = require("monk");
const db = new Monk("123.57.181.73:27017/yqn"); //链接到远程数据库 指定到yqn库
const Article = db.get("Articlelist"); //选择文章列表
// router.prefix("/article"); // 设置当前的请求前缀
// 保存图片
var filename = "";
var storage = multer.diskStorage({
  // 文件保存路径
  destination: function(req, file, cd) {
    cd(null, "public/images/Background"); //设置图片保存地址，该路径必须提前存在才生效
  },

  filename(req, file, cb) {
    const name = file.originalname;
    filename = file.originalname;
    cb(null, name); //设置文件的名称
  }
});

var upload = multer({ storage: storage });
router.post("/uploadimg", upload.array("file"), async ctx => {
  ctx.body = {
    path: "http://123.57.181.73:3000/images/Background/" + filename //返回图片路径
  };
});

//保存编辑器的内容到服务器
router.post("/content", async ctx => {
  let postParam = ctx.request.body; // 接收的参数;
  Article.insert(postParam);
  var data = await Article.find(); //查询当前所有的列表
  ctx.body = {
    code: "200",
    msg: "添加成功",
    data: data
  };
});

router.post("/content123123", async ctx => {
  let postParam = ctx.request.body; // 接收的参数;
  Article.insert(postParam);
  ctx.body = {
    code: "200",
    msg: "添加成功",
    data: postParam
  };
});
module.exports = router;
