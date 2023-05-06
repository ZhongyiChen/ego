import chai from 'chai';
import {
  whatSignIs,
  clamp,
  horner,
  lerp,
  det,
  factorial,
  fix,
  isPrime,
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

describe('number: horner', () => {
  it('caculate polynomial pretty fast', () => {
    horner([4, 3, 2, 1], 2)
      .should.equal(49);
    horner([2, -1, -3, 1, -5], 3)
      .should.equal(106);
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

describe('number: fix', () => {
  it('keep 2 decimal places by default', () => {
    fix(3.1415926)
      .should.equal(3.14);
    fix(34.5678)
      .should.equal(34.57);
    fix(99.99999)
      .should.equal(100);
  })
  it('keep the decimal places you want', () => {
    fix(3.1415926, 4)
      .should.equal(3.1416);
    fix(34.5678, 1)
      .should.equal(34.6);
    fix(99.99999, 5)
      .should.equal(99.99999);
  })
})

describe('number: isPrime', () => {
  it('can judge if a number is prime', () => {
    isPrime(2)
      .should.equal(true);
    isPrime(3)
      .should.equal(true);
    isPrime(5)
      .should.equal(true);
    isPrime(7)
      .should.equal(true);
    isPrime(11)
      .should.equal(true);
    isPrime(13)
      .should.equal(true);
    isPrime(39)
      .should.equal(false);
    isPrime(49993)
      .should.equal(true);
    isPrime(49999)
      .should.equal(true);
  })
})
