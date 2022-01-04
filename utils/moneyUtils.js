let CHNCHAR = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
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
export const formatMoney = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");



//  数值转换成中文大写
export function uppercaseNumber(x) {
  let str = "";

  if (typeof x != "number" || isNaN(x) || x > 100000000) return str;

  let iWan = Math.floor(x / 10000);
  let i1 = Math.floor(x - iWan * 10000);
  let iJF = Math.round(x * 100) % 100;
  let iJ = Math.floor(iJF / 10);
  let iF = iJF % 10;

  if (iWan != 0) {
    str += transferMoney(iWan) + "万";
  }

  // 只有在万位的个位不是0，以及千位不是0的情况下，才不用加零
  if (!(iWan % 10 != 0 && Math.floor(i1 / 1000))) {
    if (i1 != 0 && iWan != 0) {
      str += CHNCHAR[0];
    }
  }
  // 0

  if (i1 != 0) {
    str += transferMoney(i1);
  }

  if (str != "") {
    str += "元";
    if (iJ != 0 || iF != 0) {
      if (iJ != 0) {
        str += CHNCHAR[iJ] + "角";
      }

      if (iF != 0) {
        str += CHNCHAR[iF] + "分";
      }
    } else {
      str += "整";
    }
  } else {
    if (iJ != 0 || iF != 0) {
      if (iJ != 0) {
        str += CHNCHAR[iJ] + "角";
      }

      if (iF != 0) {
        str += CHNCHAR[iF] + "分";
      }
    } else {
      str += "零元整";
    }
  }
  return str;
}

function transferMoney(x) {
  let str = "";

  if (typeof x != "number" || isNaN(x) || x > 10000) return str;
  x = Math.floor(x);

  let i1 = x % 10;
  let iT = Math.floor(x / 10) % 10;
  let iH = Math.floor(x / 100) % 10;
  let iS = Math.floor(x / 1000) % 10;

  if (iS != 0) {
    // 千位不为0
    str += CHNCHAR[iS] + "仟";
    if (iH != 0) {
      // 千位不为0，百位不为0
      str += CHNCHAR[iH] + "佰";
      if (iT != 0) {
        // 千位不为0，百位不为0，十位不为0
        str += CHNCHAR[iT] + "拾";
        if (i1 != 0) {
          // 千位不为0，百位不为0，十位不为0，个位不为0 // 1234
          str += CHNCHAR[i1];
        }
        // 千位不为0，百位不为0，十位不为0，个位为0，什么都不用做
        // 1230
      } else if (i1 != 0) {
        // 千位不为0，百位不为0，十位为0，个位不为0 // 1204
        str += CHNCHAR[0] + CHNCHAR[i1];
      }
      // 千位不为0，百位不为0，十位为0，个位为0，什么都不用做
      // 1200
    } else {
      // 千位不为0，百位为0
      if (iT != 0) {
        // 千位不为0，百位为0，十位不为0 // 102X
        str += CHNCHAR[0] + CHNCHAR[iT] + "拾";
        if (i1 != 0) {
          // 千位不为0，百位为0，十位不为0，个位不为0 // 1034
          str += CHNCHAR[i1];
        }
        // 千位不为0，百位为0，十位不为0，个位为0，什么都不用做
        // 1030
      } else {
        // 千位不为0，百位为0，十位为0
        if (i1 != 0) {
          // 千位不为0，百位为0，十位为0，个位不为0 // 1004
          str += CHNCHAR[0] + CHNCHAR[i1];
        }
        // 千位不为0，百位为0，十位为0，个位为0，什么都不用做
        // 1000
      }
    }
  } else {
    // 千位为0
    if (iH != 0) {
      // 千位为0，百位不为0
      str += CHNCHAR[iH] + "佰";
      if (iT != 0) {
        // 千位为0，百位不为0，十位不为0
        str += CHNCHAR[iT] + "拾";
        if (i1 != 0) {
          // 千位为0，百位不为0，十位不为0，个位不为0 // 234
          str += CHNCHAR[i1];
        }
        // 千位为0，百位不为0，十位不为0，个位为0，什么都不用做
        // 230
      } else if (i1 != 0) {
        // 千位为0，百位不为0，十位为0，个位不为0 // 204
        str += CHNCHAR[0] + CHNCHAR[i1];
      }
      // 千位为0，百位不为0，十位为0，个位为0，什么都不用做
      // 200
    } else {
      // 千位为0，百位为0
      if (iT != 0) {
        // 千位为0，百位为0，十位不为0 // 2X
        str += CHNCHAR[iT] + "拾";
        if (i1 != 0) {
          // 千位为0，百位为0，十位不为0，个位不为0 // 24
          str += CHNCHAR[i1];
        }
        // 千位为0，百位为0，十位不为0，个位为0，什么都不用做
        // 20
      } else {
        // 千位为0，百位为0，十位为0
        if (i1 != 0) {
          // 千位为0，百位为0，十位为0，个位不为0 // 4
          str += CHNCHAR[i1];
        } else {
          // 千位为0，百位为0，十位为0，个位为0，什么都不用做
          // 0
          str += CHNCHAR[0];
        }
      }
    }
  }

  return str;
}
