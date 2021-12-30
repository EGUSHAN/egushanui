/*
 * @Author: EGUSHAN
 * @Date: 2021-12-30 10:33:29
 * @LastEditTime: 2021-12-30 10:33:39
 * @LastEditors: EGUSHAN
 * @Description: 经纬度距离计算
 * @FilePath: \egushanui\utils\circleDistance.js
 */

const EARTH_RADIUS = 6378137.0;
const PI = Math.PI;
function getRad(d) {
  return (d * PI) / 180.0;
}
export function getGreatCircleDistance(lat1, lng1, lat2, lng2) {
  if (!lat1 || !lng1 || !lat2 || !lng2) {
    return '';
  }
  lat1 = parseFloat(lat1);
  lng1 = parseFloat(lng1);
  lat2 = parseFloat(lat2);
  lng2 = parseFloat(lng2);
  var f = getRad((lat1 + lat2) / 2);
  var g = getRad((lat1 - lat2) / 2);
  var l = getRad((lng1 - lng2) / 2);
  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);
  var s, c, w, r, d, h1, h2;
  var a = EARTH_RADIUS;
  var fl = 1 / 298.257;
  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;
  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;
  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;
  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
}
