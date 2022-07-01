import chai from 'chai';
import {
  Matrix,
} from '../../src/libs/matrix';

const expect = chai.expect

chai.should();

describe('Matrix', () => {
  it('can be inited with 2-dimension array', () => {
    expect(function () {
      return new Matrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])
    }).to.not.throw();
  })
  it('can be inited with rows and cols', () => {
    expect(function () {
      return new Matrix(3, 4)
    }).to.not.throw();
  })
  it('can not be inited with 1-dimension array', () => {
    expect(function () {
      return new Matrix([1, 2, 3, 4])
    }).to.throw();
  })
})