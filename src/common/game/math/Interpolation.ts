function inverseLerp(a: number, b: number, x: number): number {
  return (x - a) / (b - a)
}

function lerp(a: number, b: number, t: number): number {
  return a * (1 - t) + b * t
}

export default {
  inverseLerp,
  lerp,
}
