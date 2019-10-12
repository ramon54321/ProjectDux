import Path from '.'

describe('Points to Waypoints', () => {
  it('creates simple rounded corner path from 3 points', () => {
    const a = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 10,
        y: 0,
      },
      {
        x: 10,
        y: 10,
      },
    ]
    const result = Path.pointsToWaypoints(a, 1, 1)
    const expectation = [
      {
        type: 'Point',
        position: {
          x: 0,
          y: 0,
        },
        timestamp: 0,
      },
      {
        type: 'Point',
        timestamp: 9,
        position: {
          x: 9,
          y: 0,
        },
      },
      {
        type: 'Radial',
        timestamp: 10.570796326794897,
        angleStart: -1.5707963267948966,
        angleEnd: 0,
        pivot: {
          x: 9,
          y: 1,
        },
        radius: 1,
        position: {
          x: 10,
          y: 1,
        },
      },
      {
        type: 'Point',
        position: {
          x: 10,
          y: 10,
        },
        timestamp: 19.5707963267949,
      },
    ]
    expect(result).toStrictEqual(expectation)
  })
  it('creates simple rounded corner path from 3 points of shallow angle', () => {
    const a = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 10,
        y: 0,
      },
      {
        x: 20,
        y: 10,
      },
    ]
    const result = Path.pointsToWaypoints(a, 1, 1)
    const expectation = [
      {
        type: 'Point',
        position: {
          x: 0,
          y: 0,
        },
        timestamp: 0,
      },
      {
        type: 'Point',
        timestamp: 9.585786437626904,
        position: {
          x: 9.585786437626904,
          y: 0,
        },
      },
      {
        type: 'Radial',
        timestamp: 10.371184601024353,
        angleStart: -1.5707963267948966,
        angleEnd: -0.7853981633974482,
        pivot: {
          x: 9.585786437626904,
          y: 1,
        },
        radius: 1,
        position: {
          x: 10.292893218813452,
          y: 0.29289321881345237,
        },
      },
      {
        type: 'Point',
        position: {
          x: 20,
          y: 10,
        },
        timestamp: 24.09910666238221,
      },
    ]
    expect(result).toStrictEqual(expectation)
  })
  it('creates simple rounded corner path from 3 points of narrow angle', () => {
    const a = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 10,
        y: 0,
      },
      {
        x: 0,
        y: 10,
      },
    ]
    const result = Path.pointsToWaypoints(a, 1, 1)
    const expectation = [
      {
        type: 'Point',
        position: {
          x: 0,
          y: 0,
        },
        timestamp: 0,
      },
      {
        type: 'Point',
        timestamp: 7.585786437626906,
        position: {
          x: 7.585786437626906,
          y: 0,
        },
      },
      {
        type: 'Radial',
        timestamp: 9.94198092781925,
        angleStart: -1.5707963267948966,
        angleEnd: 0.7853981633974478,
        pivot: {
          x: 7.585786437626906,
          y: 0.9999999999999998,
        },
        radius: 1,
        position: {
          x: 8.292893218813454,
          y: 1.707106781186547,
        },
      },
      {
        type: 'Point',
        position: {
          x: 0,
          y: 10,
        },
        timestamp: 21.669902989177107,
      },
    ]
    expect(result).toStrictEqual(expectation)
  })
  it('creates a path from multiple points of various angles', () => {
    const a = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 10,
        y: 0,
      },
      {
        x: 5,
        y: 10,
      },
      {
        x: 8,
        y: 14,
      },
      {
        x: 16,
        y: 8,
      },
    ]
    const result = Path.pointsToWaypoints(a, 1, 1)
    const expectation = [
      {
        type: 'Point',
        position: {
          x: 0,
          y: 0,
        },
        timestamp: 0,
      },
      {
        type: 'Point',
        timestamp: 8.381966011250105,
        position: {
          x: 8.381966011250105,
          y: 0,
        },
      },
      {
        type: 'Radial',
        timestamp: 10.416409947045807,
        radius: 1,
        angleStart: -1.5707963267948966,
        angleEnd: 0.4636476090008057,
        pivot: {
          x: 8.381966011250105,
          y: 1,
        },
        position: {
          x: 9.276393202250022,
          y: 1.4472135954999579,
        },
      },
      {
        type: 'Point',
        timestamp: 19.360681857044966,
        position: {
          x: 5.276393202250021,
          y: 9.447213595499958,
        },
      },
      {
        type: 'Radial',
        timestamp: 20.467830574839056,
        radius: 1,
        angleStart: 3.6052402625905993,
        angleEnd: 2.498091544796509,
        pivot: {
          x: 6.170820393249937,
          y: 9.894427190999917,
        },
        position: {
          x: 5.370820393249937,
          y: 10.494427190999916,
        },
      },
      {
        type: 'Point',
        timestamp: 23.84979658608916,
        position: {
          x: 7.4,
          y: 13.2,
        },
      },
      {
        type: 'Radial',
        timestamp: 25.420592912884057,
        radius: 1,
        angleStart: 2.4980915447965084,
        angleEnd: 0.9272952180016115,
        pivot: {
          x: 8.2,
          y: 12.6,
        },
        position: {
          x: 8.8,
          y: 13.4,
        },
      },
      {
        type: 'Point',
        position: {
          x: 16,
          y: 8,
        },
        timestamp: 34.42059291288406,
      },
    ]
    expect(result).toStrictEqual(expectation)
  })
})
