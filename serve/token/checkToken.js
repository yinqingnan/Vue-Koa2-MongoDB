// 检查效验token
const jwt = require("jsonwebtoken");
//检查token是否过期
module.exports = async (ctx, next) => {
  //拿到token
  const authorization = ctx.get("Authorization");
  if (authorization === "") {
    ctx.throw(401, "no token detected in http headerAuthorization");
  }
  const token = authorization;
  // eslint-disable-next-line no-unused-vars
  let tokenContent;
  try {
    tokenContent = await jwt.verify(token, "serect"); //如果token过期或验证失败，将抛出错误
  } catch (err) {
    ctx.throw(401, "invalid token");
  }
  await next();
};

// 先拿到token再用jwt.verify进行验证，注意此时密钥要对应上createToken.js的密钥‘zhangzhongjie’。如果token为空、过期、验证失败都抛出401错误，要求重新登录。
