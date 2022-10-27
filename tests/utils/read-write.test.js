import chai from 'chai';
import {
  parse,
  assign,
  whatTypeIs,
} from '../../src/utils/read-write';

const expect = chai.expect

chai.should();

describe('read-write: parse', () => {
  it('can fetch value through deep object', () => {
    parse({a: {b: {c: 1}}}, 'a.b')
      .should.deep.equal({c: 1});
    parse({a: {b: {c: 1}}}, "a['b'].c")
      .should.equal(1);
    expect(parse({a: {b: {c: 1}}}, 'a.d'))
      .to.be.undefined;
  })
})

describe('read-write: assign', () => {
  it('cannot be used for base type value', () => {
    expect(assign(void 0, '1', 1))
      .to.be.false;
    expect(assign(123, '1', 1))
      .to.be.false;
    expect(assign('hello', '1', 1))
      .to.be.false;
    expect(assign(true, '1', 1))
      .to.be.false;
    expect(assign(Symbol(), '1', 1))
      .to.be.false;
    expect(assign(null, '1', 1))
      .to.be.false;
  })
  it('can be used with deep path', () => {
    const obj = {a: {b: {c: 1}}};

    assign(obj, 'a.b.c', 123);

    (obj.a.b.c)
      .should.equal(123);
  })
  it('can create deep path while not exist', () => {
    const obj = {};

    assign(obj, 'x.y.z', 456, true);

    obj.should.deep.equal({x: {y: {z: 456}}});
  })
})

describe('read-write: whatTypeIs', () => {
  it('can distinguish various types of values', () => {
    expect(whatTypeIs(1)).to.equal('number');
    expect(whatTypeIs('hi')).to.equal('string');
    expect(whatTypeIs(undefined)).to.equal('undefined');
    expect(whatTypeIs(null)).to.equal('null');
    expect(whatTypeIs(NaN)).to.equal('nan');
    expect(whatTypeIs([])).to.equal('array');
    expect(whatTypeIs({})).to.equal('object');
    expect(whatTypeIs(true)).to.equal('boolean');
    expect(whatTypeIs(() => {})).to.equal('function');
    // expect(whatTypeIs(document.body)).to.equal('element');
    // expect(whatTypeIs(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))).to.equal('element');
    expect(whatTypeIs(new Date())).to.equal('date');
  });
})
