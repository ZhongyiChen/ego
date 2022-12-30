import chai from 'chai';
import {
  EgoDate,
} from '../../src/libs/datetime';

const expect = chai.expect

chai.should();

describe('EgoDate', () => {
  it('can be inited with a Date, a timestamp, a string with a pattern', () => {
    expect(function () {
      return new EgoDate(new Date(2019, 0, 1))
    }).to.not.throw();
    expect(function () {
      return new EgoDate(1548950400000)
    }).to.not.throw();
    expect(function () {
      return new EgoDate('2019-01-01', 'YYYY-MM-DD');
    }).to.not.throw();
  })
  it('can be formatted to a pattern', () => {
    new EgoDate(new Date(2019, 0, 1))
      .format('YYYY年MM月DD日').should.equal('2019年01月01日');
  })
})
