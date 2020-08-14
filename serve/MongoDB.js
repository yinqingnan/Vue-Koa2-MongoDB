// // 连接数据库
// const mongoose = require("mongoose");
// // mongoose连接方式     connetion，还有connect()和createConnection()
// mongoose.connect("mongodb://localhost:27017");
// let db = mongoose.connection;
// // 防止Mongoose: mpromise 错误
// mongoose.Promise = global.Promise;
// db.on("error", function() {
//   console.log("数据库连接出错！");
// });
// db.on("open", function() {
//   console.log("数据库连接成功！");
// });
// //声明schema
// const user = mongoose.Schema({
//   username: String,
//   password: String,
//   token: String,
//   create_time: Date
// });
// //根据schema生成model
// const User = mongoose.model("yqn", user); // 数据库名称，表名称

// module.exports = User;
