import {
  arrangement as array_arrangement,
  combination as array_combination,
} from './array';

/**
 * 排列
 * 
 * @param {Set<*>} values - 集合
 * 
 * @returns {[[*]]} - 枚举所得的所有排列方式
 */
export function arrangement(values) {
  return array_arrangement([...values]);
}

/**
 * 组合
 * 
 * @param {Set<*>} values - 集合
 * @param {number} count - 组合个数
 * 
 * @returns {[Set<*>]} - 枚举所得的所有组合方式
 */
export function combination(values, count) {
  return array_combination([...values], count)
    .map(arr => new Set(arr));
}
