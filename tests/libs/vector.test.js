import chai from 'chai';
import {
  Vector2D,
  VectorII,
} from '../../src/libs/vector';

const expect = chai.expect

chai.should();

describe('Vector2D', () => {
  it('can be inited with 2 number', () => {
    expect(function () {
      return new Vector2D(2, 5)
    }).to.not.throw();
  })
  it('also can be inited with 2 number by create', () => {
    const vtor = Vector2D.create(2, 5);

    vtor.x.should.equal(2);
    vtor.y.should.equal(5);
  })
  it('clone is ok', () => {
    const vtor = Vector2D.create(2, 5);
    const cloned = Vector2D.clone(vtor);

    vtor.should.not.equal(cloned);
    vtor.x.should.equal(cloned.x);
    vtor.y.should.equal(cloned.y);
  })
  it('add is ok', () => {
    const v1 = {
      x: 3,
      y: 4,
    };
    const v2 = {
      x: 7,
      y: 8,
    };
    const v = Vector2D.add(v1, v2);

    v.x.should.equal(v1.x + v2.x);
    v.y.should.equal(v1.y + v2.y);
  })
  it('substract is ok', () => {
    const v1 = {
      x: 7,
      y: 8,
    };
    const v2 = {
      x: 3,
      y: 5,
    };
    const v = Vector2D.substract(v1, v2);

    v.x.should.equal(v1.x - v2.x);
    v.y.should.equal(v1.y - v2.y);
  })
  it('multiply is ok', () => {
    const v1 = {
      x: 7,
      y: 8,
    };
    const v = Vector2D.multiply(v1, 3);

    v.x.should.equal(v1.x * 3);
    v.y.should.equal(v1.y * 3);
  })
  it('divide is ok', () => {
    const v1 = {
      x: 12,
      y: 9,
    };
    const v = Vector2D.divide(v1, 3);

    v.x.should.equal(v1.x / 3);
    v.y.should.equal(v1.y / 3);
  })
  it('unit is ok', () => {
    const v1 = {
      x: 12,
      y: 9,
    };
    const v = Vector2D.unit(v1);

    (v.x * v.x + v.y * v.y).should.equal(1);
  })
  it('get the squared length', () => {
    const v = {
      x: 3,
      y: 4,
    };

    Vector2D.magnitudeSquared(v).should.equal(25);
  })
  it('get the length', () => {
    const v = {
      x: 3,
      y: 4,
    };

    Vector2D.magnitude(v).should.equal(5);
  })
  it('get dot value', () => {
    const v1 = {
      x: 7,
      y: 8,
    };
    const v2 = {
      x: 3,
      y: 5,
    };

    Vector2D.dot(v1, v2).should.equal(v1.x * v2.x + v1.y * v2.y);
  })
  it('get cross value', () => {
    const v1 = {
      x: 7,
      y: 8,
    };
    const v2 = {
      x: 3,
      y: 5,
    };

    Vector2D.cross(v1, v2).should.equal(v1.x * v2.y - v1.y * v2.x);
  })
  it('get angle value', () => {
    const v1 = {
      x: 0,
      y: 3,
    };
    const v2 = {
      x: 5,
      y: 5,
    };

    // Vector2D.angle(v1, v2) = Math.PI / 4
    Math.abs(Vector2D.angle(v1, v2) - Math.PI / 4).should.lessThan(Number.EPSILON);

    const v3 = {
      x: Math.sqrt(3),
      y: 0,
    };
    const v4 = {
      x: Math.sqrt(3),
      y: 1,
    };

    // Vector2D.angle(v3, v4) = Math.PI / 6
    Math.abs(Vector2D.angle(v3, v4) - Math.PI / 6).should.lessThan(Number.EPSILON);
  })
})

describe('VectorII', () => {
  it('can be inited with 2 number', () => {
    expect(function () {
      return new VectorII(2, 5)
    }).to.not.throw();
  })
  it('clone is ok', () => {
    const vtor = new VectorII(2, 5);
    const cloned = vtor.clone(vtor);

    vtor.should.not.equal(cloned);
    vtor.x.should.equal(cloned.x);
    vtor.y.should.equal(cloned.y);
  })
  it('add is ok', () => {
    const v1 = new VectorII(3, 4);
    const v2 = new VectorII(7, 8);
    
    v1.add(v2);

    v1.x.should.equal(3 + 7);
    v1.y.should.equal(4 + 8);
  })
  it('substract is ok', () => {
    const v1 = new VectorII(7, 8);
    const v2 = new VectorII(3, 5);

    v1.substract(v2);

    v1.x.should.equal(7 - 3);
    v1.y.should.equal(8 - 5);
  })
  it('multiply is ok', () => {
    const v1 = new VectorII(7, 8);

    v1.multiply(3);

    v1.x.should.equal(7 * 3);
    v1.y.should.equal(8 * 3);
  })
  it('divide is ok', () => {
    const v1 = new VectorII(12, 9);

    v1.divide(3);

    v1.x.should.equal(12 / 3);
    v1.y.should.equal(9 / 3);
  })
  it('unit is ok', () => {
    const v1 =new VectorII(12, 9);

    v1.unit();

    (v1.x * v1.x + v1.y * v1.y).should.equal(1);
  })
  it('get the squared length', () => {
    const v = new VectorII(3, 4);

    v.magnitudeSquared().should.equal(25);
  })
  it('get the length', () => {
    const v = new VectorII(3, 4);

    v.magnitude().should.equal(5);
  })
  it('get dot value', () => {
    const v1 = new VectorII(7, 8);
    const v2 = new VectorII(3, 5);

    v1.dot(v2).should.equal(7 * 3 + 8 * 5);
  })
  it('get cross value', () => {
    const v1 = new VectorII(7, 8);
    const v2 = new VectorII(3, 5);

    v1.cross(v2).should.equal(7 * 5 - 8 * 3);
  })
  it('get angle value', () => {
    const v1 = new VectorII(0, 3);
    const v2 = new VectorII(5, 5);

    // v1.angle(v2) = Math.PI / 4
    Math.abs(v1.angle(v2) - Math.PI / 4).should.lessThan(Number.EPSILON);

    const v3 = new VectorII(Math.sqrt(3), 0);
    const v4 = new VectorII(Math.sqrt(3), 1);

    // v3.angle(v4) = Math.PI / 6
    Math.abs(v3.angle(v4) - Math.PI / 6).should.lessThan(Number.EPSILON);
  })
})