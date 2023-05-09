import chai from 'chai';
import {
  whatSignIs,
  fix,
  primeGreaterThan,
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

describe('number: primeGreaterThan', () => {
  it('can get a smallest prime number bigger than the given number', () => {
    primeGreaterThan(2)
      .should.equal(3);
    primeGreaterThan(3)
      .should.equal(5);
    primeGreaterThan(5)
      .should.equal(7);
    primeGreaterThan(24)
      .should.equal(29);
    primeGreaterThan(30)
      .should.equal(31);
    primeGreaterThan(31)
      .should.equal(37);
    primeGreaterThan(9967)
      .should.equal(9973);
    primeGreaterThan(9973)
      .should.equal(10007);
    primeGreaterThan(10000)
      .should.equal(10007);
    primeGreaterThan(49957)
      .should.equal(49991);
    primeGreaterThan(49994)
      .should.equal(49999);
  })
})
