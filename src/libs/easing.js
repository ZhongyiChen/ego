/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 缓动函数 - 计算一个数值参数随着时间的变化
 * 
 * @see https://easings.net/
 */

const pow  = Math.pow;
const cos  = Math.cos;
const sin  = Math.sin;
const sqrt = Math.sqrt;
const PI   = Math.PI;

/** 10% 的过冲量(超越量) */
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;

/**
 * 线性(一次)
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function linear(x) {
  return x
}

/**
 * 二次缓入(四边形就是二次方)
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInQuad(x) {
  return x * x
}

/**
 * 二次缓出(四边形就是二次方)
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x)
}

/**
 * 二次缓入缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInOutQuad(x) {
  if (x < .5) return 2 * x * x

  return 1 - pow(-2 * x + 2, 2) / 2
}

/**
 * 三次缓入(立方体就是三次方)
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInCubic(x) {
  return x * x * x
}

/**
 * 三次缓出(立方体就是三次方)
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeOutCubic(x) {
  return 1 - pow(1 - x, 3)
}

/**
 * 三次缓入缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInOutCubic(x) {
  if (x < .5) return 4 * x * x * x

  return 1 - pow(-2 * x + 2, 3) / 2
}

/**
 * 四次缓入
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInQuart(x) {
  return x * x * x * x
}

/**
 * 四次缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeOutQuart(x) {
  return 1 - pow(1 - x, 4)
}

/**
 * 四次缓入缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInOutQuart(x) {
  if (x < .5) return 8 * x * x * x * x

  return 1 - pow(-2 * x + 2, 4) / 2
}

/**
 * 五次缓入
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInQuint(x) {
  return x * x * x * x * x
}

/**
 * 五次缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeOutQuint(x) {
  return 1 - pow(1 - x, 5)
}

/**
 * 五次缓入缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInOutQuint(x) {
  if (x < .5) return 16 * x * x * x * x * x

  return 1 - pow(-2 * x + 2, 5) / 2
}

/**
 * 正弦缓入
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInSine(x) {
  return 1 - cos((x * PI) / 2)
}

/**
 * 正弦缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeOutSine(x) {
  return sin((x * PI) / 2)
}

/**
 * 正弦缓入缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInOutSine(x) {
  return -(cos(x * PI) - 1) / 2
}

/**
 * 幂指数缓入
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInExpo(x) {
  if (0 === x) return 0

  return pow(2, 10 * x - 10)
}

/**
 * 幂指数缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeOutExpo(x) {
  if (1 === x) return 1

  return 1 - pow(2, -10 * x)
}

/**
 * 幂指数缓入缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeOutExpo(x) {
  if (0 === x) return 0
  if (1 === x) return 1
  if (x < 0.5) return pow(2, 20 * x - 10) / 2

  return (2 - pow(2, -20 * x + 10)) / 2
}

/**
 * 开平方缓入(图形很接近圆弧)
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInCirc(x) {
  return 1 - sqrt(1 - pow(x, 2))
}

/**
 * 开平方缓出(图形很接近圆弧)
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeOutCirc(x) {
  return sqrt(1 - pow(x - 1, 2))
}

/**
 * 开平方缓入缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInOutCirc(x) {
  if (x < .5) return (1 - sqrt(1 - pow(2 * x, 2))) / 2

  return (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2
}

/**
 * 过冲缓入
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInBack(x) {
  return c3 * x * x * x - c1 * x * x
}

/**
 * 过冲缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeOutBack(x) {
  return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)
}

/**
 * 过冲缓入缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInOutBack(x) {
  if (x < .5) return (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2

  return (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
}

/**
 * 橡皮筋式缓入
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInElastic(x) {
  if (0 === x) return 0
  if (1 === x) return 1

  return -pow(2, 10 * x - 10) * sin((10 * x - 10.75) * c4)
}

/**
 * 橡皮筋式缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeOutElastic(x) {
  if (0 === x) return 0
  if (1 === x) return 1

  return pow(2, -10 * x) * sin((10 * x - 0.75) * c4) + 1
}

/**
 * 橡皮筋式缓入缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInOutElastic(x) {
  if (0 === x) return 0
  if (1 === x) return 1
  if (x < 0.5) return -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2

  return (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1
}

/**
 * 弹力小球式缓入
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInBounce(x) {
  return 1 - easeOutBounce(1 - x)
}

/**
 * 弹力小球式缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeOutBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) return n1 * x * x
  if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75
  if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375

  return n1 * (x -= 2.625 / d1) * x + 0.984375
}

/**
 * 弹力小球式缓入缓出
 * 
 * @param {number} x - 变量，[0, 1]
 * 
 * @returns {number}
 */
export function easeInOutBounce(x) {
  if (x < .5) return (1 - easeOutBounce(1 - 2 * x)) / 2

  return (1 + easeOutBounce(2 * x - 1)) / 2
}
