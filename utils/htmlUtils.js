// 闭合标签 <b>  => <b/>
export function addClosingSlashes(htmlString) {
  var elemTypes = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param'];
  var inString,
    outString = htmlString;
  for (var i = 0; i < elemTypes.length; i++) {
    var index1 = 0,
      index2;
    inString = outString;
    outString = '';
    while ((index1 = inString.indexOf('<' + elemTypes[i])) != -1) {
      if ((index2 = inString.indexOf('>', index1)) != -1 && inString.substring(index2 - 1, index2 + 1) != '/>') {
        outString += inString.substring(0, index2) + ' />';
        inString = inString.substring(index2 + 1);
      } else {
        break;
      }
    }
    outString += inString;
  }
  return outString;
}