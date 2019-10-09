type Vector2 = Game.Vector2

export function add(a: Vector2, b: Vector2): Vector2 {
  return { x: a.x + b.x, y: a.y + b.y }
}

export function subtract(a: Vector2, b: Vector2): Vector2 {
  return { x: a.x - b.x, y: a.y - b.y }
}

export function scale(a: Vector2, factor: number): Vector2 {
  return { x: a.x * factor, y: a.y * factor }
}

export function squareMagnitude(a: Vector2): number {
  return a.x * a.x + a.y * a.y
}

export function magnitude(a: Vector2): number {
  return Math.sqrt(squareMagnitude(a))
}

export function unit(a: Vector2): Vector2 {
  const mag = magnitude(a)
  return { x: a.x / mag, y: a.y / mag }
}

export function direction(a: Vector2, b: Vector2): Vector2 {
  const dir = subtract(b, a)
  return unit(dir)
}

export function dot(a: Vector2, b: Vector2): number {
  return a.x * b.x + a.y * b.y
}

export function angleBetween(a: Vector2, b: Vector2): number {
  const aMag = magnitude(a)
  const bMag = magnitude(b)
  return Math.acos(dot(a, b) / (aMag * bMag))
}

export function bisector(a: Vector2, b: Vector2): Vector2 {
  const aUnit = unit(a)
  const bUnit = unit(b)
  return unit(add(aUnit, bUnit))
}

/**
 * Returns the point inset btweeen two vectors with a circle with radius r, where vectors a and b are tangential to the circle.
 */
export function insetPoint(a: Vector2, b: Vector2, r: number): Vector2 {
  const ang = angleBetween(a, b)
  const distance = r / Math.sin(ang / 2)
  const bisec = bisector(a, b)
  return scale(bisec, distance)
}

/**
 * Returns vector a projected onto vector b from the perpendicular of vector b
 */
export function projection(a: Vector2, b: Vector2): Vector2 {
  const bUnit = unit(b)
  const factor = dot(a, bUnit)
  return scale(bUnit, factor)
}

/**
 * Returns the angle to a point from the origin or a given point
 */
export function angleTo(a: Vector2, from?: Vector2): number {
  const _from = from ? from : { x: 0, y: 0 }
  return Math.atan2(a.y - _from.y, a.x - _from.x)
}

/**
 * Returns the RHS perpendicular vector of vector a
 */
export function perpendicular(a: Vector2): Vector2 {
  return unit({ x: -a.y, y: a.x })
}

/**
 * Returns a vector given an angle from the x axis
 */
export function angleVector(a: number): Vector2 {
  return { x: Math.cos(a), y: Math.sin(a) }
}

export default {
  add,
  subtract,
  scale,
  squareMagnitude,
  magnitude,
  unit,
  direction,
  dot,
  angleBetween,
  bisector,
  insetPoint,
  projection,
  angleTo,
  perpendicular,
  angleVector,
}
