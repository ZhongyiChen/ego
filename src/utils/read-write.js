/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 与读写变量相关的工具函数
 */

/** @type {RegExp} 匹配中括号包含这的单引号型字符串 */
const BRACKET_RE_S = /\['([^']+)'\]/g
/** @type {RegExp} 匹配中括号包含这的双引号型字符串 */
const BRACKET_RE_D = /\["([^"]+)"\]/g
/** @type {RegExp} 匹配中括号包含着的数字 */
const BRACKET_RE_N = /\[(\d+)\]/g

/**
 * 键路径正常化
 *
 * @param {string} key 键路径
 *
 * @example
 * ---------------------------
 *  input: obj['a']
 * output: obj.a
 * ---------------------------
 *  input: obj["b"]["c"]
 * output: obj.b.c
 * ---------------------------
 *  input: obj["b"].c
 * output: obj.b.c
 * ---------------------------
 *
 * @returns {string} 以 . 分隔的路径
 */
function normalizeKeyPath(key = '') {
  if (key.indexOf('[') < 0) return key

  return key
    .replace(BRACKET_RE_S, '.$1')
    .replace(BRACKET_RE_D, '.$1')
    .replace(BRACKET_RE_N, '.$1')
}

/**
 * 从指定的对象中获取对应属性名称的值
 *
 * @param {object} obj - 所取值的源对象
 * @param {string} exp - 属性表达式。可以通过 '.' 符号来指定深层属性
 *
 * @example
 * ---------------------------
 *  input: {a: {b: {c: 1}}}, "a['b'].c"
 * output: 1
 * ---------------------------
 *  input: {a: {b: {c: 1}}}, "a.b"
 * output: {c: 1}
 * ---------------------------
 *  input: null, "a['b'].c"
 * output: null
 * ---------------------------
 *
 * @returns {*} 根据键名获得的值
 */
export function parse(obj, exp) {
  if (!obj || typeof obj === 'number') {
    return obj
  }

  const key = normalizeKeyPath(exp)

  if (!key.includes('.')) {
    return obj[key]
  }

  const paths = key.split('.')
  const l = paths.length

  let d = -1

  while (++d < l && obj != null) {
    obj = obj[paths[d]]
  }

  return obj
}

/**
 * 为指定的对象的指定路径赋值
 *
 * @param {object} obj - 所取值的源对象
 * @param {string} exp - 属性表达式。可以通过 '.' 符号来指定深层属性
 * @param {*} value 需要赋予的值
 * @param {boolean} autoCreate exp 解析失败时是否自动创建(但 obj 必须是合法对象)
 *
 * @returns {boolean} 是否赋值成功
 */
export function assign(obj, exp, value, autoCreate) {
  if (!obj) {
    console.error(`${obj} could not be assigned`)
    return false
  }
  if ([
    'number',
    'string',
    'boolean',
  ].includes(typeof obj)) {
    console.error(`${obj} could not be assigned`)
    return false
  }

  const key = normalizeKeyPath(exp)

  if (!key.includes('.')) {
    obj[key] = value
    return true
  }

  const paths = key.split('.')
  const l = paths.length - 1

  for (let i = 0; i < l; i++) {
    const key = paths[i]

    if (!obj[key] && !autoCreate) {
      // 不允许自动创建路径
      console.error(`${exp} is not a valid path`)
      return false
    }
    if (!obj[key]) {
      // 允许自动创建路径
      obj[key] = {}
    }

    obj = obj[key]
  }

  obj[paths[l]] = value

  return true
}

/**
 * 获取值类型
 *
 * @param {*} v 某个值
 *
 * @example
 * input          | output
 * -------------------------
 * 1              | 'number'
 * 'hi'           | 'string'
 * undefined      | 'undefined'
 * null           | 'null'
 * NaN            | 'nan'
 * []             | 'array'
 * {}             | 'object'
 * true           | 'boolean'
 * () => {}       | 'function'
 * document.body  | 'element'
 * <svg />        | 'element'
 *
 * @returns {string} 类型名称
 */
export function whatTypeIs(v) {
  if (v !== v) return 'nan'

  if (typeof v !== 'object') return typeof v

  if (!v) return 'null'

  const str = Object.prototype.toString.call(v)
    .slice(8)
    .slice(0, -1)

  if (/(HTML|SVG)[a-zA-Z]+Element/.test(str)) return 'element'

  return str.toLowerCase()
}
