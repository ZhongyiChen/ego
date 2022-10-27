import chai from 'chai';
import {
  arrangement,
  combination,
} from '../../src/utils/set';

const expect = chai.expect

chai.should();

describe('set: arrangement', () => {
  it('gives all the situations it could be', () => {
    arrangement(new Set([1]))
      .should.deep.equal([
        [1],
      ]);
    arrangement(new Set([1, 2]))
      .should.deep.equal([
        [1, 2],
        [2, 1],
      ]);
    arrangement(new Set([1, 2, 3]))
      .should.deep.equal([
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1],
      ]);
  })
})

describe('set: combination', () => {
  it('gives all the results that it could be', () => {
    combination(new Set([1, 2, 3]))
      .should.deep.equal([
        new Set([1]),
        new Set([2]),
        new Set([3]),
        new Set([1, 2]),
        new Set([1, 3]),
        new Set([2, 3]),
        new Set([1, 2, 3]),
      ]);
  })
  it('can require how many elements each result have', () => {
    combination([1, 2, 3], 1)
      .should.deep.equal([
        new Set([1]),
        new Set([2]),
        new Set([3]),
      ]);
    combination([1, 2, 3], 2)
      .should.deep.equal([
        new Set([1, 2]),
        new Set([1, 3]),
        new Set([2, 3]),
      ]);
    combination([1, 2, 3], 3)
      .should.deep.equal([
        new Set([1, 2, 3]),
      ]);
  })
})
