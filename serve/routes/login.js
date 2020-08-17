const router = require("koa-router")();
// 引入操作数据库的中间件
const Monk = require("monk");
const db = new Monk("127.0.0.1:27017/yqn"); //链接到数据库 指定到yqn库
const user = db.get("user"); //选择当前库对应需要操作的表

const token = require("../token/createToken"); //引入生成token的方法

router.prefix("/api"); // 设置当前的请求前缀

// get请求 示例
// router.get("/login", function(ctx,e) {
//   let psd =  ctx.request.query.password
//   let name =ctx.request.query.userName
//   // console.log(psd   + name  )
//   ctx.body = {
//     psd,
//     name
//   };
// });

// post请求接收参数  post请求不能直接在页面上测试
router.post("/login", async ctx => {
  let postParam = ctx.request.body; // 接收的参数;
  // console.log(postParam);
  let psd = postParam.password;
  let name = postParam.userName;
  let msg = await user.find(); //表查询
  ctx.response.type = "application/json"; //设置返回的数据类型

  let obj = msg.filter(item => {
    console.log(item);
    return item.user === name;
  });
  if (obj.length === 0) {
    ctx.body = {
      code: 500,
      msg: "没有该账户信息"
    };
  } else {
    if (obj[0].psd === psd) {
      ctx.body = {
        code: 200,
        token: token(obj), //调用方法生成token
        msg: "登陆成功"
      };
      console.log(token(obj));
    } else {
      ctx.body = {
        code: 500,
        msg: "用户密码错误"
      };
    }
  }
});

// 请求示例
router.get("/getList", async ctx => {
  let st = await user.find();
  ctx.response.type = "application/json";
  ctx.body = st;
});

// 注册register

module.exports = router;
