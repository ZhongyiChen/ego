/**
 * @author 陈忠艺
 * 
 * @description 贝塞尔曲线相关计算
 * 
 * 相关概念：
 * 
 * 显式表示(Explicit representation) —— y = f(x)
 * 隐式表示(Implicit representation) —— f(x, y) = 0
 * 参数形式表示(Parametric form) —— x = x(t)，y = y(t)
 */
import {
  lerp,
  horner,
} from './math';

/**
 * 二次贝塞尔函数
 * 
 * 本函数的作用域均对应值域中的一个值，通常用于动画缓动函数
 * 
 * @param {number} p1x - 点1 x，范围 0 ~ 1
 * @param {number} p1y - 点1 y
 * 
 * @returns {(x: number) => (y: number)} 显式坐标求解函数，其中 x 的作用域为 [0, 1]
 */
export function quadraticBezier(p1x, p1y) {
  // 零值判断边界
  const ZERO_LIMIT = 1e-6;
  // 计算多项式系数，这暗含了第一个(p0)和最后一个(p2)控制点分别是 (0, 0) 和 (1, 1)
  const ax = -2 * p1x + 1;
  const bx = 2 * p1x;
  const ay = -2 * p1y + 1;
  const by = 2 * p1y;

  function sampleCurveDerivativeX(t) {
    // 对 `ax t^2 + bx t` 求导，并拓展使用了霍纳法则
    return horner([2 * ax, bx], t);
  }
  function sampleCurveX(t) {
    // `ax t^2 + bx t` 拓展使用了霍纳法则
    return horner([ax, bx, 0], t);
  }
  function sampleCurveY(t) {
    // `ay t^2 + by t` 拓展使用了霍纳法则
    return horner([ay, by, 0], t);
  }
  function solveCurveX(x) {
    let t2 = x;
    let derivative;
    let x2;
    /**
     * 首先，尝试使用 牛顿迭代法 一个通常运算非常快的方程根求解方式
     * 参考资料：
     * https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
     * http://en.wikipedia.org/wikiNewton's_method
     */
    for (let i = 0; i < 8; i++) {
      // f(t) - x == 0 ?
      x2 = sampleCurveX(t2) - x;

      if (Math.abs(x2) < ZERO_LIMIT) return t2;

      derivative = sampleCurveDerivativeX(t2);

      // 如果 牛顿迭代法 出现不收敛的情况，回退到 二分逼近法
      if (Math.abs(derivative) < ZERO_LIMIT) break;

      t2 -= x2 / derivative;
    }

    /**
     * 下面是 二分逼近法 的实现
     * 参考资料：
     * http://en.wikipedia.org/wiki/Bisection_method
     */
    let t1 = 1;
    let t0 = 0;

    t2 = x;

    while (t1 > t0) {
      x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < ZERO_LIMIT) {
        return t2;
      }
      if (x2 > 0) {
        t1 = t2;
      } else {
        t0 = t2;
      }
      t2 = (t1 + t0) / 2;
    }

    // 最终逼近失败
    return t2;
  }
  function fn(x) {
    return sampleCurveY(solveCurveX(x));
  }


  return fn;
}

/**
 * 三次贝塞尔函数
 * 
 * 本函数的作用域均对应值域中的一个值，通常用于动画缓动函数
 * 
 * @param {number} p1x - 点1 x，范围 0 ~ 1
 * @param {number} p1y - 点1 y
 * @param {number} p2x - 点2 x，范围 0 ~ 1
 * @param {number} p2y - 点2 y
 * 
 * @example
 * ---------------------------
 * input: .33, 0, .51, 1
 * output: function ease(x) {}
 * ---------------------------
 * 
 * @returns {(x: number) => (y: number)} 显式坐标求解函数，其中 x 的作用域为 [0, 1]
 */
export function cubicBezier(p1x, p1y, p2x, p2y) {
  // 零值判断边界
  const ZERO_LIMIT = 1e-6;
  // 计算多项式系数，这暗含了第一个(p0)和最后一个(p3)控制点分别是 (0, 0) 和 (1, 1)
  const ax = 3 * p1x - 3 * p2x + 1;
  const bx = 3 * p2x - 6 * p1x;
  const cx = 3 * p1x;
  const ay = 3 * p1y - 3 * p2y + 1;
  const by = 3 * p2y - 6 * p1y;
  const cy = 3 * p1y;

  function sampleCurveDerivativeX(t) {
    // 对 `ax t^3 + bx t^2 + cx t` 求导，并拓展使用了霍纳法则
    return horner([3 * ax, 2 * bx, cx], t);
  }
  function sampleCurveX(t) {
    // `ax t^3 + bx t^2 + cx t` 拓展使用了霍纳法则
    return horner([ax, bx, cx, 0], t);
  }
  function sampleCurveY(t) {
    // `ay t^3 + by t^2 + cy t` 拓展使用了霍纳法则
    return horner([ay, by, cy, 0], t);
  }
  function solveCurveX(x) {
    let t2 = x;
    let derivative;
    let x2;
    /**
     * 首先，尝试使用 牛顿迭代法 一个通常运算非常快的方程根求解方式
     * 参考资料：
     * https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
     * http://en.wikipedia.org/wikiNewton's_method
     */
    for (let i = 0; i < 8; i++) {
      // f(t) - x == 0 ?
      x2 = sampleCurveX(t2) - x;

      if (Math.abs(x2) < ZERO_LIMIT) return t2;

      derivative = sampleCurveDerivativeX(t2);

      // 如果 牛顿迭代法 出现不收敛的情况，回退到 二分逼近法
      if (Math.abs(derivative) < ZERO_LIMIT) break;

      t2 -= x2 / derivative;
    }

    /**
     * 下面是 二分逼近法 的实现
     * 参考资料：
     * http://en.wikipedia.org/wiki/Bisection_method
     */
    let t1 = 1;
    let t0 = 0;

    t2 = x;

    while (t1 > t0) {
      x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < ZERO_LIMIT) {
        return t2;
      }
      if (x2 > 0) {
        t1 = t2;
      } else {
        t0 = t2;
      }
      t2 = (t1 + t0) / 2;
    }

    // 最终逼近失败
    return t2;
  }
  function fn(x) {
    return sampleCurveY(solveCurveX(x));
  }

  return fn;
}

/**
 * 参数形式的二次贝塞尔函数
 * 
 * 与 {@link quadraticBezier} 不同的是，本函数的一个 x 不必只对应一个 y，因此可以用于绘制较为复杂的曲线图形
 * 
 * @param {number} p1x - 点1 x，范围不限
 * @param {number} p1y - 点1 y
 * @param {number} p2x - 点2 x，范围不限
 * @param {number} p2y - 点2 y
 * @param {number} p3x - 点3 x，范围不限
 * @param {number} p3y - 点3 y
 * 
 * @example
 * ---------------------------
 * input: 0, 0, 50, 50, 100, 0
 * output: function curve(t) {}
 * ---------------------------
 * 
 * @returns {(t: number) => ([x: number, y: number])} - 参数方程，其中 t 的范围为 0 ~ 1
 */
export function parametricQuadraticBezier(p1x, p1y, p2x, p2y, p3x, p3y) {
  function fn(t) {
    const ax = lerp(p1x, p2x, t);
    const bx = lerp(p2x, p3x, t);
    const ay = lerp(p1y, p2y, t);
    const by = lerp(p2y, p3y, t);

    return [
      lerp(ax, bx, t),
      lerp(ay, by, t),
    ];
  }

  return fn;
}

/**
 * 参数形式的三次贝塞尔函数
 * 
 * 与 {@link cubicBezier} 不同的是，本函数的一个 x 不必只对应一个 y，因此可以用于绘制较为复杂的曲线图形
 * 
 * @param {number} p1x - 点1 x，范围不限
 * @param {number} p1y - 点1 y
 * @param {number} p2x - 点2 x，范围不限
 * @param {number} p2y - 点2 y
 * @param {number} p3x - 点3 x，范围不限
 * @param {number} p3y - 点3 y
 * @param {number} p4x - 点4 x，范围不限
 * @param {number} p4y - 点4 y
 * 
 * @example
 * ---------------------------
 * input: 0, 0, 33, 50, 67, 50, 100, 0
 * output: function curve(t) {}
 * ---------------------------
 * 
 * @returns {(t: number) => ([x: number, y: number])} - 参数方程，其中 t 的范围为 0 ~ 1
 */
export function parametricCubicBezier(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
  function fn(t) {
    const ax = lerp(p1x, p2x, t);
    const bx = lerp(p2x, p3x, t);
    const cx = lerp(p3x, p4x, t);
    const ay = lerp(p1y, p2y, t);
    const by = lerp(p2y, p3y, t);
    const cy = lerp(p3y, p4y, t);

    const axx = lerp(ax, bx, t);
    const bxx = lerp(bx, cx, t);
    const ayy = lerp(ay, by, t);
    const byy = lerp(by, cy, t);

    return [
      lerp(axx, bxx, t),
      lerp(ayy, byy, t),
    ];
  }

  return fn;
}
