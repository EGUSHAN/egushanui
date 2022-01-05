/*
 * @Author: EGUSHAN
 * @Date: 2021-12-30 10:30:03
 * @LastEditTime: 2021-12-30 10:47:07
 * @LastEditors: Please set LastEditors
 * @Description: 常用正则
 * @FilePath: \egushanui\utils\validate.js
 */

const regs = {
  email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
  mobilephone: /^(0|86|17951)?^1[0-9]{10}$/,
  enzhtext: /^[A-Za-z\u4e00-\u9fa5]+$/,
  officertext: /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/,
  passport: /^([a-zA-z]|[0-9]){5,17}$/,
  hmttext: /^([A-Z]\d{6,10}(\(\w{1}\))?)$/,
  specialStrReg: /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im,
  nowordReg: /^[^A-Za-z]*$/g,
  chnAndEnReg:
    /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g,
  postcodeReg: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g,
  wechatReg: /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g,
  LicensePlateNumberReg:
    /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/g,
  LicensePlateNumberNERReg:
    /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g,
  LicensePlateNumberNNERReg: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g,
};
const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
const ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];

export function validateMoileNumber(value) {
  return regs.mobilephone.test(value.trim());
}

export function validateEmail(value) {
  return regs.email.test(value.trim());
}
/** 验证只能输入中英文 */
export function validateEnZhText(value) {
  return regs.enzhtext.test(value.trim());
}
/** 验证军官证 */
export function validateOFText(value) {
  return regs.officertext.test(value.trim());
}
/** 验证护照 */
export function validatePassport(value) {
  return regs.passport.test(value.trim());
}
/** 验证港澳台证件 */
export function validateHMT(value) {
  return regs.hmttext.test(value.trim());
}
/* 验证身份证号位值 .10代表X */
export function validateIdentity(value) {
  var idCard = value.replace(/ /g, "").trim(); // 去掉字符串头尾空格
  if (idCard.length == 15) {
    return isValidityBrithBy15IdCard(idCard); // 进行15位身份证的验证
  } else if (idCard.length == 18) {
    // 得到身份证数组
    var aIdCard = idCard.split("");
    // 进行18位身份证的基本验证和第18位的验证
    return isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(aIdCard);
  } else {
    return false;
  }
}
// 获取身份证男女信息
// 0男 1女
export function getIdGender(id) {
  let sex = "";
  if (parseInt(id.charAt(16) / 2) * 2 != id.charAt(16)) {
    sex = 0;
  } else {
    sex = 1;
  }
  return sex;
}
/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param aIdCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(aIdCard) {
  var sum = 0; // 声明加权求和变量
  if (aIdCard[17].toLowerCase() == "x") {
    aIdCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
  }
  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * aIdCard[i]; // 加权求和
  }
  var valCodePosition = sum % 11; // 得到验证码所位置

  return aIdCard[17] == ValideCode[valCodePosition];
}

/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(idCard18) {
  var year = idCard18.substring(6, 10);
  var month = idCard18.substring(10, 12);
  var day = idCard18.substring(12, 14);
  var tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day));
  // 这里用getFullYear()获取年份，避免千年虫问题
  return !(tempDate.getFullYear() != parseFloat(year) || tempDate.getMonth() != parseFloat(month) - 1 || tempDate.getDate() != parseFloat(day));
}

/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard(idCard15) {
  var year = idCard15.substring(6, 8);
  var month = idCard15.substring(8, 10);
  var day = idCard15.substring(10, 12);
  var tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day));
  // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
  return !(tempDate.getYear() != parseFloat(year) || tempDate.getMonth() != parseFloat(month) - 1 || tempDate.getDate() != parseFloat(day));
}

// 验证身份证号

// 验证视频媒体格式
export function isVideo(ext) {
  const videos = ["MP4", "AVI", "MOV", "FLV", "3GP", "MPEG", "NAVI"];
  return videos.includes(ext.toUpperCase());
}

// 验证特殊字符
export function isSpecialStr(str) {
  return regs.specialStrReg.test(str);
}

/**验证不能包含字母
 * @param { string } value
 */
export const isNoWord = (value) => regs.nowordReg.test(value);

// 验证中文和数字
export const isCHNAndEN = (value) => regs.chnAndEnReg.test(value);

/**验证邮政编码(中国)
 * @param { string } value
 */
export const isPostcode = (value) => regs.postcodeReg.test(value);

/**验证微信号，6至20位，以字母开头，字母，数字，减号，下划线
 * @param { string } value
 */
export const isWeChatNum = (value) => regs.wechatReg.test(value);

/**验证车牌号(新能源)
 * @param { string } value
 */
export const isLicensePlateNumberNER = (value) => regs.LicensePlateNumberNERReg.test(value);

/**验证车牌号(非新能源)
 * @param { string } value
 */
export const isLicensePlateNumberNNER = (value) => regs.LicensePlateNumberNNERReg.test(value);

/**验证车牌号（非新能源 和 新能源）
 * @param { string } value
 */
export const isLicensePlateNumber = (value) => regs.LicensePlateNumberReg.test(value);

// 验证正整数
export function formatNumber(e) {
  let flag = new RegExp("^[1-9]([0-9])*$").test(e);
  if (!flag) {
    return true;
  }
}
