/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 与数组操作相关的工具函数。例如生成某个数组、操作某个数组、计算某个数组等。
 */
import {
  clamp,
} from './number';

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
 * @param {[*]} values - 一维数组。由于数组元素是可重复的，因此唯一性由外部自行保证。
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
 * 构建数组的拓扑图，返回一个对象，键为下标，值为二次数组，二次数组的每项均为：[下一个下标，权重]。其中权重 N 表示被指向的元素最多还可以指向 N 个节点。
 * 
 * @param {[*]} values - 一维数组。
 * 
 * @example
 * ---------------------------
 * input:  ['a', 'b', 'c', 'd']
 * output: {
 *           0: [
 *                [1, 2],
 *                [2, 1],
 *                [3, 0],
 *              ],
 *           1: [
 *                [2, 1],
 *                [3, 0],
 *              ],
 *           2: [
 *                [3, 0],
 *              ],
 *           3: [
 *              ],
 *         }
 * ---------------------------
 * 
 * @returns {{
 *   index: [index: number, weight: number]
 * }}
 */
function topology(values) {
  return values
    .map((v, index) => index)
    .reduce((acc, v, i, a) => {
      const brr = a.slice(i + 1);
      acc[v] = brr.map((item, j) => ([item, brr.length - j - 1]));
      return acc;
    }, {});
}

/**
 * 组合
 * 
 * @param {[*]} values - 一维数组。由于数组元素是可重复的，因此唯一性由外部自行保证。
 * @param {number} [count] - 组合个数
 * 
 * @example
 * ---------------------------
 * input:  [1, 2, 3]
 * output: [
 *           [1],
 *           [2],
 *           [3],
 *           [1, 2],
 *           [1, 3],
 *           [2, 3],
 *           [1, 2, 3],
 *         ]
 * ---------------------------
 * input:  [1, 2, 3], 2
 * output: [
 *           [1, 2],
 *           [1, 3],
 *           [2, 3],
 *         ]
 * ---------------------------
 * 
 * @returns {[[*]]} - 枚举所得的所有组合方式
 */
export function combination(values, count) {
  if (!values) return [];
  if ('number' === typeof count && count !== clamp(count, 1, values.length)) return [];
  if (1 === values.length) return [[values]];

  const arr = [];
  const len = values.length;
  const min = count || 1;
  const max = count || len;
  const topo = topology(values);
  const keys = Object.keys(topo)
    .map(item => +item);

  for (let n = min; n <= max; n++) {
    if (1 === n) {
      arr.push(...(keys.map(k => [k])));
      continue;
    }
    let tmp = keys.reduce((acc, cur) => {
      acc = acc.concat(
        topo[cur]
          .filter(item => n <= item[1] + 2)
          .map(item => [cur, item[0]])
      ) 
      return acc;
    }, []);
    while (tmp[0] && tmp[0].length < n) {
      tmp = tmp.reduce((brr, bur) => {
        brr = brr.concat(
          topo[bur[bur.length - 1]]
            .filter(item => n <= (item[1] + bur.length + 1))
            .map(item => [...bur, item[0]])
        )
        return brr;
      }, []);
    }
    if (tmp && tmp.length) {
      arr.push(...tmp)
    }
  }

  return arr
    .map(indexs => indexs.map(index => values[index]));
}


/**
 * 遍历
 * 
 * @param {[*]} values - N 维数组。其中 * 可以是数组
 * 
 * @example
 * ---------------------------
 * input:  [1, [2, [3, 4], 5], 6, [7, 8, [9]]]
 * output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * ---------------------------
 * input:  [1, [2, [3, [4, [5, [6]]]]]]
 * output: [1, 2, 3, 4, 5, 6]
 * ---------------------------
 * 
 * @returns {[*]} - 一维数组。其中 * 不可以是数组
 */
export function traverse(values) {
  if (!Array.isArray(values)) return [values];

  let arr = [];
  let brr = [
    ...values
  ];
  let tmp = null;

  while (brr && brr.length) {
    tmp = brr.shift();

    if (!Array.isArray(tmp)) {
      arr.push(tmp);
      continue;
    }
    brr = tmp.concat(brr);
  }

  return arr;
}

/**
 * 熨平
 * 
 * @param {[*]} values - N 维数组。其中 * 可以是数组
 * 
 * @returns {[*]} - 一维数组。其中 * 不可以是数组
 */
export const flatten = traverse;
