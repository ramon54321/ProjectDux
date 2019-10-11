import Vector from './Vector'

describe('Add', () => {
  it('adds positive values', () => {
    const a = {
      x: 3,
      y: 5,
    }
    const b = {
      x: 4,
      y: 3,
    }
    const result = Vector.add(a, b)
    const expectation = {
      x: 7,
      y: 8,
    }
    expect(result).toStrictEqual(expectation)
  })
  it('adds negative values', () => {
    const a = {
      x: 3,
      y: -5,
    }
    const b = {
      x: -4,
      y: -3,
    }
    const result = Vector.add(a, b)
    const expectation = {
      x: -1,
      y: -8,
    }
    expect(result).toStrictEqual(expectation)
  })
})

describe('Subtract', () => {
  it('subtracts positive values', () => {
    const a = {
      x: 3,
      y: 5,
    }
    const b = {
      x: 4,
      y: 3,
    }
    const result = Vector.subtract(a, b)
    const expectation = {
      x: -1,
      y: 2,
    }
    expect(result).toStrictEqual(expectation)
  })
  it('subtracts negative values', () => {
    const a = {
      x: 3,
      y: -5,
    }
    const b = {
      x: -4,
      y: -3,
    }
    const result = Vector.subtract(a, b)
    const expectation = {
      x: 7,
      y: -2,
    }
    expect(result).toStrictEqual(expectation)
  })
})

describe('Scale', () => {
  it('scales vector with positive factor', () => {
    const a = {
      x: 3,
      y: 5,
    }
    const factor = 4
    const result = Vector.scale(a, factor)
    const expectation = {
      x: 12,
      y: 20,
    }
    expect(result).toStrictEqual(expectation)
  })
  it('scales vector with negative factor', () => {
    const a = {
      x: 3,
      y: 5,
    }
    const factor = -2
    const result = Vector.scale(a, factor)
    const expectation = {
      x: -6,
      y: -10,
    }
    expect(result).toStrictEqual(expectation)
  })
  it('scales vector with decimal factor', () => {
    const a = {
      x: 3,
      y: 5,
    }
    const factor = 1 / 2
    const result = Vector.scale(a, factor)
    const expectation = {
      x: 1.5,
      y: 2.5,
    }
    expect(result).toStrictEqual(expectation)
  })
})

describe('Square Magnitude', () => {
  it('gets the squared magnitude with positive components', () => {
    const a = {
      x: 3,
      y: 4,
    }
    const result = Vector.squareMagnitude(a)
    const expectation = 25
    expect(result).toStrictEqual(expectation)
  })
  it('gets the squared magnitude with negative components', () => {
    const a = {
      x: -3,
      y: 4,
    }
    const result = Vector.squareMagnitude(a)
    const expectation = 25
    expect(result).toStrictEqual(expectation)
  })
})

describe('Magnitude', () => {
  it('gets the magnitude with positive components', () => {
    const a = {
      x: 3,
      y: 4,
    }
    const result = Vector.magnitude(a)
    const expectation = 5
    expect(result).toStrictEqual(expectation)
  })
  it('gets the magnitude with negative components', () => {
    const a = {
      x: -3,
      y: 4,
    }
    const result = Vector.magnitude(a)
    const expectation = 5
    expect(result).toStrictEqual(expectation)
  })
})

describe('Unit', () => {
  it('gets the normalized vector with positive components', () => {
    const a = {
      x: 0,
      y: 4,
    }
    const result = Vector.unit(a)
    const expectation = {
      x: 0,
      y: 1,
    }
    expect(result).toStrictEqual(expectation)
  })
  it('gets the normalized vector with negative components', () => {
    const a = {
      x: -4,
      y: 0,
    }
    const result = Vector.unit(a)
    const expectation = {
      x: -1,
      y: 0,
    }
    expect(result).toStrictEqual(expectation)
  })
})

describe('Direction', () => {
  it('gets the normalized direction vector with positive components', () => {
    const a = {
      x: 4,
      y: 4,
    }
    const b = {
      x: 5,
      y: 4,
    }
    const result = Vector.direction(a, b)
    const expectation = {
      x: 1,
      y: 0,
    }
    expect(result).toStrictEqual(expectation)
  })
  it('gets the normalized direction vector with negative components', () => {
    const a = {
      x: -3,
      y: -7,
    }
    const b = {
      x: -3,
      y: -9,
    }
    const result = Vector.direction(a, b)
    const expectation = {
      x: 0,
      y: -1,
    }
    expect(result).toStrictEqual(expectation)
  })
})

describe('Dot', () => {
  it('gets the dot product with positive components', () => {
    const a = {
      x: 4,
      y: 4,
    }
    const b = {
      x: 5,
      y: 4,
    }
    const result = Vector.dot(a, b)
    const expectation = 36
    expect(result).toStrictEqual(expectation)
  })
  it('gets the dot product with negative components', () => {
    const a = {
      x: -3,
      y: -7,
    }
    const b = {
      x: -3,
      y: -9,
    }
    const result = Vector.dot(a, b)
    const expectation = 72
    expect(result).toStrictEqual(expectation)
  })
})

describe('Angle', () => {
  it('gets the angle between two vectors with positive components', () => {
    const a = {
      x: 4,
      y: 0,
    }
    const b = {
      x: 0,
      y: 4,
    }
    const result = Vector.angleBetween(a, b)
    const expectation = Math.PI / 2
    expect(result).toStrictEqual(expectation)
  })
  it('gets the angle between two vectors with negative components', () => {
    const a = {
      x: -4,
      y: 0,
    }
    const b = {
      x: 0,
      y: 4,
    }
    const result = Vector.angleBetween(a, b)
    const expectation = Math.PI / 2
    expect(result).toBeCloseTo(expectation)
  })
  it('gets the angle between two vectors with acute angle', () => {
    const a = {
      x: 4,
      y: 0,
    }
    const b = {
      x: 4,
      y: 4,
    }
    const result = Vector.angleBetween(a, b)
    const expectation = Math.PI / 4
    expect(result).toBeCloseTo(expectation)
  })
})

describe('Bisector', () => {
  it('gets the normalized bisector vector with positive components', () => {
    const a = {
      x: 0,
      y: 2,
    }
    const b = {
      x: 5,
      y: 0,
    }
    const result = Vector.bisector(a, b)
    const expectation = {
      x: 0.71,
      y: 0.71,
    }
    expect(result.x).toBeCloseTo(expectation.x)
    expect(result.y).toBeCloseTo(expectation.y)
  })
  it('gets the normalized bisector vector with negative components', () => {
    const a = {
      x: 0,
      y: -2,
    }
    const b = {
      x: 5,
      y: 0,
    }
    const result = Vector.bisector(a, b)
    const expectation = {
      x: 0.71,
      y: -0.71,
    }
    expect(result.x).toBeCloseTo(expectation.x)
    expect(result.y).toBeCloseTo(expectation.y)
  })
})

describe('Inset Point', () => {
  it('gets the point inset between two vectors given radius and positive components', () => {
    const a = {
      x: 0,
      y: 2,
    }
    const b = {
      x: 5,
      y: 0,
    }
    const result = Vector.insetPoint(a, b, 0.5)
    const expectation = {
      x: 0.5,
      y: 0.5,
    }
    expect(result.x).toBeCloseTo(expectation.x)
    expect(result.y).toBeCloseTo(expectation.y)
  })
  it('gets the point inset between two vectors given radius and negative components', () => {
    const a = {
      x: 0,
      y: -2,
    }
    const b = {
      x: 5,
      y: 0,
    }
    const result = Vector.insetPoint(a, b, 0.5)
    const expectation = {
      x: 0.5,
      y: -0.5,
    }
    expect(result.x).toBeCloseTo(expectation.x)
    expect(result.y).toBeCloseTo(expectation.y)
  })
})

describe('Projection', () => {
  it('gets the projection of vectors with positive components', () => {
    const a = {
      x: 1,
      y: 1,
    }
    const b = {
      x: 1,
      y: -0.5,
    }
    const result = Vector.projection(a, b)
    const expectation = {
      x: 0.4,
      y: -0.2,
    }
    expect(result.x).toBeCloseTo(expectation.x)
    expect(result.y).toBeCloseTo(expectation.y)
  })
  it('gets the projection of vectors with negative components', () => {
    const a = {
      x: -0.5,
      y: 1,
    }
    const b = {
      x: 1,
      y: -0.5,
    }
    const result = Vector.projection(a, b)
    const expectation = {
      x: -0.8,
      y: 0.4,
    }
    expect(result.x).toBeCloseTo(expectation.x)
    expect(result.y).toBeCloseTo(expectation.y)
  })
})

describe('Radial Angle', () => {
  it('gets the angle to a point from the origin with positive components', () => {
    const a = {
      x: 1,
      y: 1,
    }
    const result = Vector.angleTo(a)
    const expectation = Math.PI / 4
    expect(result).toBeCloseTo(expectation)
  })
  it('gets the angle to a point from the origin with negative components', () => {
    const a = {
      x: 1,
      y: -1,
    }
    const result = Vector.angleTo(a)
    const expectation = -Math.PI / 4
    expect(result).toBeCloseTo(expectation)
  })
  it('gets the angle to a point from the origin with negative components', () => {
    const a = {
      x: 0,
      y: -1,
    }
    const result = Vector.angleTo(a)
    const expectation = -Math.PI / 2
    expect(result).toBeCloseTo(expectation)
  })
  it('gets the angle to a point from the origin with negative components', () => {
    const a = {
      x: -1,
      y: -1,
    }
    const result = Vector.angleTo(a)
    const expectation = -3 * (Math.PI / 4)
    expect(result).toBeCloseTo(expectation)
  })
  it('gets the angle to a point from the origin with negative components', () => {
    const a = {
      x: -1,
      y: 0,
    }
    const result = Vector.angleTo(a)
    const expectation = Math.PI
    expect(result).toBeCloseTo(expectation)
  })
  it('gets the angle to a point from a given point with negative components', () => {
    const a = {
      x: 1,
      y: 1,
    }
    const b = {
      x: 2,
      y: 2,
    }
    const result = Vector.angleTo(a, b)
    const expectation = -3 * (Math.PI / 4)
    expect(result).toBeCloseTo(expectation)
  })
})

describe('Perpendicular', () => {
  it('gets the perpendicular vector with positive components', () => {
    const a = {
      x: 1,
      y: 1,
    }
    const result = Vector.perpendicular(a)
    const expectation = {
      x: -0.7071,
      y: 0.7071,
    }
    expect(result.x).toBeCloseTo(expectation.x)
    expect(result.y).toBeCloseTo(expectation.y)
  })
  it('gets the perpendicular vector with negative components', () => {
    const a = {
      x: -1,
      y: 1,
    }
    const result = Vector.perpendicular(a)
    const expectation = {
      x: -0.7071,
      y: -0.7071,
    }
    expect(result.x).toBeCloseTo(expectation.x)
    expect(result.y).toBeCloseTo(expectation.y)
  })
})

describe('Angle Vector', () => {
  it('gets a vector given a positive angle', () => {
    const a = Math.PI / 2
    const result = Vector.angleVector(a)
    const expectation = {
      x: 0,
      y: 1,
    }
    expect(result.x).toBeCloseTo(expectation.x)
    expect(result.y).toBeCloseTo(expectation.y)
  })
  it('gets a vector given a negative angle', () => {
    const a = -Math.PI / 2
    const result = Vector.angleVector(a)
    const expectation = {
      x: 0,
      y: -1,
    }
    expect(result.x).toBeCloseTo(expectation.x)
    expect(result.y).toBeCloseTo(expectation.y)
  })
  it('gets a vector given a negative acute angle', () => {
    const a = -Math.PI / 4
    const result = Vector.angleVector(a)
    const expectation = {
      x: 0.7071,
      y: -0.7071,
    }
    expect(result.x).toBeCloseTo(expectation.x)
    expect(result.y).toBeCloseTo(expectation.y)
  })
  it('gets a vector given a excessive angle', () => {
    const a = (3 * Math.PI) / 2
    const result = Vector.angleVector(a)
    const expectation = {
      x: 0,
      y: -1,
    }
    expect(result.x).toBeCloseTo(expectation.x)
    expect(result.y).toBeCloseTo(expectation.y)
  })
})
