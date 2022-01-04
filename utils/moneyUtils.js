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



/** 数字金额大写转换(可以处理整数,小数,负数) */  
export function dealBigMoney(n)   
{  
    var fraction = ['角', '分'];  
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];  
    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];  
    var head = n < 0? '欠': '';  
    n = Math.abs(n);  
 
    var s = '';  
 
    for (var i = 0; i < fraction.length; i++)   
    {  
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');  
    }  
    s = s || '整';  
    n = Math.floor(n);  
 
    for (var i = 0; i < unit[0].length && n > 0; i++)   
    {  
        var p = '';  
        for (var j = 0; j < unit[1].length && n > 0; j++)   
        {  
            p = digit[n % 10] + unit[1][j] + p;  
            n = Math.floor(n / 10);  
        }  
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;  
    }  
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');  
}
