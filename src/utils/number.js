/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 与数字计算相关的工具函数。通常这些计算都没有太明确的归类。
 */

/**
 * 提取正负号
 * 
 * @param {number} value - 任意数字
 *
 * @example
 * ---------------------------
 * input: 3
 * output: 1
 * ---------------------------
 * input: -Math.PI
 * output: -1
 * ---------------------------
 * input: 0
 * output: 1
 * ---------------------------
 * input: -0
 * output: -1
 * ---------------------------
 *
 * @return {number} -1 或 1
 */
export function whatSignIs(value) {
  if (value < 0) return -1;
  if (value > 0) return 1;
  if ((Infinity / value) < 0) return -1;

  return 1;
}

/**
 * 收敛
 * 
 * @param {number} value - 被收敛值
 * @param {number} min - 最小值边界
 * @param {number} max - 最大值边界
 *
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * 霍纳法则计算多项式的值
 * 
 * @param {[number]} coefficients - 多项式系数
 * @param {number} x - 多项式 x 的值
 * 
 * @example
 * ---------------------------
 * input: [2, -1, -3, 1, -5], 3
 * output: 106
 * ---------------------------
 * 
 * 解析
 * 
 * 转换0: f(x) = 2x⁴ - x³ - 3x² + x - 5
 * 转换1: f(x) = x(2x³ - x² - 3x + 1) - 5
 * 转换2: f(x) = x(x(2x² - x - 3) + 1) - 5
 * 转换3: f(x) = x(x(x(2x - 1) - 3) + 1) - 5
 * 转换4: f(x) = x(x(x(x(2) - 1) - 3) + 1) - 5
 * 
 * 最后，我们只需要计算 `f(x) = x(x(x(2x - 1) - 3) + 1) - 5` 即可
 *
 * @returns {number}
 */
export function horner(coefficients, x) {
  return coefficients.slice(1)
    .reduce((acc, co) => {
      return x * acc + co;
    }, coefficients[0]);
}

/**
 * 插值
 * 
 * @param {number} from - 起始数值
 * @param {number} to - 结束数值
 * @param {number} rate - 比例因子，范围为 [0, 1]
 * 
 * @returns {number}
 */
export function lerp(from, to, rate) {
  const r = clamp(rate, 0, 1);

  // (1 - r) * from + r * to
  return r * (to - from) + from;
}

/**
 * 逆序数
 * 
 * @param {[number]} values - 自然数排列
 * 
 * @returns {number}
 */
export function det(values) {
  if (!values) return 0;

  return values.reduce((acc, n, index, arr) => {
    const c = arr.slice(index + 1)
      .filter(v => v < n)
      .length;

    return acc + c;
  }, 0);
}

/**
 * 阶乘
 * 
 * @param {number} value - 自然数
 * 
 * @returns {number}
 */
export function factorial(value) {
  const n = clamp(value, 0, Infinity);

  if (n !== n) return n;
  if (0 === n) return 1;
  if (Infinity === n) return Infinity;

  let result = n;
  let i = n - 1;

  while (i) {
    result *= i;
    i--;
  }

  return result;
}

/**
 * 保留至多 n 位小数，过程会执行四舍五入
 * 
 * @param {number} value - 小数
 * @param {number} n - 自然数
 * 
 * @returns {number}
 */
export function fix(value, n = 2) {
  return +value.toFixed(n);
}

/**
 * 判断某个数是否为素数
 * 
 * @param {number} value - 整数
 * 
 * @returns {boolean}
 */
export function isPrime(value) {
  // 特殊值直接判断
  if (2 === value || 3 === value) return true;

  // 不在 6 的倍数两侧的整数，一定不是质数
  if (5 !== value % 6 && 1 !== value % 6) return false;

  // 一个数若可以进行因式分解，则分解后得到的数中，必有一个小于等于 sqrt(value)
  const tmp = Math.sqrt(value);

  // 在 6 的倍数两侧的整数，也不一定是质数
  for (let i = 5; i <= tmp; i += 6) {
    // 此时 value 已经是 6 的倍数两侧的整数了。如果 value 能被小于其的 6 的倍数两侧的整数所整除的话，则说明 value 不是质数
    if (0 === value % i || 0 === value % (i + 2)) return false;
  }

  return true;
}
