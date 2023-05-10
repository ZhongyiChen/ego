import chai from 'chai';
import {
  clamp,
  lerp,
  horner,
  det,
  abs,
  floor,
  sqrt,
  factorial,
  isPrime,
} from '../../src/libs/math';

const expect = chai.expect

chai.should();

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

describe('number: horner', () => {
  it('caculate polynomial pretty fast', () => {
    horner([4, 3, 2, 1], 2)
      .should.equal(49);
    horner([2, -1, -3, 1, -5], 3)
      .should.equal(106);
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

describe('number: abs', () => {
  it('get absolute value like Math.abs', () => {
    abs(Number.MAX_VALUE)
      .should.equal(Math.abs(Number.MAX_VALUE))
    abs(-Number.MAX_VALUE)
      .should.equal(Math.abs(-Number.MAX_VALUE))
    abs(Number.MIN_VALUE)
      .should.equal(Math.abs(Number.MIN_VALUE))
    abs(-Number.MIN_VALUE)
      .should.equal(Math.abs(-Number.MIN_VALUE))
    abs(0)
      .should.equal(Math.abs(0))
  })
})

describe('number: floor', () => {
  it('get floor value like Math.floor', () => {
    floor(9999.9999)
      .should.equal(Math.floor(9999.9999))
    floor(-9999.9999)
      .should.equal(Math.floor(-9999.9999))
    floor(.99999999)
      .should.equal(Math.floor(.99999999))
    floor(-.99999999)
      .should.equal(Math.floor(-.99999999))
    floor(0)
      .should.equal(Math.floor(0))
  })
})

describe('number: sqrt', () => {
  it('get sqrt value like Math.sqrt', () => {
    sqrt(4)
      .should.equal(Math.sqrt(4))
    sqrt(1.44)
      .should.equal(Math.sqrt(1.44))
    sqrt(1.024)
      .should.equal(Math.sqrt(1.024))
    sqrt(0)
      .should.equal(Math.sqrt(0))
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
