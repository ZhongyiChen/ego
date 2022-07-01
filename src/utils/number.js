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
 * input: -PI
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
