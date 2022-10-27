import chai from 'chai';
import {
  whatSignIs,
  clamp,
  lerp,
  det,
  factorial,
} from '../../src/utils/number';

const expect = chai.expect

chai.should();

describe('number: whatSignIs', () => {
  it('can judge the sign of a number', () => {
    whatSignIs(123)
      .should.equal(1);
    whatSignIs(-456)
      .should.equal(-1);
    whatSignIs(0)
      .should.equal(1);
    whatSignIs(-0)
      .should.equal(-1);
    whatSignIs(-Math.PI)
      .should.equal(-1);
  })
})

describe('number: clamp', () => {
  it('make the result bigger or equal min, as well as smaller or equal max', () => {
    clamp(5, 1, 10)
      .should.equal(5);
    clamp(-5, 1, 10)
      .should.equal(1);
    clamp(99, 1, 10)
      .should.equal(10);
    clamp(1, 1, 10)
      .should.equal(1);
    clamp(10, 1, 10)
      .should.equal(10);
  })
})

describe('number: lerp', () => {
  it('can get value smoothly', () => {
    lerp(0, 10, 0)
      .should.equal(0);
    lerp(0, 10, .5)
      .should.equal(5);
    lerp(0, 10, 1)
      .should.equal(10);
  })
})

describe('number: det', () => {
  it('counts the exchange times to make the numbers right order', () => {
    det([2, 3, 1, 6, 4, 5])
      .should.equal(4);
    det([2, 4, 3, 1])
      .should.equal(4);
    det([1, 3, 2, 4])
      .should.equal(1);
    det([1, 3, 5, 7, 9])
      .should.equal(0);
  })
})

describe('number: factorial', () => {
  it('calculate the natural number\'s multiplying', () => {
    factorial(0)
      .should.equal(1);
    factorial(3)
      .should.equal(6);
    factorial(10)
      .should.equal(3628800);
  })
})
