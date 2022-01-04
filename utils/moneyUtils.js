/*
 * @Author: EGUSHAN
 * @Date: 2021-12-30 10:28:42
 * @LastEditTime: 2021-12-30 10:29:51
 * @LastEditors: Please set LastEditors
 * @Description: 价格转换
 * @FilePath: \egushanui\utils\moneyUtils.js
 */

// 钱币从后台到前台时除以100，数据库里存的是分
export function m2front(money) {
  return money === "" || typeof money === "undefined" ? "" : parseFloat((money / 100).toFixed(2));
}

// 和m2front基本相同功能，但是返回的toFixed之后的字符串
export function m2frontFixed(money, precision = 2) {
  return money === "" || typeof money === "undefined" ? "" : (money / 100).toFixed(precision);
}

// 钱币从前台到后台时乘以100
export function m2back(money) {
  return money === "" || typeof money === "undefined" ? "" : Math.round(money * 100);
}

// 验证正整数
export function formatNumber(e) {
  let flag = new RegExp("^[1-9]([0-9])*$").test(e);
  if (!flag) {
    return true;
  }
}
