const router = require("koa-router")();

router.prefix("/api"); // 设置当前的请求前缀
router.post("/login", function(ctx) {
  ctx.body = {
    psd: "123123",
    username: "123123",
    test: "aaaaa"
  };
});

router.get("/zhuce", function(ctx) {
  ctx.body = "this is a users response!少时诵诗书所所";
});

module.exports = router;
