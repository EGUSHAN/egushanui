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



// 金钱格式化，三位加逗号
export const formatMoney = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
