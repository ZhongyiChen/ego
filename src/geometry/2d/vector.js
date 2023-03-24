/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 向量的表示及操作。
 */

/**
 * @typedef Vtor - 二维向量
 * 
 * @property {number} x - 横坐标
 * @property {number} y - 纵坐标
 */

/**
 * 二维向量。
 * 
 * 本类型下诸方法多为静态方法，目的是提供外界一个方便的计算接口，而不需要初始化。
 */
export class Vector2D {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  /**
   * 创建一个新的二维向量，等同于 new 操作符
   * 
   * @param {number} x - 横坐标
   * @param {number} y - 纵坐标
   * 
   * @returns {Vtor}
   */
  static create(x, y) {
    return new Vector2D(x, y);
  }
  /**
   * 克隆
   * 
   * @param {Vtor} v
   * 
   * @returns {Vtor} - 一个全新的二维向量
   */
  static clone(v) {
    return Vector2D.create(
      v.x,
      v.y,
    );
  }
  /**
   * 向量相加
   * 
   * @param {Vtor} v1
   * @param {Vtor} v2
   * 
   * @returns {Vtor}
   */
  static add(v1, v2) {
    return Vector2D.create(
      v1.x + v2.x,
      v1.y + v2.y,
    );
  }
  /**
   * 向量相减
   * 
   * @param {Vtor} v1
   * @param {Vtor} v2
   * 
   * @returns {Vtor}
   */
  static substract(v1, v2) {
    return Vector2D.create(
      v1.x - v2.x,
      v1.y - v2.y,
    );
  }
  /**
   * 向量乘标量
   * 
   * @param {Vtor} v
   * @param {number} scalar - 标量数值
   * 
   * @returns {Vtor}
   */
  static multiply(v, scalar = 1) {
    return Vector2D.create(
      v.x * scalar,
      v.y * scalar,
    );
  }
  /**
   * 向量除标量
   * 
   * @param {Vtor} v
   * @param {number} scalar - 标量数值
   * 
   * @returns {Vtor}
   */
  static divide(v, scalar = 1) {
    return Vector2D.create(
      v.x / scalar,
      v.y / scalar,
    );
  }
  /**
   * 转化为单位向量，方向不变
   * 
   * @param {Vtor} v
   * 
   * @returns {Vtor}
   */
  static unit(v) {
    const len = Vector2D.magnitude(v);

    return Vector2D.create(
      v.x / len,
      v.y / len,
    );
  }
  /**
   * 获取向量长度值的平方
   * 
   * @param {Vtor} v
   * 
   * @returns {number}
   */
  static magnitudeSquared(v) {
    return v.x * v.x + v.y * v.y;
  }
  /**
   * 获取向量的长度值
   * 
   * @param {Vtor} v
   * 
   * @returns {number}
   */
  static magnitude(v) {
    return Math.sqrt(Vector2D.magnitudeSquared(v));
  }
  /**
   * 向量点乘
   * 
   * 公式：v1 • v2 = |v1| * |v2| * cosθ
   * 
   * @param {Vtor} v1
   * @param {Vtor} v2
   * 
   * @returns {number} 点积
   */
  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  /**
   * 向量叉乘(求的是绝对值，而非第三维的垂直向量)
   * 
   * @param {Vtor} v1
   * @param {Vtor} v2
   * 
   * @returns {number} 叉积
   */
  static cross(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
  }
  /**
   * 计算两个向量的夹角
   * 
   * 公式：cosθ = (v1 * v2) / (|v1| * |v2|)
   * 
   * @param {Vtor} v1
   * @param {Vtor} v2
   * 
   * @returns {number} 弧度值
   */
  static angle(v1, v2) {
    return Math.acos(
      Vector2D.dot(v1, v2) / (
        Vector2D.magnitude(v1) * Vector2D.magnitude(v2)
      )
    );
  }
}

/**
 * 二维向量。
 * 
 * 与 Vector2D 的区别在于 VectorII 的方法主要用于操作自身属性，或使用自身属性来计算获得值。
 */
export class VectorII {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  /**
   * 克隆
   * 
   * @returns {VectorII} - 一个全新的二维向量
   */
  clone() {
    return new VectorII(
      this.x,
      this.y,
    );
  }
  /**
   * 加上向量
   * 
   * @param {Vtor} v
   * 
   * @returns {VectorII}
   */
  add(v) {
    this.x += Number(v.x || 0);
    this.y += Number(v.y || 0);

    return this;
  }
  /**
   * 减去向量
   * 
   * @param {Vtor} v
   * 
   * @returns {Vtor}
   */
  substract(v) {
    this.x -= Number(v.x || 0);
    this.y -= Number(v.y || 0);

    return this;
  }
  /**
   * 乘以标量
   * 
   * @param {number} scalar - 标量数值
   * 
   * @returns {Vtor}
   */
  multiply(scalar = 1) {
    this.x *= Number(scalar || 0);
    this.y *= Number(scalar || 0);

    return this;
  }
  /**
   * 除以标量
   * 
   * @param {Vtor} v
   * @param {number} scalar - 标量数值
   * 
   * @returns {Vtor}
   */
  divide(scalar = 1) {
    if (0 === +scalar) throw new Error('Vector cannot be devided by 0!');

    this.x /= Number(scalar || 1);
    this.y /= Number(scalar || 1);

    return this;
  }
  /**
   * 转化为单位向量，方向不变
   * 
   * @returns {Vtor}
   */
  unit() {
    const len = this.magnitude();

    this.x /= len;
    this.y /= len;

    return this;
  }
  /**
   * 获取向量长度值的平方
   * 
   * @returns {number}
   */
  magnitudeSquared() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * 获取向量的长度值
   * 
   * @returns {number}
   */
  magnitude() {
    return Math.sqrt(this.magnitudeSquared());
  }
  /**
   * 点乘向量
   * 
   * 公式：|this| * |v| * cosθ
   * 
   * @param {Vtor} v
   * 
   * @returns {number} 点积
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  /**
   * 叉乘向量(求的是绝对值，而非第三维的垂直向量)
   * 
   * @param {Vtor} v
   * 
   * @returns {number} 叉积
   */
  cross(v) {
    return this.x * v.y - this.y * v.x;
  }
  /**
   * 与另一个向量的夹角
   * 
   * 公式：cosθ = (this * v) / (|this| * |v|)
   * 
   * @param {Vtor} v
   * 
   * @returns {number} 弧度值
   */
  angle(v) {
    return Math.acos(
      this.dot(v) / (
        this.magnitude() * Vector2D.magnitude(v)
      )
    );
  }
}