const router = require("koa-router")();
const Monk = require("monk");
// const db = new Monk("127.0.0.1:27017/yqn"); //链接到数据库 指定到yqn库
const db = new Monk("123.57.181.73:27017/yqn"); //链接到数据库 指定到yqn库
const user = db.get("user"); //选择用户列表
router.get("/", async ctx => {
  await ctx.render("index", {
    title: "Hello Koa 2!"
  });
});

router.get("/string", async ctx => {
  ctx.body = "koa2 string";
});

router.get("/json", async ctx => {
  let msg = await user.find(); //表查询
  ctx.body = msg
});

module.exports = router;
