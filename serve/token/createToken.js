// 增token的函数
const jwt = require("jsonwebtoken");
module.exports = function(user_id) {
  const token = jwt.sign({ user_id: user_id }, "Validitytoken", {
    expiresIn: "60s"
  });
  return token;
};

// 创建token时，我们把用户名作为JWT Validitytoken,token过期时间设置为60s。意思是登录之后，60s内刷新页面不需要再重新登录
