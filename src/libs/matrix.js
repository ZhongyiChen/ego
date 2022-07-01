/**
 * @author 陈忠艺 <ego@chenzhongyi.net>
 * 
 * 线性代数(矩阵)的生成与计算
 */

/**
 * @typedef {[number]} Row - 行
 */
/**
 * @typedef {[number]} Col - 列
 */

/**
 * 检查矩阵有效性
 * 
 * @param {[Row]} matrix - 矩阵
 * 
 * @returns {boolean}
 */
function checkIsMatrix(matrix) {
  if (!Array.isArray(matrix)) return false;
  if (!Array.isArray(matrix[0])) return false;

  return true;
}

/**
 * 矩阵管理
 */
export class Matrix {
  /**
   * 构建矩阵
   * @param {[Row]|number} rows 行
   * @param {number} [cols] 列
   */
  constructor(rows, cols) {
    this._matrix = [[0]];
    this._rows = 1;
    this._cols = 1;

    if (checkIsMatrix(rows)) {
      // 初始参数是一个矩阵
      this._rows = rows.length;
      this._cols = Math.max(...rows.map(r => r.length));
      this._matrix = rows;
    } else if ('number' === typeof rows) {
      this._rows = rows;
      this._cols = cols || rows;
      this._matrix = Matrix.create(this._rows, this._cols);
    } else {
      throw new Error('Invalid params for Matrix constructor')
    }
  }
  /**
   * 创建一个矩阵
   * 
   * @param {number} rows 行数
   * @param {number} cols 列数
   * 
   * @returns {[Row]}
   */
  static create(rows, cols) {
    const m = [];
    const r = [];

    for (let j = cols; j > 0; j--) {
      r.push(0);
    }
    for (let i = rows; i > 0; i--) {
      m.push([...r]);
    }

    return m;
  }
  /**
   * 返回第 N 行
   * 
   * @param {number} n - 第 N 行，从 1 算起
   * 
   * @returns {Row}
   */
  getRow(n) {
    if (n < 1 || n > this._rows) {
      throw new Error(`第 ${n} 行不存在`)
    }
  }
  /**
   * 返回第 N 列
   * 
   * @param {number} n - 第 N 列，从 1 算起
   * 
   * @returns {Row}
   */
  getCol(n) {
    if (n < 1 || n > this._cols) {
      throw new Error(`第 ${n} 列不存在`)
    }
  }
  /**
   * 计算出方阵的结果
   * 
   * @returns {number}
   */
  value() {
    if (this._cols !== this._rows) {
      throw new Error('非方阵不能计算结果');
    }
  }
}