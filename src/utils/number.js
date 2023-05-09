/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 与数字计算相关的工具函数。通常这些计算都没有太明确的归类，并且偏向于实用。而 @type {import("../libs/math.js")} 则偏向于理论基础，应用范围更为广泛。
 */
import {
  isPrime,
} from '../libs/math';

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
 * 获取大于某个整数的最小素数
 * 
 * @param {number} value - 一个整数
 * 
 * @returns {number} 目标素数
 */
export function primeGreaterThan(value) {
  if (2 > value) return 2;
  if (2 === value) return 3;

  let i = 0 === value % 6 ? value :
    6 * Math.ceil(value / 6);

  for (;;i += 6) {
    if (i - 1 > value && isPrime(i - 1)) return i - 1;
    if (isPrime(i + 1)) return i + 1;
  }
}
