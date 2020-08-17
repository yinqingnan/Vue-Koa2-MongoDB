const jwt = require("jsonwebtoken");
const serect = "my_token"; //密钥，不能丢
module.exports = userinfo => {
  //创建token并导出
  const token = jwt.sign(
    {
      user: userinfo.user,
      id: userinfo.id
    },
    serect, //秘钥
    { expiresIn: 1000 * 60 * 60 * 10 } // 设置token的过期时间
  );
  return token;
};
