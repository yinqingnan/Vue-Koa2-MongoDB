/**
 * 自动化处理文件：自动引入接口的核心文件
 */
const merge = require("webpack-merge");
const files = require.context(".", true, /\.js$/);

let configInterface;
/**
 * merge interface
 */

// console.log(files.keys()); // ["./news.js"] 返回一个数组

files.keys().forEach(key => {
  if (key === "./index.js") return;
  const filesConfig = files(key);
  configInterface = merge(
    {},
    configInterface,
    filesConfig.default || filesConfig
  ); // 读取出文件中的default模块
});
// console.log(configInterface);
export default configInterface;
