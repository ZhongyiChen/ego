/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 日期时间的生成与格式化。
 */
import {
  whatTypeIs,
} from '../utils/read-write'

/**
 * 填充
 * 
 * @param {string} s 源字符串
 * @param {number} l 字符串应显示的最小字符长度
 * @param {string} c 填充的字符
 * 
 * @returns {string}
 */
function pad(s, l = 0, c = '0') {
  l = l - (s + '').length;

  if (l < 0) return s;

  for (let i = l; i > 0; i--) {
    s = c + s;
  }

  return s;
}

const REG_SIGN = /([YMDhms])(\1*)/g

/**
 * @enum {(Date, number) => *} 日期时间设置函数
 */
const FN_SETTER = {
  Y: (date, num) => date.setFullYear(num),
  M: (date, num) => date.setMonth(num - 1),
  D: (date, num) => date.setDate(num),
  h: (date, num) => date.setHours(num),
  m: (date, num) => date.setMinutes(num),
  s: (date, num) => date.setSeconds(num),
}

/**
 * @enum {(Date, number) => string} 日期时间获取函数
 */
const FN_GETTER = {
  Y: (date, len) => pad(date.getFullYear(), len),
  M: (date, len) => pad(date.getMonth() + 1, len),
  D: (date, len) => pad(date.getDate(), len),
  h: (date, len) => pad(date.getHours(), len),
  m: (date, len) => pad(date.getMinutes(), len),
  s: (date, len) => pad(date.getSeconds(), len),
}

/**
 * 日期时间管理器
 */
export class EgoDate {
  /**
   * 构造函数
   * 
   * @param {number|string|Date} date 日期字符串
   * @param {string} [pattern] 日期格式
   */
  constructor(date, pattern) {
    if (date instanceof EgoDate) {
      return date
    }
    if ('date' === whatTypeIs(date)) {
      this._date = date
      return this
    }
    if ('number' === whatTypeIs(date)) {
      this._date = new Date(date)
      return this
    }
    if (!date) {
      this._date = new Date()
      return this
    }
    if (!pattern) {
      this._date = new Date(date)
      return this
    }

    const pm = pattern.match(REG_SIGN)
    const dm = date.match(/(\d)+/g)

    if (pm.length !== dm.length) {
      throw new Error('pattern 与 date 格式不匹配')
    }

    this._date = new Date(1970, 0, 1)

    pm.forEach(($0, index) => {
      const num = parseInt(dm[index])
      const fn = FN_SETTER[$0.charAt(0)]

      fn && fn(this._date, num)
    })
  }
  valueOf() {
    return this._date.valueOf()
  }
  toJSON() {
    return this._date.toJSON()
  }
  toString() {
    return this._date.toString()
  }
  format(pattern) {
    if (!pattern) return this.toJSON()

    return pattern.replace(REG_SIGN, ($0) => {
      const fn = FN_GETTER[$0.charAt(0)]

      if (!fn) return $0;

      return fn(this._date, $0.length)
    })
  }
}

/**
 * 完全版 EgoDate
 * 
 * @description 如果需要对 datetime 进行时间设置或者获取某个时间单位，则应使用完全版。
 */
export class FullEgoDate extends EgoDate {
  /**
   * 构造函数
   * 
   * @param {number|string|Date} date 日期字符串
   * @param {string} [pattern] 日期格式
   */
  constructor(date, pattern) {
    super(date, pattern)
  }
  /**
   * 获取
   */
  getFullYear() {
    return this._date.getFullYear();
  }
  getMonth() {
    return this._date.getMonth();
  }
  getDate() {
    return this._date.getDate();
  }
  getDay() {
    return this._date.getDay();
  }
  getHours() {
    return this._date.getHours();
  }
  getMinutes() {
    return this._date.getMinutes();
  }
  getMilliseconds() {
    return this._date.getMilliseconds();
  }
  getTime() {
    return this._date.getTime();
  }
  getYear() {
    return this._date.getYear();
  }
  /**
   * 设置
   */
  setFullYear(num) {
    this._date.setFullYear(num);
    return this;
  }
  setMonth(num) {
    this._date.setMonth(num);
    return this;
  }
  setDate(num) {
    this._date.setDate(num);
    return this;
  }
  setHours(num) {
    this._date.setHours(num);
    return this;
  }
  setMinutes(num) {
    this._date.setMinutes(num);
    return this;
  }
  setMilliseconds(num) {
    this._date.setMilliseconds(num);
    return this;
  }
  setTime(num) {
    this._date.setTime(num);
    return this;
  }
  setYear(num) {
    this._date.setYear(num);
    return this;
  }
  /**
   * 获取当月的最后一天
   * 
   * @returns {number}
   */
  getLastDateOfCurMonth() {
    const YYYY = this._date.getFullYear();
    const MM = this._date.getMonth() + 1;
    
    return new Date(YYYY, MM, 0).getDate();
  }
  /**
   * 获取当月第一天是周几
   * 
   * @returns {number}
   */
  getFirstDayOfCurMonth() {
    const YYYY = this._date.getFullYear();
    const MM = this._date.getMonth();
    
    return new Date(YYYY, MM, 1).getDay();
  }
  /**
   * 获取当月最后一天是周几
   * 
   * @returns {number}
   */
  getLastDayOfCurMonth() {
    const YYYY = this._date.getFullYear();
    const MM = this._date.getMonth() + 1;
    
    return new Date(YYYY, MM, 0).getDay();
  }
  /**
   * 获取上个月的最后一天
   * 
   * @returns {number}
   */
  getLastDateOfLastMonth() {
    const YYYY = this._date.getFullYear();
    const MM = this._date.getMonth();
    
    return new Date(YYYY, MM, 0).getDate();
  }
}
