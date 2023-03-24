/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 几何体 之 圆(二维平面)。
 */

/**
 * @enum {number} 圆方程类型
 */
const CircleType = {
  /** 标准式 */
  STANDARD: 0,
  /** 一般式 */
  GENERAL: 1,
}

/**
 * @typedef CircleConfig - 圆参数配置
 * 
 * @property {CircleType} type - 圆函数类型
 * @property {number} a - 圆心横坐标
 * @property {number} b - 圆心纵坐标
 * @property {number} r - 半径
 * @property {number} D - 一般式 x 的系数
 * @property {number} E - 一般式 y 的系数y
 * @property {number} F - 一般式的常数
 */

export class Circle {
  /**
   * 
   * @param {number} a - 圆心横坐标
   * @param {number} b - 圆心纵坐标
   * @param {number} r - 半径
   * @param {CircleConfig} config - 非标准方程的配置
   */
  constructor(a, b, r, config) {
    this._type = NaN;
    this._a = NaN;
    this._b = NaN;
    this._r = NaN;
    this._D = NaN;
    this._E = NaN;
    this._F = NaN;

    if (!config || CircleType.STANDARD === config.type) {
      if (r <= 0) throw new Error('radius must bigger than zero!');
      this._type = CircleType.STANDARD;
      this._a = a;
      this._b = b;
      this._r = r;
      return this;
    }
    if (CircleType.GENERAL === config.type) {
      this._type = CircleType.GENERAL;
      this._D = config.D;
      this._E = config.E;
      this._F = config.F;
      return this;
    }
  }
  /**
   * 标准式
   * 
   * @param {number} a - 圆心横坐标
   * @param {number} b - 圆心纵坐标
   * @param {number} r - 半径
   * 
   * @returns {Circle}
   */
  static fromStandard(a, b, r) {
    return new Circle(a, b, r);
  }
  /**
   * 一般式
   * 
   * @param {number} D - 一般式 x 的系数
   * @param {number} E - 一般式 y 的系数
   * @param {number} F - 一般式的常数
   * 
   * @returns {Circle}
   */
  static fromGeneral(D, E, F) {
    return new Circle(0, 0, 0, {
      type: CircleType.GENERAL,
      D,
      E,
      F,
    });
  }
  /**
   * 本圆方程的类型
   * 
   * @return {CircleType}
   */
  get type() {
    return this._type;
  }
  /**
   * 一般式 x 的系数
   * 
   * @returns {number}
   */
  get D() {
    if (this._D === this._D) return this._D;

    if (CircleType.STANDARD === this.type) {
      this._D = -2 * this.a;
      return this._D;
    }
  }
  /**
   * 一般式 y 的系数
   * 
   * @returns {number}
   */
  get E() {
    if (this._E === this._E) return this._E;

    if (CircleType.STANDARD === this.type) {
      this._E = -2 * this.b;
      return this._E;
    }
  }
  /**
   * 一般式的常数
   * 
   * @returns {number}
   */
  get F() {
    if (this._F === this._F) return this._F;

    if (CircleType.STANDARD === this.type) {
      this._F = this.a * this.a + this.b * this.b - this.r * this.r;
      return this._F;
    }
  }
  /**
   * 圆心横坐标
   * 
   * @returns {number}
   */
  get a() {
    if (this._a === this._a) return this._a;

    if (CircleType.GENERAL === this.type) {
      this._a = -.5 * this.D;
      return this._a;
    }
  }
  /**
   * 圆心纵坐标
   * 
   * @returns {number}
   */
  get b() {
    if (this._b === this._b) return this._b;

    if (CircleType.GENERAL === this.type) {
      this._b = -.5 * this.E;
      return this._b;
    }
  }
  /**
   * 半径
   * 
   * @returns {number}
   */
  get r() {
    if (this._r === this._r) return this._r;

    if (CircleType.GENERAL === this.type) {
      this._r = Math.sqrt(this.D * this.D + this.E * this.E - this.F * 4) * .5;

      return this._r;
    }
  }
  /**
   * 周长
   * 
   * @returns {number}
   */
  get perimeter() {
    return Math.PI  * this.r * 2;
  }
  /**
   * 面积
   * 
   * @returns {number}
   */
  get area() {
    return Math.PI * this.r * this.r;
  }
}