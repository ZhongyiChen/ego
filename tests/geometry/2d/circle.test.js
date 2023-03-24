import chai from 'chai';
import {
  Circle,
} from '../../../src/geometry/2d/circle';

const expect = chai.expect

chai.should();

describe('Circle', () => {
  let circle_s = null;    // 标准方程
  let circle_g = null;    // 一般方程
  it('circle can be inited with the centre and radius', () => {
    expect(function () {
      circle_s = new Circle(3, 4, 5);
    }).to.not.throw();
  })
})