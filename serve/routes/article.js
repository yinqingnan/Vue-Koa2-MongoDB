const router = require("koa-router")();
const multer = require("koa-multer"); //加载koa-multer模块
// 引入操作数据库的中间件
const Monk = require("monk");
const db = new Monk("123.57.181.73:27017/yqn"); //链接到远程数据库 指定到yqn库
const Article = db.get("Articlelist"); //选择富文本文章列表
const ArticleMarkdown = db.get("ArticleMarkdown"); //选择markdown文章列表

// router.prefix("/article"); // 设置当前的请求前缀
// 保存图片
var filename = "";
var storage = multer.diskStorage({
  // 文件保存路径
  destination: function (req, file, cd) {
    cd(null, "public/images/Background"); //设置图片保存地址，该路径必须提前存在才生效
  },

  filename(req, file, cb) {
    const name = file.originalname;
    filename = file.originalname;
    cb(null, name); //设置文件的名称
  }
});

var upload = multer({
  storage: storage
});
router.post("/uploadimg", upload.array("file"), async ctx => {
  ctx.body = {
    path: "http://123.57.181.73:3000/images/Background/" + filename //返回图片路径
  };
});

//保存富文本编辑器的内容
router.post("/content", async ctx => {
  let postParam = ctx.request.body; // 接收post的参数;
  Article.insert(postParam);
  console.log(postParam);
  ctx.body = {
    code: "200",
    msg: "添加成功",
    // data: data
  };
});

//保存markdown编辑器的内容

router.post("/markdownsave", async ctx => {
  let postParam = ctx.request.body; // 接收post的参数;
  ArticleMarkdown.insert(postParam);
  ctx.body = {
    code: "200",
    msg: "添加成功",
  };
})

// 查询数据库文章列表
router.post('/exportarticle', async ctx => {
  let postParam = ctx.request.body; // 接收post的参数;
  let Richtext = await Article.find({
    tag: postParam.type
  }); //查询当前所有的列表
  let Markdown = await ArticleMarkdown.find({
    tag: postParam.type
  }); //查询当前所有的列表
  console.log(postParam)
  console.log(Richtext)
  console.log(Markdown)
  ctx.body = {
    code: "200",
    msg: "查询成功",
    state: 'postParam.type',
    data: {
      Richtext,
      Markdown
    }
  };
})
// 文章删除
router.post("/listdlt", async ctx => {
  let postParam = ctx.request.body; // 接收post的参数;
  let Richtext = await Article.find({
    id: postParam.id
  }); //查询edit当前所有的列表数据
  let Markdown = await ArticleMarkdown.find({
    id: postParam.id
  }); //查询markdown所有的列表数据
  let data
  if (Richtext.length != "") {
    if (Richtext[0].id == postParam.id) {
      Article.remove({
        id: postParam.id
      })
      data = true
    } else {
      data = false
    }
  }
  if (Markdown.length != "") {
    if (Markdown[0].id == postParam.id) {
      ArticleMarkdown.remove({
        id: postParam.id
      })
      data = true
    } else {
      data = false
    }
  }
  if (data) {
    ctx.body = {
      code: '200',
      msg: '操作成功',
      data
    }
  } else {
    ctx.body = {
      code: '500',
      msg: '操作失败',
      data
    }
  }

})

module.exports = router;