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
  it('should calculate the result collectly', () => {
    new Matrix([
      [2, -1],
      [1, 3],
    ]).value().should.equal(7);
    new Matrix([
      [1, 2, 4],
      [3, 2, 5],
      [4, 2, 3],
    ]).value().should.equal(10);
    new Matrix([
      [3, 1, 2],
      [290, 106, 196],
      [5, -3, 2],
    ]).value().should.equal(0);
    new Matrix([
      [0, 0, 0, 1],
      [0, 0, 2, 0],
      [0, 3, 0, 0],
      [4, 0, 0, 0],
    ]).value().should.equal(24);
  })
})