import Map from './Map'

describe('Map Interval', () => {
  it('maps interval with many elements', () => {
    const a = [5, 10, 15, 20, 25]
    const result = Map.interval(a, (a, b) => a + b)
    const expectation = [15, 25, 35, 45]
    expect(result).toStrictEqual(expectation)
  })
  it('maps interval with no elements', () => {
    const a = []
    const result = Map.interval(a, (a, b) => a + b)
    const expectation = []
    expect(result).toStrictEqual(expectation)
  })
  it('maps interval with 1 element', () => {
    const a = [5]
    const result = Map.interval(a, (a, b) => a + b)
    const expectation = []
    expect(result).toStrictEqual(expectation)
  })
  it('maps interval with 2 elements', () => {
    const a = [5, 10]
    const result = Map.interval(a, (a, b) => a + b)
    const expectation = [15]
    expect(result).toStrictEqual(expectation)
  })
})
