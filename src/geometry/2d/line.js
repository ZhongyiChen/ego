/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 几何体 之 直线(线段)。
 */

/**
 * @typedef Point - 二维点
 * 
 * @property {number} x - 横坐标
 * @property {number} y - 纵坐标
 */

/**
 * @enum {number} 直线类型
 */
const LineType = {
  /** 两点式 */
  POINT_POINT: 0,
  /** 一般式 */
  GENERAL: 1,
  /** 斜截式 */
  SLOPE_INTERCEPT: 2,
  /** 点斜式 */
  POINT_SLOPE: 3,
  /** 截距式 */
  INTERCEPT_INTERCEPT: 4,
}

/**
 * @typedef LineConfig - 直线参数配置
 * 
 * @property {LineType} type - 直线函数类型
 * @property {number} x0 - 点0横坐标
 * @property {number} y0 - 点0纵坐标
 * @property {number} k - 斜率
 * @property {number} a - 直线在 x 轴上的截距
 * @property {number} b - 直线在 y 轴上的截距
 * @property {number} A - 一般式 x 的系数
 * @property {number} B - 一般式 y 的系数
 * @property {number} C - 一般式的常数
 */

export class Line {
  /**
   * 
   * @param {number} x1 - 起始点横坐标
   * @param {number} y1 - 起始点纵坐标
   * @param {number} x2 - 结束点横坐标
   * @param {number} y2 - 结束点纵坐标
   * @param {LineConfig} [config] - 非两点式的配置
   */
  constructor(x1, y1, x2, y2, config) {
    this.type = NaN;
    this.x0 = NaN;
    this.y0 = NaN;
    this.x1 = NaN;
    this.y1 = NaN;
    this.x2 = NaN;
    this.y2 = NaN;
    this._k = NaN;
    this._a = NaN;
    this._b = NaN;
    this._A = NaN;
    this._B = NaN;
    this._C = NaN;

    if (!config || LineType.POINT_POINT === config.type) {
      if (x1 === x2 && y1 === y2) throw new Error('need two different points!');
      this.type = LineType.POINT_POINT;
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      return this;
    }
    if (LineType.GENERAL === config.type) {
      this.type = LineType.GENERAL;
      this._A = config.A;
      this._B = config.B;
      this._C = config.C;
      return this;
    }
  }
  /**
   * 两点式
   */
  static fromPointPoint(x1, y1, x2, y2) {
    return new Line(x1, y1, x2, y2);
  }
  /**
   * 斜截式
   */
  /**
   * 一般式
   */
  /**
   * 长度值(作为线段看待时)
   * 
   * @returns {number}
   */
  get size() {
    if (LineType.POINT_POINT !== this.type) return NaN;

    const x = Math.abs(this.x2 - this.x1);
    const y = Math.abs(this.y2 - this.y1);

    return Math.sqrt(x * x + y * y);
  }
  /**
   * 与 x 轴的坡度。
   * 
   * @returns {number}
   */
  get k() {
    if (x1 === x2) return NaN;

    return (y2 - y1) / (x2 - x1);
  }
  /**
   * 与 x 轴的坡度(同 k)。
   * 
   * @returns {number}
   */
  get slope() {
    return this.k;
  }
  /**
   * 通过横坐标获取直线上的某一点
   * 
   * @param {number} x - 该点的横坐标
   * 
   * @returns {Point}
   */
  getPointByX(x) {

  }
  /**
   * 通过纵坐标获取直线上的某一点
   * 
   * @param {number} y - 该点的纵坐标
   * 
   * @returns {Point}
   */
  getPointByX(y) {
    
  }
}