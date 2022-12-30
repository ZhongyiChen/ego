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

  return (1 - r) * from + r * to;
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
 * 保留至多 n 位小数
 * 
 * @param {number} value - 小数
 * @param {number} n - 自然数
 * 
 * @returns {number}
 */
export function fix(value, n = 2) {
  return +value.toFixed(n);
}
