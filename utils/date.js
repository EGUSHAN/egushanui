/*** 本周第一天
 *  @return {*} WeekFirstDay 返回本周第一天的时间
 */
export function showWeekFirstDay() {
  let Nowdate = new Date();
  let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
  return WeekFirstDay;
}

/***
 *  @return {*} WeekLastDay 返回本周最后一天的时间
 */
export function showWeekLastDay() {
  let Nowdate = new Date();
  let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
  let WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
  return WeekLastDay;
}

/***
 *  @return {*} MonthFirstDay 返回本月第一天的时间
 */
export function showMonthFirstDay() {
  let Nowdate = new Date();
  let MonthFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth());
  return MonthFirstDay;
}

/***
 *  @return {*} MonthLastDay 返回本月最后一天的时间
 */
export function showMonthLastDay() {
  let Nowdate = new Date();
  let MonthNextFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() + 1);
  let MonthLastDay = new Date(MonthNextFirstDay - 86400000);
  return MonthLastDay;
}

/** 返回指定时间戳之间的时间间隔
 *  @param {*} startTime 开始时间的时间戳
 *  @param {*} endTime 结束时间的时间戳
 *  @return {string} str 返回时间字符串
 */
 export function getTimeInterval(startTime, endTime) {
  let runTime = parseInt((endTime - startTime) / 1000);
  let year = Math.floor(runTime / 86400 / 365);
  runTime = runTime % (86400 * 365);
  let month = Math.floor(runTime / 86400 / 30);
  runTime = runTime % (86400 * 30);
  let day = Math.floor(runTime / 86400);
  runTime = runTime % 86400;
  let hour = Math.floor(runTime / 3600);
  runTime = runTime % 3600;
  let minute = Math.floor(runTime / 60);
  runTime = runTime % 60;
  let second = runTime;
  let str = '';
  if (year > 0) {
      str = year + '年';
  }
  if (year <= 0 && month > 0) {
      str = month + '月';
  }
  if (year <= 0 && month <= 0 && day > 0) {
      str = day + '天';
  }
  if (year <= 0 && month <= 0 && day <= 0 && hour > 0) {
      str = hour + '小时';
  }
  if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute > 0) {
      str = minute + '分钟';
  }
  if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute <= 0 && second > 0) {
      str += second + '秒';
  }
  str += '前';
  return str;
}


/** 验证一个日期是不是今天
* @param  {string} val 需要验证的日期
* @return {boolean} 返回布尔值
*/
export function isToday(val){
  return new Date().toLocaleDateString() == new Date(val).toLocaleDateString();
}

/** 验证传入的日期是否是昨天
* @param  {string} val 需要验证的日期
* @return {boolean} 返回布尔值
*/
export function isYesterday(val) {
  var today = new Date();
  var yesterday = new Date(now - 1000 * 60 * 60 * 24);
  var test = new Date(val);
  if (yesterday.getYear() === test.getYear() && yesterday.getMonth() === test.getMonth() && yesterday.getDate() === test.getDate()) {
      return true;
  } else {
      return false;
  }
}

function formatDate(date) {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

/**
 * 
 * @param {*} dateString  yyyy-mm-dd   | yyyy/mm/dd
 * @returns 获取指定日期 所在 周的每天
 */
export function getWeekDay(dateString) {
  let dateStringReg = /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/
  let presentDate = new Date(dateString)
  console.log(presentDate,'presentDate')
  let today
  if (dateString.match(dateStringReg)) {
    today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7
    return Array.from(new Array(7), function (val, index) {
      return formatDate(new Date(presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000))
    })
  } else {
    throw new Error('dateString should be like "yyyy-mm-dd" or "yyyy/mm/dd"')
  }
}

