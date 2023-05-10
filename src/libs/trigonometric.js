/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 三角函数处理函数。此脚本用于计算各种三角函数，不依赖 javaScript 的内置 Math 模块。在 javaScript 中无实际用途，只为大家提供三级函数的高效实现参考。
 * 
 * 至于为何这些三角函数没有放在 @type {import("./math.js")} 中，是因为我认为这些三角函数已自成体系，单独形成脚本更有利于代码管理。
 * 
 * @reference [坐标旋转数字计算机算法](https://blog.csdn.net/lz0499/article/details/100002361)
 */
import {
  sequence,
} from '../utils/array';

/**
 * 圆周率
 */
const PI = 3.141592653589793;
/**
 * 伸缩因子: 1 / An
 */
const K = 0.607253;
/**
 * item = 1 / 2^index
 */
const CEOF = sequence(0, 21)
  .map(n => Math.pow(2, n))
  .map(n => (1/n));
/**
 * tan(θ°) = 1 / 2^index
 */
const DANGLE = [
  45,
  26.565051177078,
  14.0362434679265,
  7.1250163489018,
  3.57633437499735,
  1.78991060824607,
  0.8951737102111,
  0.4476141708606,
  0.2238105003685,
  0.1119056770662,
  0.0559528918938,
  0.027976452617,
  0.01398822714227,
  0.006994113675353,
  0.003497056950704,
  0.001748528426980,
  0.000874264213694,
  0.000437132106872,
  0.000218566053439,
  0.000109283026720,
  0.000054641513360,
]

/**
 * 使用 Cordic 算法计算单位圆的某个角的结束边某点坐标(起始边位于 x 轴，圆心位于原点)
 * 
 * @param {number} deg - 角度值，范围为 0 - 90
 * 
 * @returns {[x: number, y: number]} - 角终边上的一个坐标
 */
function cordic(deg) {
  let d = 1,
      x = 1,
      y = 0,
      z = deg,
      xn;

  for (let i = 0; i < CEOF.length; i++) {
    d = z >= 0 ? 1 : -1;

    xn = x;

    x = xn - (y * d * CEOF[i]);
    y = y + (xn * d * CEOF[i]);
    z = z - (d * DANGLE[i]);
  }

  return [
    x,
    y,
  ];
}

/**
 * 正弦
 * 
 * @param {number} radian - 角弧度值，范围 0 - PI/2
 * 
 * @returns {number}
 */
export function sine(radian) {
  return K * cordic(radian * 180 / PI)[1];
}

/**
 * 余弦
 * 
 * @param {number} radian - 角弧度值，范围 0 - PI/2
 * 
 * @returns {number}
 */
export function cosine(radian) {
  return K * cordic(radian * 180 / PI)[0];
}

/**
 * 正切
 * 
 * @param {number} radian - 角弧度值，范围 0 - PI/2
 * 
 * @returns {number}
 */
export function tangent(radian) {
  const [
    x,
    y,
  ] = cordic(radian * 180 / PI);

  return y / x;
}
