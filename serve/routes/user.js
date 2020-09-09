const router = require("koa-router")();
// 引入操作数据库的中间件
const Monk = require("monk");
// const db = new Monk("127.0.0.1:27017/yqn"); //链接到本地数据库 指定到yqn库
const db = new Monk("123.57.181.73:27017/yqn"); //链接到远程数据库 指定到yqn库
const user = db.get("user"); //选择用户列表
const adminlist = db.get("AdminNav"); //admin用户列表
const OrdinaryNav = db.get("OrdinaryNav"); //普通admin用户列表
const token = require("../token/createToken"); //引入生成token的方法
const email = require('../lib/sendEmail'); //引入email封装好的函数
const check = {} //声明一个对象缓存邮箱和验证码，留着

router.prefix("/api"); // 设置当前的请求前缀

// get请求 示例获取参数
router.get("/login1", function (ctx, e) {
  let psd = ctx.request.query.password;
  let name = ctx.request.query.userName;
  // console.log(psd   + name  )
  ctx.body = {
    psd,
    name
  };
});
var CurrentName //当前登录的用户名称
// post请求接收参数  post请求不能直接在页面上测试
// 登陆
router.post("/login", async ctx => {
  let postParam = ctx.request.body; // 接收的参数;
  let psd = postParam.password;
  let name = postParam.userName;
  CurrentName = postParam.userName;
  let msg = await user.find(); //表查询
  ctx.response.type = "application/json"; //设置返回的数据类型

  let obj = msg.filter(item => {
    // console.log(item);
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
        msg: "登陆成功",
        jurisdiction: obj[0].jurisdiction
      };
      // console.log(token(obj));
    } else {
      ctx.body = {
        code: 500,
        msg: "用户密码错误"
      };
    }
  }
});
//模拟验证码生成
let verification = null;
router.post("/verification", async ctx => {
  let postParam = ctx.request.body; // 接收的参数;
  console.log(postParam);
  verification = Math.random()
    .toString()
    .slice(-6);
  ctx.body = verification;
});

// 请求示例
router.get("/getcode", async ctx => {
  // let st = await user.find();
  ctx.response.type = "application/json";
  // ctx.body = st;
  ctx.body = verification;
});

// 注册register
router.post("/register", async ctx => {
  let postParam = ctx.request.body; // 接收的参数;
  let msg = await user.find(); //表查询信息
  let userName = postParam.userName;
  let Vcode = postParam.Vcode;
  let psd = postParam.passwordOne;
  if (Vcode !== code) {
    ctx.body = {
      code: '500',
      msg: "验证码不正确"
    };
  } else {
    let obj = msg.filter(item => {
      console.log(item);
      return item.user === userName;
    });
    if (obj.length != "") {
      ctx.body = {
        code: '500',
        msg: "用户名已被注册"
      };
    } else {
      //将数据添加到数据库中
      let data = {
        user: userName,
        psd: psd,
        mailbox: postParam.mailbox

      };
      user.insert(data);
      ctx.body = {
        code: "200",
        msg: "添加成功",
      };
    }
  }
});

// 重置密码
router.post("/resetpsd", async ctx => {
  let postParam = ctx.request.body; // 接收的参数;
  let msg = await user.find(); //表查询信息
  if (postParam.Vcode !== verification) {
    ctx.body = {
      code: 500,
      msg: "验证码不正确"
    };
  } else {
    let obj = msg.filter(item => {
      return item.user === postParam.userName;
    });
    if (obj.length == "") {
      ctx.body = {
        code: 500,
        msg: "该用户名并未注册"
      };
    } else {
      let object = obj[0];
      object.psd = postParam.passwordOne;
      user.update({
        user: object.user
      }, {
        $set: {
          psd: object.psd
        }
      });
      ctx.body = {
        code: 200,
        msg: "修改成功，请用新密码登陆"
      };
    }
  }
});

//获取nav列表
router.post("/getnavlist", async ctx => {
  let postParam = ctx.request.body; // 接收的参数;
  let state = postParam.state;
  // 通过权限判断下发不同的导航列表
  // eslint-disable-next-line no-unused-vars
  let navlist = [];
  if (state == 0) {
    //admin用户登陆
    navlist = await adminlist.find(); //表查询
  } else {
    //普通用户登陆
    navlist = await OrdinaryNav.find(); //表查询
  }
  ctx.body = {
    code: 200,
    msg: "success",
    data: navlist,
  };
});
//获取nav列表
router.post("/getnavlist2", async ctx => {
  let postParam = ctx.request.body; // 接收的参数;
  let state = postParam.state;
  // 通过权限判断下发不同的导航列表
  // eslint-disable-next-line no-unused-vars
  let navlist = [];
  if (state == 0) {
    //admin用户登陆
    navlist = await adminlist.find(); //表查询
  } else {
    //普通用户登陆
    navlist = await OrdinaryNav.find(); //表查询
  }
  ctx.body = {
    code: 200,
    msg: "success",
    data: navlist
  };
});

// 修改密码
router.post('/modifypsd', async ctx => {
  let postParam = ctx.request.body; // 接收post的参数;
  ctx.body = {
    code: 1
  }
})


var code
router.post('/verify', async (ctx, next) => {
  var mail = ctx.request.body.email
  code = Math.random().toString().slice(-6) //生成随机验证码
  check[mail] = code
  if (!mail) {
    return ctx.body = '参数错误' //email出错时或者为空时
  }
  async function timeout() {
    return new Promise((resolve, reject) => {
      email.sendMail(mail, code, (state) => {
        resolve(state);
      })
    })
  }
  await timeout().then(state => {
    if (state) {
      return ctx.body = {
        msg: '邮件发送成功，请注意查看'
      }
    } else {
      return ctx.body = {
        msg: '邮件发送失败'
      }
    }
  })

})

module.exports = router;