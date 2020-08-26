"use strict";

var router = require("koa-router")(); // 引入操作数据库的中间件


var Monk = require("monk"); // const db = new Monk("127.0.0.1:27017/yqn"); //链接到本地数据库 指定到yqn库


var db = new Monk("123.57.181.73:27017/yqn"); //链接到远程数据库 指定到yqn库

var user = db.get("user"); //选择用户列表

var adminlist = db.get("AdminNav"); //admin用户列表

var OrdinaryNav = db.get("OrdinaryNav"); //普通admin用户列表

var token = require("../token/createToken"); //引入生成token的方法


router.prefix("/api"); // 设置当前的请求前缀
// get请求 示例获取参数

router.get("/login1", function (ctx, e) {
  var psd = ctx.request.query.password;
  var name = ctx.request.query.userName; // console.log(psd   + name  )

  ctx.body = {
    psd: psd,
    name: name
  };
}); // post请求接收参数  post请求不能直接在页面上测试
// 登陆

router.post("/login", function _callee(ctx) {
  var postParam, psd, name, msg, obj;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          postParam = ctx.request.body; // 接收的参数;

          psd = postParam.password;
          name = postParam.userName;
          _context.next = 5;
          return regeneratorRuntime.awrap(user.find());

        case 5:
          msg = _context.sent;
          //表查询
          ctx.response.type = "application/json"; //设置返回的数据类型

          obj = msg.filter(function (item) {
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
                token: token(obj),
                //调用方法生成token
                msg: "登陆成功",
                jurisdiction: obj[0].jurisdiction
              }; // console.log(token(obj));
            } else {
              ctx.body = {
                code: 500,
                msg: "用户密码错误"
              };
            }
          }

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}); //模拟验证码生成

var verification = null;
router.post("/verification", function _callee2(ctx) {
  var postParam;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          postParam = ctx.request.body; // 接收的参数;

          console.log(postParam);
          verification = Math.random().toString().slice(-6);
          ctx.body = verification;

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // 请求示例

router.get("/getcode", function _callee3(ctx) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // let st = await user.find();
          ctx.response.type = "application/json"; // ctx.body = st;

          ctx.body = verification;

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // 注册register

router.post("/register", function _callee4(ctx) {
  var postParam, msg, userName, Vcode, psd, obj, data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          postParam = ctx.request.body; // 接收的参数;

          _context4.next = 3;
          return regeneratorRuntime.awrap(user.find());

        case 3:
          msg = _context4.sent;
          //表查询信息
          userName = postParam.userName;
          Vcode = postParam.Vcode;
          psd = postParam.passwordOne;

          if (Vcode !== verification) {
            ctx.body = {
              code: 500,
              msg: "验证码不正确"
            };
          } else {
            obj = msg.filter(function (item) {
              console.log(item);
              return item.user === userName;
            });

            if (obj.length != "") {
              ctx.body = {
                code: 500,
                msg: "用户名已被注册"
              };
            } else {
              //将数据添加到数据库中
              data = {
                user: userName,
                psd: psd
              };
              user.insert(data);
              ctx.body = {
                code: "200",
                msg: "添加成功"
              };
            }
          }

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // 重置密码

router.post("/resetpsd", function _callee5(ctx) {
  var postParam, msg, obj, object;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          postParam = ctx.request.body; // 接收的参数;

          _context5.next = 3;
          return regeneratorRuntime.awrap(user.find());

        case 3:
          msg = _context5.sent;

          //表查询信息
          if (postParam.Vcode !== verification) {
            ctx.body = {
              code: 500,
              msg: "验证码不正确"
            };
          } else {
            obj = msg.filter(function (item) {
              return item.user === postParam.userName;
            });

            if (obj.length == "") {
              ctx.body = {
                code: 500,
                msg: "该用户名并未注册"
              };
            } else {
              object = obj[0];
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

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //获取nav列表

router.post("/getnavlist", function _callee6(ctx) {
  var postParam, state, navlist;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          postParam = ctx.request.body; // 接收的参数;

          state = postParam.state; // 通过权限判断下发不同的导航列表
          // eslint-disable-next-line no-unused-vars

          navlist = [];

          if (!(state == 0)) {
            _context6.next = 9;
            break;
          }

          _context6.next = 6;
          return regeneratorRuntime.awrap(adminlist.find());

        case 6:
          navlist = _context6.sent;
          _context6.next = 12;
          break;

        case 9:
          _context6.next = 11;
          return regeneratorRuntime.awrap(OrdinaryNav.find());

        case 11:
          navlist = _context6.sent;

        case 12:
          ctx.body = {
            code: 200,
            msg: "success",
            data: navlist
          };

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  });
});
module.exports = router;