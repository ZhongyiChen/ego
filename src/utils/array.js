/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 与数组操作相关的工具函数。例如生成某个数组、操作某个数组、计算某个数组等。
 */

/**
 * 步进
 * 
 * @param {number} n - 自然数
 * 
 * @returns {number}
 */
const stepping = n => n + 1;

/**
 * 序列
 * 
 * @param {number|string} init - 初始值
 * @param {number} count - 所需数量
 * @param {(acc: number|string, index: number, array: []) => number|string} itor - 迭代生成器
 * 
 * @example
 * ---------------------------
 * input:  1, 10
 * output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * ---------------------------
 * 
 * @returns {[number|string]}
 */
export function sequence(init = 0, count = 0, itor = stepping) {
  const arr = [];

  if (!count) return arr;

  arr.push(init);

  for (let i = 1; i < count; i++) {
    arr.push(itor(arr[i - 1], i, arr));
  }

  return arr;
}

/**
 * 排列
 * 
 * @param {[*]} values - 一维数组
 * 
 * @example
 * ---------------------------
 * input:  [1, 2, 3]
 * output: [
 *           [1, 2, 3],
 *           [1, 3, 2],
 *           [2, 1, 3],
 *           [2, 3, 1],
 *           [3, 1, 2],
 *           [3, 2, 1],
 *         ]
 * ---------------------------
 * 
 * @returns {[[*]]} - 枚举所得的所有排列方式
 */
export function arrangement(values) {
  if (!values) return [];
  if (1 === values.length) return [values];

  const arr = [];

  for (let i = 0; i < values.length; i++) {
    const crr = values.slice(0, i).concat(values.slice(i + 1));
    const drr = arrangement(crr)
      .map(frr => ([
        values[i],
        ...frr,
      ]));
    arr.push(...drr);
  }

  return arr;
}

/**
 * 组合
 * 
 * @param {[*]} values - 一维数组
 * @param {number} count - 每组个数
 * 
 * @returns {[[*]]} - 枚举所得的所有组合方式
 */
export function combination(values, count) {

}