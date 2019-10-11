import Circle from './Circle'

describe('Arc Length', () => {
  it('gets the angle to a point from the origin with positive components', () => {
    const r = 1
    const a = Math.PI / 2
    const result = Circle.arcLength(r, a)
    const expectation = (2 * Math.PI) / 4
    expect(result).toBeCloseTo(expectation)
  })
})
