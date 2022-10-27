import chai from 'chai';
import {
  sequence,
  arrangement,
  combination,
  flatten,
} from '../../src/utils/array';

const expect = chai.expect

chai.should();

describe('array: sequence', () => {
  it('can get normal stepping numbers', () => {
    sequence(1, 10)
      .should.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  })
  it('can get same numbers if you want', () => {
    sequence(3, 10, n => n)
      .should.deep.equal([3, 3, 3, 3, 3, 3, 3, 3, 3, 3]);
  })
  it('can also deal with string sequence', () => {
    sequence('a', 10, ch => String.fromCharCode(ch.charCodeAt() + 1))
      .should.deep.equal(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
  })
})

describe('array: arrangement', () => {
  it('gives all the situations it could be', () => {
    arrangement([1])
      .should.deep.equal([
        [1],
      ]);
    arrangement([1, 2])
      .should.deep.equal([
        [1, 2],
        [2, 1],
      ]);
    arrangement([1, 2, 3])
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

describe('array: combination', () => {
  it('gives all the results that it could be', () => {
    combination([1, 2, 3])
      .should.deep.equal([
        [1],
        [2],
        [3],
        [1, 2],
        [1, 3],
        [2, 3],
        [1, 2, 3],
      ]);
  })
  it('can require how many elements each result have', () => {
    combination([1, 2, 3], 1)
      .should.deep.equal([
        [1],
        [2],
        [3],
      ]);
    combination([1, 2, 3], 2)
      .should.deep.equal([
        [1, 2],
        [1, 3],
        [2, 3],
      ]);
    combination([1, 2, 3], 3)
      .should.deep.equal([
        [1, 2, 3],
      ]);
  })
})

describe('array: flatten', () => {
  it('make the n-dimension to 1-dimension', () => {
    flatten([1, [2, [3, 4], 5], 6, [7, 8, [9]]])
      .should.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    flatten([1, [2, [3, [4, [5, [6]]]]]])
      .should.deep.equal([1, 2, 3, 4, 5, 6]);
  })
})
