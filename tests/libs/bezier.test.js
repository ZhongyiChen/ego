import chai from 'chai';
import {
  fix,
} from '../../src/utils/number';
import {
  quadraticBezier,
  cubicBezier,
  parametricQuadraticBezier,
  parametricCubicBezier,
} from '../../src/libs/bezier';

const expect = chai.expect

chai.should();

describe('quadraticBezier', () => {
  const ease = quadraticBezier(.38, 1);
  it('the resultant function can get right Y with X', () => {
    fix(ease(0), 5)
      .should.equal(0);
    fix(ease(.2), 5)
      .should.equal(.42893);
    fix(ease(.5), 5)
      .should.equal(.80566);
    fix(ease(.75), 5)
      .should.equal(.95583);
    fix(ease(1), 5)
      .should.equal(1);
  })
})

describe('cubicBezier', () => {
  const ease = cubicBezier(.35, 1, .65, 0);
  it('the resultant function can get right Y with X', () => {
    fix(ease(0), 7)
      .should.equal(0);
    fix(ease(.2), 7)
      .should.equal(.3867456);
    fix(ease(.5), 7)
      .should.equal(.5);
    fix(ease(.8), 7)
      .should.equal(.6132544);
    fix(ease(1), 7)
      .should.equal(1);
  })
})

describe('parametricQuadraticBezier', () => {
  // 相关点的可以参考 https://pomax.github.io/bezierinfo/#intersections 的 <What about curve-line intersections?> 小节
  const curve = parametricQuadraticBezier(0, 0, 38, 100, 100, 100);
  it('get the point with progress', () => {
    curve(0)
      .should.deep.equal([0, 0])
    curve(.2)
      .should.deep.equal([16.16, 36])
    curve(.5)
      .should.deep.equal([44, 75])
    curve(.75)
      .should.deep.equal([70.5, 93.75])
    curve(.8)
      .should.deep.equal([76.16, 96])
    curve(.9)
      .should.deep.equal([87.84, 99])
    curve(1)
      .should.deep.equal([100, 100])
  })
})

describe('parametricCubicBezier', () => {
  // 相关点的可以参考 https://pomax.github.io/bezierinfo/#intersections 的 <What about curve-line intersections?> 小节
  const curve = parametricCubicBezier(0, 0, 35, 100, 65, 0, 100, 100);
  it('get the point with progress', () => {
    curve(0)
      .should.deep.equal([0, 0])
    curve(.2)
      .should.deep.equal([20.480000000000004, 39.2])
    curve(.5)
      .should.deep.equal([50, 50])
    curve(.75)
      .should.deep.equal([74.53125, 56.25])
    curve(.8)
      .should.deep.equal([79.52000000000001, 60.8])
    curve(.9)
      .should.deep.equal([89.64, 75.6])
    curve(1)
      .should.deep.equal([100, 100])
  })
})
