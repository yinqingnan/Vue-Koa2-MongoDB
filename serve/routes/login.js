const router = require("koa-router")();

router.prefix("/api"); // 设置当前的请求前缀

// post请求接收参数  // post请求不能直接在页面上请求

// get请求
// router.get("/login", function(ctx,e) {
//   let psd =  ctx.request.query.password
//   let name =ctx.request.query.userName
//   // console.log(psd   + name  )
//   ctx.body = {
//     psd,
//     name
//   };
// });

// post请求
router.post("/login", function(ctx) {
  let postParam = ctx.request.body;
  console.log(postParam);
  let psd = postParam.password;
  let name = postParam.userName;
  ctx.body = {
    psd,
    name,
  };
});

router.get("/zhuce", function(ctx) {
  ctx.body = "this is a users response!少时诵诗书所所";
});

module.exports = router;
