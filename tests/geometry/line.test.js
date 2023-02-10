import chai from 'chai';
import {
  Line,
} from '../../src/geometry/2d/line';

const expect = chai.expect

chai.should();

describe('Line', () => {
  let line_pp = null;     // 两点式
  let line_ge = null;     // 一般式
  let line_si = null;     // 斜截式
  let line_ps = null;     // 点斜式
  let line_ii = null;     // 截距式

  it('segment can be inited with 2 points', () => {
    expect(function () {
      line_pp = new Line(0, 4, 6, 12);
    }).to.not.throw();
  })
  it('can be inited by general way', () => {
    expect(function () {
      line_ge = Line.fromGeneral(3, 1, 4);
    }).to.not.throw();
  })
  it('can be inited with slope and intercept', () => {
    expect(function () {
      line_si = Line.fromSlopeIntercept(4/3, 2);
    }).to.not.throw();
  })
  it('can be inited with point and slope', () => {
    expect(function () {
      line_ps = Line.fromPointSlope(2, 4, -1);
    }).to.not.throw();
  })
  it('can be inited with intercept and intercept', () => {
    expect(function () {
      line_ii = Line.fromInterceptIntercept(-2, 4);
    }).to.not.throw();
  })
  it('can get the true size', () => {
    expect(line_pp.size).to.equal(10);
  })
  it('can get the real k', () => {
    expect(line_pp.k).to.equal(8/6);
    expect(line_ge.k).to.equal(-3/1);
    expect(line_si.k).to.equal(4/3);
    expect(line_ps.k).to.equal(-1);
    expect(line_ii.k).to.equal(-(4/-2));
  })
  it('can get the real a', () => {
    expect(line_pp.a).to.equal(-3);
    expect(line_ge.a).to.equal(-4/3);
    expect(line_si.a).to.equal(-3/2);
    expect(line_ps.a).to.equal(6);
    expect(line_ii.a).to.equal(-2);
  })
  it('can get the real b', () => {
    expect(line_pp.b).to.equal(4);
  })
})